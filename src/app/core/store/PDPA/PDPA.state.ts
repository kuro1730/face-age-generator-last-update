import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { Ipdpa } from './PDPA.model';
import { PdpaState } from './PDPA.actions';
import { Selector } from '@ngxs/store';

const defaultValue:Ipdpa= {
  pdpaB:false
}

@State<Ipdpa>({
  name: 'pdpaState',
  defaults: defaultValue
})


@Injectable()
export class pdpaState {
  constructor() { }
  @Selector()
  static getUrlData(state: Ipdpa) {
    return state;
  }
  @Action(PdpaState.updateState)
  updatePdpa(ctx: StateContext<Ipdpa>, action: PdpaState.updateState) {
    const payload = action.payload;

    console.log("payload pdpa==>", action.payload);
    const newState = { pdpaB: payload };
    ctx.patchState(newState);

  }
  @Action(PdpaState.resetState)
  resetPdpa(ctx: StateContext<Ipdpa>) {
    ctx.patchState(defaultValue);
  }
}