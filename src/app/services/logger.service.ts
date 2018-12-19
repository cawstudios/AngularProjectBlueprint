import { Injectable } from '@angular/core';
import { BrowserClient, Hub } from '@sentry/browser';
import * as _ from 'lodash';
import { environment } from '../../environments/environment';
import { LoggerLevel } from '../enums/logger-level.enum';

@Injectable()
export class LoggerService {

  private _isInitialized = false;
  private isRemoteLoggingEnabled = false;
  private readonly _logsBeforeInitialization: any[] = [];
  private readonly baseUrl: string;
  private hub: Hub;

  constructor() {
    this.baseUrl = environment.apiBaseUrl;
    this.init();
  }

  public init(): void {
    if (this._isInitialized) {
      return;
    }

    if (environment.envName !== 'local') {
      this.configure();
      this.isRemoteLoggingEnabled = true;
    }

    this._isInitialized = true;

    if (this._logsBeforeInitialization.length > 0) {
      for (const logData of this._logsBeforeInitialization) {
        this.log(null, logData.logMsg, logData.logLevel, logData.logData, logData.logCallerTypeName, logData.logCallerMethodName);
        this._logsBeforeInitialization.pop();
      }
    }
  }

  public event(msg: string, data: object = null, callerTypeName: string = null, callerMethodName: string = null): void {
    this.log(null, msg, LoggerLevel.Event, data, callerTypeName, callerMethodName);
  }

  public info(msg: string, data: object = null, callerTypeName: string = null, callerMethodName: string = null): void {
    this.log(null, msg, LoggerLevel.Info, data, callerTypeName, callerMethodName);
  }

  public error(err: any, msg: string, data: object = null, callerTypeName: string = null, callerMethodName: string = null): void {
    this.log(err, msg, LoggerLevel.Error, data, callerTypeName, callerMethodName);
  }

  public debug(msg: string, data: object = null, callerTypeName: string = null, callerMethodName: string = null): void {
    this.log(null, msg, LoggerLevel.Debug, data, callerTypeName, callerMethodName);
  }

  private log(error: any, msg: string, level: LoggerLevel, data: object, callerTypeName: string, callerMethodName: string): void {
    if (!this._isInitialized) {
      this._logsBeforeInitialization.push({
        logError: error,
        logMsg: msg,
        logLevel: level,
        logData: data,
        logCallerTypeName: callerTypeName,
        logCallerMethodName: callerMethodName
      });
      return;
    }

    const metadata = {};
    if (data !== null) {
      metadata['data'] = _.cloneDeep(data);
    }

    metadata['callerTypeName'] = callerTypeName;
    metadata['callerMethodName'] = callerMethodName;

    const logEntry = {
      message: msg,
      level: level.toString().toLowerCase(),
      data: metadata
    };

    if (!this.isRemoteLoggingEnabled) {
      console.log(JSON.stringify(logEntry));
      return;
    }

    this.hub.addBreadcrumb({
      message: logEntry.message,
      data: logEntry.data
    });

    if (level === 'Error') {
      this.hub.captureException(error);
    }

  }

  private configure(): void {
    const client = new BrowserClient({
      dsn: environment.sentryIOUrl
    });
    this.hub = new Hub(client);
    this.hub.configureScope(scope => {
      scope.setTag('environment', environment.envName);
    });
  }
}
