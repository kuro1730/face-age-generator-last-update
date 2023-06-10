import { Component, OnInit, Output ,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-pdpa-consent',
  templateUrl: './pdpa-consent.component.html',
  styleUrls: ['./pdpa-consent.component.scss']
})
export class PdpaConsentComponent implements OnInit {
  @Output() checkPDPAChange = new EventEmitter<boolean>();
  checkPDPA:boolean=false;
  constructor() { }

  addStyle: string = ''
	ngOnInit() {
    
		this.addStyle = 'd-block'
    
	}
	closePdpa() {
		setTimeout(() => {
			this.addStyle = 'fade'
		}, 300)
	}
}
