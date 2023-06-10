import { Component, OnInit, EventEmitter, Output, AfterContentChecked, OnDestroy,OnChanges } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { urlState } from '../core/store/URL/url.state';
import { Observable, finalize, interval } from 'rxjs';
import { configState } from '../core/store/config/config.state';
import { ResultState } from '../core/store/result/result.actions';
import { resultState } from '../core';
import { Select, Store } from '@ngxs/store';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationExtras } from '@angular/router';
import { ConfigState } from '../core';
import { AgeState } from '../core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalErrorComponent } from '../modal-error/modal-error.component';
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})

export class ConfigComponent implements OnInit, OnDestroy,OnChanges {
  private configStateSubscription: Subscription;
  private urlStateSubscription: Subscription;
  private resultStateSubscription: Subscription;
  @Output() clearResultData = new EventEmitter<void>();
  ageNewModelSelector:boolean = false
  isOtherConfig: boolean = false
  isLoading: boolean = false
  ageValue: number = 0;
  ageTarget: number = 5;
  hairValue: number = 0;
  poseValue: number = 0;
  beardValue: number = 0;
  smile: boolean | undefined;
  files: File[] = [];
  file: File;

  resultFile: File = null
  response: any
  interFaceResponse: any
  base64Interface: string


  @Select()
  configState$: Observable<configState>;
  stateData: any;

  @Select()
  urlState$: Observable<urlState>;
  stateUrl: string

  @Select()
  resultState$: Observable<resultState>;
  stateResult: any;

  imageDataURL?: string
  constructor(private http: HttpClient, private store: Store, private router: Router,private modalService: NgbModal) { }

  ngOnInit(): void {
    let stateUrl
    this.configStateSubscription = this.configState$.subscribe(file => { this.stateData = file })
    this.urlStateSubscription = this.urlState$.subscribe(url => { stateUrl = url })
    this.stateUrl = stateUrl.url
    this.file = this.stateData.File
    this.files.push(this.file)
    console.log("this.ageTarget==>",this.ageTarget)
  }

  ngOnDestroy(): void {
    this.configStateSubscription.unsubscribe();
    this.urlStateSubscription.unsubscribe();
    //this.resultStateSubscription.unsubscribe();

  }

  ngOnChanges(){
    
  }

  updateSmile(value: boolean) {
    console.log("updateSmile==>", value)
    console.log("updateSmile this.smile==>", this.smile)
    if (this.smile === value) {
      this.smile = undefined;
      console.log("this.smile === value==>", this.smile)
    } else {
      this.smile = value;
    }
  }
  clickOtherConfig() {
    this.isOtherConfig = true
  }
  clickBackOtherConfig() {
    this.isOtherConfig = false
    this.ageValue = 0;
    this.hairValue = 0;
    this.poseValue = 0;
    this.beardValue = 0;
    this.smile = undefined;
  }

