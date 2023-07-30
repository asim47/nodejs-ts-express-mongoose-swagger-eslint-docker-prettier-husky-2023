import { ConnectionStates } from 'mongoose';
import { versionNo } from '../../helpers/contants';
import { getDatabaseConnectionState } from '../../helpers/database';
import { Server } from '../../helpers/env';
import { Logger } from '../../helpers/logger';
import { HealthStatusModel } from '../models/common.model';

export class CommonService {
  constructor() {
    Logger.info('CommonService initialized...');
  }

  public GetHealthStatus(): HealthStatusModel {
    Logger.info('CommonService.GetHealthStatus');

    const connectionState = getDatabaseConnectionState();

    return {
      message: 'Server is running',
      environment: Server.ENVIRONMENT,
      versionNo: versionNo,
      dbState: connectionState,
      connection: connectionState === ConnectionStates.connected,
    };
  }
}
