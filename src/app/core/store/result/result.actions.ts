export namespace ResultState {
export class updateState {
    static readonly type = '[result] update';
    constructor(public payload: any) {}
  }
export class resetState {
    static readonly type = '[result] reset';
  }
}