  goToHome() {
    this.clearResultData.emit();
    this.store.dispatch(new ConfigState.resetState());
    this.store.dispatch(new ResultState.resetState());
    this.resultFile = null
    this.router.navigate(['/home'])
  }
  openErrorModal(){
    this.store.dispatch(new ConfigState.resetState());
    this.store.dispatch(new ResultState.resetState());
    this.resultFile = null
    const modalRef = this.modalService.open(ModalErrorComponent, { size: 'lg' });
  }
  submit() {
    console.log("this.ageTarget==>",this.ageTarget)
    this.store.dispatch(new AgeState.updateState({ age: this.ageTarget }));
    this.resultFile = null

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.ageNewModelSelector==true?`Token 5804b5bf1a52d95591be094f9c845c0babb2996b`:`Token 74435588fd3beef12e23602a105fc59d3ffe0018`,
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        
      }),
    };
    
    const body = JSON.stringify({
      version: this.ageNewModelSelector==true?"65a7ca7f7cbb6688e7d9f926bc431258e7ae113fa79522972739b5f029a69aad":"9222a21c181b707209ef12b5e0d7e94c994b58f01c7b2fec075d2e892362f13c",
      input: {
        image: this.stateUrl,
        target_age: this.ageTarget.toString(),
      }
    });
    console.log("replicate body==>", body)
    this.http.post("https://faceagegencorsproxy.herokuapp.com/https://api.replicate.com/v1/predictions", body, httpOptions)
      .subscribe(res => {
        this.response = res
        let path = "https://faceagegencorsproxy.herokuapp.com/https://api.replicate.com/v1/predictions/" + this.response.id
        this.isLoading = true;
        this.responseSet(path)

      })

  };

  responseSet(path) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.ageNewModelSelector==true?`Token 5804b5bf1a52d95591be094f9c845c0babb2996b`:`Token 74435588fd3beef12e23602a105fc59d3ffe0018`,
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      }),
    };
  
    let intervalId = setInterval(() => {
      if (this.response && this.response.status == "failed") {
        clearInterval(intervalId);
        this.isLoading = false;
        this.openErrorModal();
        return;
      }
      this.http.get(path, httpOptions).subscribe(res => {
        this.response = res
        if (this.response.status == "succeeded") {
          clearInterval(intervalId);
          this.downloadImgRepli(this.response.output);
        } else if (this.response.status == "failed") {     
          return
        }
      });
    }, 3000);
  }
  


  async downloadImgRepli(path) {
    const response = await fetch(path);
    const blob = await response.blob();
    const file = new File([blob], decodeURI(path.split("/").pop()), {
      type: blob.type,
    });
    this.resultFile = file;
    this.store.dispatch(new ResultState.updateState({ File: this.resultFile }))
    this.isLoading = false;
  }



  submitHuggingFace() {
    this.isLoading = true;
    let smile: number
    smile = 0
    if (this.smile == true) { smile = 1; }
    else { smile = -1 }
    if (this.smile == undefined || this.smile == null) { smile = 0 }

    const fileType = this.file.type.split('/')[1];
    const reader = new FileReader();
    if (this.resultFile == null) {
      reader.readAsDataURL(this.file);
    }
    else {
      reader.readAsDataURL(this.resultFile)
    }
    // When the file is loaded, convert it to a base64 string
    reader.onload = () => {
      // Get the base64-encoded string without the data URI prefix
      const base64String = (reader.result as string).split(',')[1];
      // Add the data URI prefix to the base64 string
      const dataUrl = `data:image/${fileType};base64,` + base64String;
      this.imageDataURL = dataUrl

      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer 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`,
          "Content-Type": "application/json"
        }),
      };

      const body = JSON.stringify({
        data: [
          "InterFaceGAN",//string, // represents selected choice of 'Choose latent space editing option. For InterFaceGAN and StyleCLIP, set the options below:' Radio component
          this.poseValue * -1,//number, // represents selected value of 'Pose' Slider component
          smile,//number, // represents selected value of 'Smile' Slider component
          0,//number, // represents selected value of 'Perceived Gender' Slider component
          this.ageValue,//number, // represents selected value of 'Age' Slider component
          this.hairValue* -1,//number, // represents selected value of 'Hair Length' Slider component
          this.beardValue,//number, // represents selected value of 'Beard' Slider component
          0,//number, // represents selected value of 'Glasses' Slider component
          " ",//string, // represents text string of 'Source text' Textbox component
          " ",//string, // represents text string of 'Target text' Textbox component
          1,//number, // represents selected value of 'Edit strength' Slider component
          0.14,//number, // represents selected value of 'Disentanglement Threshold' Slider component
          this.imageDataURL,//string, // represents image data as base64 string of 'Input image' Image component
          ["base"],//Array<string>, // represents list of selected choices of 'Choose your styles!' Checkboxgroup component
        ]
      });
      console.log("huggingFaceBody==>", body)

      this.http.post("https://kuro1730-stylegan-nada-apitest.hf.space/run/genImgB", body, httpOptions)
        .subscribe(res => {
          this.interFaceResponse = res
          this.base64Interface = this.interFaceResponse.data[0]

          this.setResultImageB64(this.base64Interface)

        },
        error => {
          this.openErrorModal();
          console.error('HTTP Error:', error);
        })
    };
  };

  setResultImageB64(imageResponse: any) {
    imageResponse = imageResponse.slice(2, -2);
    var byteString = atob(imageResponse);
    var arrayBuffer = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      arrayBuffer[i] = byteString.charCodeAt(i);
    }
    this.resultFile = new File([arrayBuffer], 'resultfile.png', { type: 'image/png' });
    this.store.dispatch(new ResultState.updateState({ File: this.resultFile }))
    if (this.isLoading == true) {
      this.ageValue = 0;
      this.hairValue = 0;
      this.poseValue = 0;
      this.beardValue = 0;
      this.smile = undefined;
    }
    this.isLoading = false;
  }
}
