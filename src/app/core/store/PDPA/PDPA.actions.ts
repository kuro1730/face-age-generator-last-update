export namespace PdpaState {
export class updateState {
    static readonly type = '[pdpa] update';
    constructor(public payload: any) {}
  }
export class resetState {
    static readonly type = '[pdpa] reset';
  }
}