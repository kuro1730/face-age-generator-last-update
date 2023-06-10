import { Component, OnInit, OnChanges, AfterContentInit } from '@angular/core'
import html2canvas from 'html2canvas';
import { Observable } from 'rxjs';
import { configState } from '../core/store/config/config.state';
import { resultState } from '../core/store/result/result.state';
import { Select, Store } from '@ngxs/store';
import { ResultState } from 'src/app/core/store/result/result.actions'
import { ConfigState } from 'src/app/core/store/config/config.actions'
import { ageState } from '../core';
import { AgeState } from '../core';
// import { FormService } from '../form.service'
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms'
import { NgbDate } from '@ng-bootstrap/ng-bootstrap'
import { stringify } from '@firebase/util';
import { ShareComponent } from '../share/share.component';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit, OnChanges, AfterContentInit {

  resultFile: File
  @Select()
  configState$: Observable<configState>;
  stateData: any;
  @Select()
  resultState$: Observable<resultState>
  @Select()
  ageState$: Observable<ageState>
  ageGen: any
  ageGenDes: any
  stateAge: any
  statefile: any
  resultStateFile: any
  resultData: any	// informer
  informerTitle: string;
  informerFirstName: string
  informerLastName: string
  phone: string
  email: string
  otherInformerContact: string
  informerSection: string = "โปรดระบุข้อมูลติดต่อกลับ"
  // missing person
  misingNameSection: string = "โปรดระบุชื่อผู้สูญหาย"
  nickname: string
  title: string
  firstName: string
  lastName: string
  age: string
  ageDes: string = "โปรดระบุอายุของรูปภาพ"
  appearance: string = "โปรดระบุลักษณะ"
  location: string = "โปรดระบุสถานที่ล่าสุดของผู้สูญหาย"
  subDistrict: string
  district: string
  province: string
  postalCode: string = "ระบุรหัสไปรษณีย์"
  date: any // April, 23 2001
  comment: string = "โปรดระบุหมายเหตุ"
  dateTimeString: string = "โปรดระบุวันที่สูญหาย"
  time: any

  constructor(private router: Router, private store: Store,private shareComponent:ShareComponent) { }

  ngOnInit(): void {
    this.shareComponent.ngOnInit()
    this.ageState$.subscribe(age => {
      this.stateAge = age
      this.ageGen = this.stateAge.age
      console.log("this.StateAge", this.ageGen)
      console.log("type of this.StateAge", typeof (this.ageGen))
      this.ageGenDes = "อายุ " + this.ageGen + " ปี"

      if (this.ageGen == undefined || this.ageGen == null) this.ageGenDes = "ไม่ได้ระบุอายุ "
    }
    ).unsubscribe();
    this.configState$.subscribe(File => { this.stateData = File }).unsubscribe();
    this.statefile = this.stateData.File
    this.resultState$.subscribe(File => {
      this.resultData = File
      this.resultStateFile = this.resultData.File
      console.log("this.resultStateFile==>", this.resultStateFile.File)
    }).unsubscribe();
    // this.resultStateFile = this.route.snapshot.paramMap.get('resultStateFile');
    
  }
  ngAfterContentInit(): void {
    // this.exportToPNGShare()
    console.log("this.resultFile==>", this.resultFile)
  }
  ngOnChanges(): void {
    // extract formService
    // this.firstName = this.formService.form.value.firstName
    // this.lastName = this.formService.form.value.lastName
    // this.exportToPNGShare()
    // this.exportToPNGShare()
  }
  onNotify(form: FormGroup) {
    console.log(form.value.time)
    console.log(form.value.date)
    this.date = undefined
    this.time = undefined
    if(form.value.informerFirstName=='')
    this.informerFirstName=""
		if(form.value.informerLastName=='')
    this.informerLastName=""
    if(form.value.phone=='')
    this.phone = ""
    if(form.value.email=='')
    this.email=""
    if(form.value.otherInformerContact=='')
    this.otherInformerContact=""
    if(form.value.nickname=='')
		this.nickname = "ไม่ระบุ"
    if(form.value.age==''||form.value.age==null||form.value.age==undefined){
    this.age = undefined
		this.ageDes = "ไม่ระบุ"
  }
    if(form.value.firstName=='')
		this.firstName = ""
    if(form.value.lastName=='')
		this.lastName = ""
    if(form.value.appearance=='')
		this.appearance = "ไม่ระบุ"
    if(form.value.location==''){
      if(form.value.district==''&&form.value.province==''&&form.value.subDistrict=='')
      this.location = "ไม่ระบุ"
      else this.location=''
    }

		this.dateTimeString = ""
    if(form.value.subDistrict=='')
		this.subDistrict = ""
    if(form.value.district=='')
		this.district = ""
    if(form.value.province=='')
		this.province = ""
    if (form.value.time == ''||form.value.time == null) {
      this.time = "ไม่ระบุเวลา"
    }
    if (form.value.date == ''||form.value.date == null||form.value.date == undefined) {
      this.date = "ไม่ระบุวันที่"

    }
    console.log(this.date)
    console.log(this.time)
    if(form.value.comment=='')
		this.comment = "ไม่ระบุ"
    // informerTitle
    
    this.informerSection = "ไม่ระบุ"
    this.misingNameSection = "ไม่ระบุ"

    
    if (form.value.informerTitle != '' || form.value.informerFirstName != '' ||
      form.value.informerLastName != '' || form.value.phone != '' || form.value.email != '' ||
      form.value.otherInformerContact != '')
      this.informerSection = ""
    if (form.value.informerTitle != '') {
      this.informerTitle = form.value.informerTitle
      this.informerSection = this.informerTitle
    }
    if (form.value.informerFirstName != '') {
      this.informerFirstName = form.value.informerFirstName
      this.informerSection = this.informerSection + this.informerFirstName
    }
    if (form.value.informerLastName != '') {
      this.informerLastName = form.value.informerLastName
      this.informerSection = this.informerSection + " " + this.informerLastName
    }
    if (form.value.phone != '') {
      this.phone = form.value.phone
      this.informerSection = this.informerSection + " โทรศัพท์ : " + this.phone
    }
    if (form.value.email != '') {
      this.email = form.value.email
      this.informerSection = this.informerSection + '\n'+"อีเมล : " + this.email
    }
    if (form.value.otherInformerContact != '') {
      this.otherInformerContact = form.value.otherInformerContact
      this.informerSection = this.informerSection + " " + this.otherInformerContact
    }
    if (form.value.title != '' || form.value.firstName != '' ||
    form.value.lastName != '' || form.value.nickname != '')
      this.misingNameSection = ""
    if (form.value.title != '') {
      this.title = form.value.title
      this.misingNameSection = this.title
    }
    if (form.value.firstName != '') {
      this.firstName = form.value.firstName
      this.misingNameSection = this.misingNameSection + this.firstName
    }
    if (form.value.lastName != '') {
      this.lastName = form.value.lastName
      this.misingNameSection = this.misingNameSection + " " + this.lastName
    }
    if (form.value.nickname != '') {
      this.nickname = form.value.nickname
      this.misingNameSection = this.misingNameSection +'\n'+"ชื่อเล่น : " + this.nickname 
    }
    if (form.value.age != '')
      this.age = form.value.age
    if (form.value.appearance != '')
      this.appearance = form.value.appearance
    if (form.value.location != '')
      this.location = form.value.location
    if (form.value.subDistrict != '')
      this.subDistrict = "ต." + form.value.subDistrict
    if (form.value.district != '')
      this.district = "อ." + form.value.district
    if (form.value.province != '')
      this.province = "จ." + form.value.province
    if (this.date != "ไม่ระบุวันที่")
      this.date = form.value.date
    if (form.value.comment != '')
      this.comment = form.value.comment
    if (this.time != "ไม่ระบุเวลา") {
      let hour:string = stringify(form.value.time.hour)
      let minute:string = stringify(form.value.time.minute)
      console.log(hour.length)
      console.log(minute.length)
      if(hour.length==1) hour="0"+hour
      if (minute.length==1) minute="0"+minute
      this.time = hour + ":" + minute + " น."
    }

    if (this.time==="ไม่ระบุเวลา"&&this.date==="ไม่ระบุวันที่"){
      this.dateTimeString = "ไม่ระบุเวลาและวันที่"
    }
    console.log(this.date)
    if (this.date!="ไม่ระบุวันที่"){
      this.dateTimeString = this.calDateToString(form.value.date)
      if (this.time!="ไม่ระบุเวลา")
        this.dateTimeString = this.dateTimeString + " เวลา " + this.time
      else
        this.dateTimeString = this.dateTimeString + "  " + this.time
    }
    if ((this.time!="ไม่ระบุเวลา")&&this.date == "ไม่ระบุวันที่") {
      this.dateTimeString = this.date+ " เวลา " + this.time
    }

    if (this.age!==undefined)
      if(this.age!==null)
      this.ageDes = "อายุ " + this.age + " ปี"


      // this.exportToPNGShare()
			

			// // missing person
			// form.value.nickname
			// form.value.title
			// form.value.firstName
			// form.value.lastName
			// form.value.age
			// form.value.appearance
			// form.value.location
			// form.value.subDistrict
			// form.value.district
			// form.value.province
			
			// form.value.date
			// form.value.time
			// form.value.comment
    // this.informerSection = this.informerTitle+this.informerFirstName+" "+this.informerLastName+" "+this.phone+" "+this.email+" "+this.otherInformerContact
  }
  calDateToString(date) {
    let dateToString
    let monthDic = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",

    ]
    let month = date.month - 1
    dateToString = `${date.day} ${monthDic[month]} พ.ศ.${date.year + 543}`;
    return dateToString
  }


  exportToPNG() {
    const element = document.querySelector('.banner') as HTMLElement;
    html2canvas(element, { scale: 2 }).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'banner.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }
  exportToPNGShare() {
    this.resultFile = undefined
    const element = document.querySelector('.banner') as HTMLElement;
    console.log(element);
    const image = element.querySelector('img') as HTMLImageElement; 
      html2canvas(element, { scale: 2 }).then((canvas) => {
        canvas.toBlob((blob) => {
          const file = new File([blob], 'banner.png', { type: 'image/png' });
          this.shareComponent.setInputFile(file)
          this.shareComponent.shareOnFacebook()
        });
      });
  }
  exportToPNGPrint() {
    const element = document.querySelector('.banner') as HTMLElement;
    const a4Width = 595; // A4 paper width in pixels
    const a4Height = 842; // A4 paper height in pixels
    html2canvas(element, { scale: 0.5 }).then((canvas) => {
      const canvasAspectRatio = canvas.width / canvas.height;
      const a4AspectRatio = a4Width / a4Height;
      const scaleFactor = canvasAspectRatio > a4AspectRatio ? a4Width / canvas.width : a4Height / canvas.height;
      const scaledCanvas = document.createElement('canvas');
      scaledCanvas.width = canvas.width
      scaledCanvas.height = canvas.height
      const ctx = scaledCanvas.getContext('2d');
      ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, scaledCanvas.width, scaledCanvas.height);
      const img = new Image();
      img.onload = () => {
        const printWindow = window.open();
        printWindow.document.write('<html><head><title>Print Image</title><style>img {position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);}</style></head><body><img src="' + img.src + '"/></body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
      };
      img.src = scaledCanvas.toDataURL('image/png');
    });
  }

  goToHome() {

    this.store.dispatch(new ConfigState.resetState());
    this.store.dispatch(new ResultState.resetState());
    this.store.dispatch(new AgeState.resetState());
    this.router.navigate(['/home'])
  }

}
