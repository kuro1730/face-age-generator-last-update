import { Component, OnInit, Output, AfterViewChecked, ChangeDetectorRef, OnDestroy,ViewChild } from '@angular/core';
import { urlState } from '../core/store/URL/url.state';
import { Observable, finalize, interval } from 'rxjs';
import { configState } from '../core/store/config/config.state';
import { resultState } from '../core/store/result/result.state';
import { Select, Store } from '@ngxs/store';
import { ResultState } from 'src/app/core/store/result/result.actions'
import { ActivatedRoute } from '@angular/router';
import { UrlState } from 'src/app/core/store/URL/url.actions'
import { ConfigState } from '../core';
import { Subscription } from 'rxjs';
import { ShareComponent } from '../share/share.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-result-task',
  templateUrl: './result-task.component.html',
  styleUrls: ['./result-task.component.scss'],
  providers: [ShareComponent]
})
export class ResultTaskComponent implements OnInit, OnDestroy {
  // @ViewChild(ShareComponent) shareComponent!: ShareComponent;
  imgDataUrl: any
  files: File[] = [];
  file: File;
  resultFile: File;
  resultFiles: File[] = []
  @Select()
  configState$: Observable<configState>;
  stateData: any;
  

  @Select()
  urlState$: Observable<urlState>;
  stateUrl: string
  constructor(private store: Store, private route: ActivatedRoute, private changeDetectorRef: ChangeDetectorRef,private router : Router ) {

  }
  @Select()
  resultState$: Observable<resultState>
  resultData: any
  downloadURL: string
  private resultSubscription: Subscription;
  ngOnInit(): void {
    
    this.resultFiles = []
    this.resultData = null
    this.file = null
    this.downloadURL = this.route.snapshot.paramMap.get('downloadURL');
    this.store.dispatch(new UrlState.updateState({ url: this.downloadURL }))
    let stateUrl
    this.configState$.subscribe(File => { this.stateData = File }).unsubscribe();
    console.log("ConfigState==>", this.stateData.File);
    this.file = this.stateData.File
    this.files.push(this.file)


    this.urlState$.subscribe(url => { stateUrl = url }).unsubscribe();
    this.stateUrl = stateUrl.url
    console.log("stateUrlB==>", this.stateUrl)
    this.resultFiles = []

    this.resultSubscription = this.resultState$.subscribe(File => {
      this.resultFiles = []
      this.resultData = null
      this.resultData = File
      this.resultFile = this.resultData.File
      // if(this.resultFiles==[])
      if (this.resultFile != null)
        this.resultFiles.push(this.resultFile)
      // if (this.resultFile != null && this.resultSubscription) {
      //   this.resultSubscription.unsubscribe();
      //   console.log('Unsubscribed from resultState$');
      // }
      console.log("state result this.resultFile ==>", this.resultFile)

    })

  }
 
  ngOnDestroy(): void {
    this.resultFiles = []
    this.resultFile = null
    if (this.resultSubscription) {
      this.resultSubscription.unsubscribe();
      console.log('Unsubscribed from resultState$');
    }

  }
  onClearData() {
    // console.log("reset the state")
    // this.resultFile = null
    // this.resultFiles = []
 
  }

  goToBanner(){
    this.router.navigate(['/banner'])
  }
  // shareOnFacebook(): void {
  //     const file = this.resultFile; // You can choose which file to share here
      
  //     this.shareComponent.shareOnFacebook(file);
    
  // }

}
