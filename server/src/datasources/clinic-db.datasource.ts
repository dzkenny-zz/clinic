import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'ClinicDb',
  connector: 'mssql',
  url: '',
  host: 'clinic-server-2020.database.windows.net',
  port: 1433,
  user: 'kenny',
  password: 'P@ssword1234',
  database: 'clinic-db'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ClinicDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'ClinicDb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.ClinicDb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
