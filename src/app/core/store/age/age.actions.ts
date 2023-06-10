export namespace AgeState {
export class updateState {
    static readonly type = '[age] update';
    constructor(public payload: any) {}
  }
export class resetState {
    static readonly type = '[age] reset';
  }
}