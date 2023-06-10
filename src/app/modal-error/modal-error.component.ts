import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss']
})
export class ModalErrorComponent implements OnInit {

  constructor(private activeModal:NgbActiveModal,private router :Router) { }
  addStyle: string = ''
	ngOnInit() {
    
		this.addStyle = 'd-block'
    
	}
	closePdpa() {
		setTimeout(() => {
			this.addStyle = 'fade'
		}, 300)
	}
  onNoClick(): void {
    this.router.navigate(['/home'])
    this.activeModal.dismiss();
  }
}
