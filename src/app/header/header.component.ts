import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactComponent } from '../contact/contact.component';
import { Store } from '@ngxs/store';
import { ConfigState } from '../core';
import { ResultState } from '../core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  isIntroRoute: boolean;
  constructor(public router:Router,private modalService: NgbModal,private store:Store){
    this.isIntroRoute = this.router.url === '/intro';
    this.router.events.subscribe(() => {
      this.isIntroRoute = this.router.url === '/intro';
    });
  }

  goToHome(){
    this.store.dispatch(new ConfigState.resetState());
    this.store.dispatch(new ResultState.resetState());
    this.router.navigate(['/intro', { }] )
  }
  openContactModal(){
    const modalRef = this.modalService.open(ContactComponent, { size: 'lg' });
  }
}
