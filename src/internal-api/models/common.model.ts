export interface HealthStatusModel {
  message: string;
  environment: string;
  versionNo: string;
  dbState: number;
  connection: boolean;
}
