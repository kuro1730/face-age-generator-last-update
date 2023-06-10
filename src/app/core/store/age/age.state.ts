import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { Iage } from './age.model';
import { AgeState } from './age.actions';
import { Selector } from '@ngxs/store';

const defaultValue:Iage = {
  age:null
}

@State<Iage>({
  name: 'ageState',
  //defaults: defaultValue
})


@Injectable()
export class ageState {
  constructor() { }
  @Selector()
  static getAgeData(state: Iage) {
    return state;
  }
  @Action(AgeState.updateState)
  updateAge(ctx: StateContext<Iage>, action: AgeState.updateState) {
    const payload = action.payload;

    console.log("payload Age==>", action.payload);

    ctx.patchState(payload);

  }
  @Action(AgeState.resetState)
  resetAge(ctx: StateContext<Iage>) {
    ctx.patchState(defaultValue);
  }
}