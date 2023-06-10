import { Component ,EventEmitter,Output,OnInit,ViewChild,ElementRef} from '@angular/core';
import { NgbDatepickerModule, NgbOffcanvas, NgbTimepickerModule, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap'

import { CommonModule } from '@angular/common'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-offcanvas',
  templateUrl: './offcanvas.component.html',
  styleUrls: ['./offcanvas.component.scss'],
  standalone: true,
	imports: [CommonModule, ReactiveFormsModule, NgbDatepickerModule,NgbTimepickerModule]
})
export class OffcanvasComponent  implements OnInit{
	closeResult = ''
	@ViewChild('phoneInput') phoneInput: ElementRef;
	form: FormGroup
	@Output() notify = new EventEmitter<FormGroup>()

	constructor(private offcanvasService: NgbOffcanvas) {
		this.form = new FormGroup({
			// informer
			informerTitle: new FormControl(''),
			informerFirstName: new FormControl(''),
			informerLastName: new FormControl(''),
			phone: new FormControl(''),
			email: new FormControl(''),
			otherInformerContact: new FormControl(''),
			// missing person
			nickname: new FormControl(''),
			title: new FormControl(''),
			firstName: new FormControl(''),
			lastName: new FormControl(''),
			age: new FormControl(''),
			appearance: new FormControl(''),
			location: new FormControl(''),
			subDistrict: new FormControl(''),
			district: new FormControl(''),
			province: new FormControl(''),
			postalCode: new FormControl(''),
			date: new FormControl(''),
			time: new FormControl(''),
			comment: new FormControl('')
		})
	}
	ngOnInit(): void {
		
	}

	open(content: any) {
		this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
			}
		)
	}

	private getDismissReason(reason: any): string {
		if (reason === OffcanvasDismissReasons.ESC) {
			return 'by pressing ESC'
		} else if (reason === OffcanvasDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on the backdrop'
		} else {
			return `with: ${reason}`
		}
	}
	
	formatPhone() {
		const phoneNumberRegex9 = /^([0-9]{2})([0-9]{3})([0-9]{4})$/;
		const phoneNumberRegex10 = /^([0-9]{3})([0-9]{3})([0-9]{4})$/;
		
		const phoneNumber = this.form.value.phone.replace(/[^\d]/g, ''); // remove non-digit characters
		let match;
		
		if (phoneNumber.length === 9 && (match = phoneNumber.match(phoneNumberRegex9))) {
		  this.form.value.phone = `${match[1]}-${match[2]}-${match[3]}`;
		} else if (phoneNumber.length === 10 && (match = phoneNumber.match(phoneNumberRegex10))) {
		  this.form.value.phone = `${match[1]}-${match[2]}-${match[3]}`;
		}
	  }

	
	onSubmit() {
		
		if(this.form.value.age<0){this.form.value.age=0}
		
		// console.log(this.form.value.firstName)
		// console.log(this.form.value.lastName)
		this.notify.emit(this.form)
	}
}
