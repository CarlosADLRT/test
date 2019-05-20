import {sbxCoreService} from '../Network';
import environment from '../environment';

export default class FloristService {
  static loadProductGroupsByGrower(){
    return sbxCoreService.run(environment.cloudscripts.loadProductGroupsByGrower, {}).then(res => {
      return res.response.body.results;
    }).catch(error => {
      console.error(error);
    });
  }
}
