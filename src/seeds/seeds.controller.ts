import { Logger } from '../helpers/logger';

const superUserSeed = async () => {
  try {
    Logger.info('SeedsController.superUserSeed ');
  } catch (error) {
    Logger.error('SeedsController.superUserSeed ', error);
  }
};

export class SeedsController {
  constructor() {
    Logger.info('Seeds controller initialized...');
  }

  public async initSeeds() {
    superUserSeed();
  }
}
