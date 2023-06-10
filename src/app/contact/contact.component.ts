import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private activeModal:NgbActiveModal) { }
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
    this.activeModal.dismiss();
  }
}
