import { Component, OnInit,ChangeDetectorRef,AfterViewChecked} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WebcamComponent } from '../webcam/webcam.component' 
import * as faceapi from 'face-api.js';
@Component({
  selector: 'app-facedetect',
  templateUrl: './facedetect.component.html',
  styleUrls: ['./facedetect.component.scss']
})
export class FacedetectComponent implements OnInit {
  
  constructor(private modalService: NgbModal,private cdr: ChangeDetectorRef) { }
  
  ngOnInit(): void {
    
  }
  
  openCameraModal() {
    const modalRef = this.modalService.open(WebcamComponent, { centered: true,windowClass: 'custom-modal' });
    modalRef.componentInstance.disableClose = true;
    modalRef.result.then(
    ).catch((error) => {
      console.log('The modal was dismissed');
    });
  }

  
  






}
