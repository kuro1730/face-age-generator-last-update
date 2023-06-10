import { Component, OnInit } from '@angular/core';
import { Select,Store } from "@ngxs/store";
import { Observable } from 'rxjs';
import { first } from "rxjs/operators";
import { ConfigState } from 'src/app/core/store/config/config.actions'
import { Iconfig} from 'src/app/core/store/config/config.model'
import { configState } from '../core/store/config/config.state';
import { Router, ActivatedRoute, NavigationExtras} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CameraComponent } from '../camera/camera.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-newhome',
  templateUrl: './newhome.component.html',
  styleUrls: ['./newhome.component.scss']
})
export class NewhomeComponent implements OnInit {
  isHovering: boolean;
  constructor(private store: Store,private router:Router, private route: ActivatedRoute,private dialog: MatDialog,private modalService: NgbModal) { }
  files: File[] = [];
  file: File=null;
  sourceURL: string ;
  configStore :Observable<any>;
  @Select()
  configState$: Observable<configState>;
  stateData: any;
  toggleUpload:boolean ;
  uploadFinish:boolean=false ; 




  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const refresh = params['refresh'];
      if (refresh === 'true') {
        this.refreshPage();
      }
    }).unsubscribe();;
  }

  refreshPage() {
    const navigationExtras: NavigationExtras = {
      replaceUrl: true
    };
  
    this.router.navigate([this.router.url], navigationExtras);
  }


  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(event) {
    for (let i = 0; i < event.length; i++) {
        console.log('uploadManager adding file: ', event.item(i));
        this.files.push(event.item(i));
        this.file= this.files[i]
        
        
        // reader.onload = () => {
        //  this.sourceURL = reader.result;
        // };
        // reader.readAsDataURL(event.item(i));

        
        this.store.dispatch(new ConfigState.updateState({File: this.file}))
        // this.configState$.subscribe(file=>{this.stateData=file})
        // console.log("ConfigState==>",this.stateData.File);
        // this.file=this.stateData.File
        // if(this.file===this.files[i]&&this.file==this.files[i]){console.log("this File is Equal i sus")}
    }
       
    
   
  }

  removeFile() {
    // Delete the item from fileNames list
    // delete file from FileList
    this.files = [];
    this.store.dispatch(new ConfigState.resetState())
   }
  
   openCameraModal() {
    const modalRef = this.modalService.open(CameraComponent, { size: 'lg' ,centered: true,windowClass: 'custom-modal' });
    modalRef.componentInstance.disableClose = true;
    modalRef.result.then((result: File) => {
      if (result) {
        this.files.push(result);
        this.file = result;
        this.store.dispatch(new ConfigState.updateState({ File: this.file }));
      }
    }).catch((error) => {
      console.log('The modal was dismissed');
    });
  }



}
