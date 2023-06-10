import { Component,Output,Input,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { PdpaState } from '../core';
import { pdpaState } from '../core';
import { Store,Select} from '@ngxs/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})

export class IntroComponent implements OnInit {
  checkPDPAI:boolean
  statePdpa:any
  @Select()
  pdpaState$: Observable<pdpaState>;
  constructor(public router:Router,private store:Store){
  }
  ngOnInit(): void {
    this.pdpaState$.subscribe(pdpaB => { this.statePdpa = pdpaB
      this.checkPDPAI=this.statePdpa.pdpaB
    }).unsubscribe();  }
  goToHome(){
    this.router.navigate(['/home', { }] )
  }

  goToFaceDetect(){
    this.router.navigate(['/facedetect', { }] )
  }

  onCheckPDPAChange(value: boolean) {
    this.checkPDPAI=value;
    
    this.store.dispatch(new PdpaState.updateState(this.checkPDPAI) )
    
  }
}
