import {sbxCoreService, sbxSessionService} from '../Network';
import environment from '../environment';
import MixpanelService from "./MixpanelService";

export default class AuthService {
  static validateToken(token: string = localStorage.getItem('token'), user_key: string = localStorage.getItem('user_key')) {
    const params = {token: undefined, user_key: undefined};
    if(token) {
      localStorage.setItem('token', token);
      params.token = token;
    }
    if(user_key) {
      localStorage.setItem('user_key', user_key);
      params.user_key = user_key;
    }
    return sbxCoreService.run(environment.cloudscripts.validate, params).then(res => {
      if (res.response.body.success) {
        const data = res.response.body.data;
        sbxSessionService.updateUser({token: data.token, user: data.user});
        this.configTrackJs(data.user.id, data.token, data.user.email);
        return {success: true, data: data};
      }
      return {success: false};
    }).catch(error => {
      console.error(error);
    });
  }
  
  static logout() {
		MixpanelService.track('logout', {});
		localStorage.clear();
    if(environment.production){
      window.location.replace(environment.landingUrl);
    }else {
      window.location.replace('');
    }
  }
  
  static bootIntercom(user = null) {
    const params = {
      app_id: environment.intercom,
      horizontal_padding: 5,
      vertical_padding: 5
    };
    if (user) {
      const ts = Math.round(new Date().getTime() / 1000);
      Object.assign(params, {
        name: user.name,
        email: user.email,
        user_id: user.id,
        created_at: ts
      });
    }
    
    window.Intercom('boot', params);
  }
  
  static shutDownItercom() {
    window.Intercom('shutdown');
  }
  
  /**
   * Configuracion de trackJs
   */
  static configTrackJs(id, token, email) {
    window.TrackJS.configure({
      // Custom session identifier.
      sessionId: token,
      
      // Custom user identifier.
      userId: id.toString(),
      
      // Custom application identifier.
      version: environment.versionApp
    });
    window.TrackJS.addMetadata('Email', email);
  }
}
