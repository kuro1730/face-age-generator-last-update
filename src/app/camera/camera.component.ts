import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter,OnDestroy,Inject,AfterViewInit} from '@angular/core';
//import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as faceapi from 'face-api.js';
import { TinyFaceDetectorOptions } from 'face-api.js';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit,OnDestroy,AfterViewInit {

  @ViewChild('video') video: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  private stream: MediaStream | null = null;
  capturing: boolean = false;
  image: string;
  showVideo = true;
  isLoading : boolean = false ;
  capturingEnabled: boolean = false;
  detectStarted:boolean = false;
  constructor(public activeModal: NgbActiveModal) {
    
  }

  ngOnInit() {
    
    this.loadFaceDetectionModel();
  }
  ngAfterViewInit(): void {
    this.isLoading = true;
  navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    this.isLoading = false;
    this.stream = stream;
    this.video.nativeElement.srcObject = stream;
    this.video.nativeElement.classList.add('video-flipped');
    this.video.nativeElement.play();
    setInterval(() => {
      this.detectFaces();
    }, 1000);
  });
  }
  ngOnDestroy() {
    if (this.stream) {
      const tracks = this.stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    }
  }
  async loadFaceDetectionModel() {
    await faceapi.loadTinyFaceDetectorModel('/assets/models');
  }
  async detectFaces() {
    if (!this.video) {
      return;
    }
  
    const options = new TinyFaceDetectorOptions();
    const result = await faceapi.detectSingleFace(this.video.nativeElement, options);
    
    if (result) {
      this.capturingEnabled = true;
    } else {
      this.capturingEnabled = false;
    }
    this.detectStarted=true;
  }

  onNoClick(): void {
    this.activeModal.dismiss();
  }
  capture(): void {
    
    this.capturing = true;
    if (!this.video ) {
      console.error('Video or canvas element not found');
      return;
    }
    const canvas = this.canvas.nativeElement;
    canvas.width = this.video.nativeElement.videoWidth;
    canvas.height = this.video.nativeElement.videoHeight;
    const context = canvas.getContext('2d');
    context.scale(-1, 1);
    context.translate(-canvas.width, 0);
    
    context.drawImage(
      this.video.nativeElement,
      0,
      0,
      canvas.width,
      canvas.height
    );
    context.setTransform(1, 0, 0, 1, 0, 0);
    this.showVideo = false;
    this.image = this.canvas.nativeElement.toDataURL();
  }

  retake(): void {
    this.capturing = false;
    
    this.image = null;
    const context = this.canvas.nativeElement.getContext('2d');
    context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.showVideo = true;
  }

  save(): void {
    const file = this.dataURLtoFile(this.image, 'image.png');
    this.activeModal.close(file);
  }

  private dataURLtoFile(dataUrl: string, fileName: string): File {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  }

}