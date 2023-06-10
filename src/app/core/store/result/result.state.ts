import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { Iresult } from './result.model';
import { ResultState } from './result.actions'; 
import { Selector } from '@ngxs/store';

const defaultValue:Iresult= {
  file:null
}

@State<Iresult>({
  name : 'resultState',
  defaults: defaultValue
})


@Injectable()
export class resultState {
  constructor() {}
@Selector()
static getConfigData(state:Iresult){
    return state ;
}
@Action(ResultState.updateState)
  updateResult(ctx: StateContext<Iresult>, action: ResultState.updateState) {
    const payload = action.payload;
    console.log(action.payload);
    ctx.patchState(payload);
    
  }
@Action(ResultState.resetState)
  resetResult(ctx:StateContext<Iresult>){
    ctx.setState(defaultValue)
  }
}