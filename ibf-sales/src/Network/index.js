import {SbxCoreService, SbxSessionService} from 'sbx-axios';
import environment from '../environment';

const sbxCoreService = new SbxCoreService();
const sbxSessionService = new SbxSessionService(sbxCoreService);
sbxSessionService.initialize(environment.domain, environment.appKey, environment.baseUrl);

export {sbxSessionService, sbxCoreService};
