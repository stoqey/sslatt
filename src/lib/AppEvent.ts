import EventEmitter from 'events';

export enum APPEVENTS {
  USER = 'user',
  AUTH = 'auth',
  RUN = 'run',
  SEARCH = 'search',
  LOGOUT = 'logout',
}

export class AppEvents extends EventEmitter.EventEmitter {
  private static _instance: AppEvents;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  private constructor() {
    super();
    this.setMaxListeners(0); // set a maximum of 50 event listners
  }
}
