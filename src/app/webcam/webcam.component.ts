import { Component, OnInit, ViewChild, ElementRef ,OnDestroy} from '@angular/core';
import * as faceapi from 'face-api.js';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss']
})
export class WebcamComponent implements OnInit,OnDestroy {

  @ViewChild('video', { static: true })
  public video: ElementRef;
  @ViewChild('canvas', { static: true })
  public canvasRef: ElementRef;
  constructor(private elRef: ElementRef,private activeModal:NgbActiveModal) { }
  stream: any;
  detection: any;
  resizedDetections: any;
  canvas: any;
  canvasEl: any;
  displaySize: any;
  videoInput: any;
  isLoading:boolean=false;

  async ngOnInit() {
    this.isLoading=true;
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('../../assets/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('../../assets/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('../../assets/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('../../assets/models'),
      faceapi.nets.ageGenderNet.loadFromUri('../../assets/models'),

    ])
      .then(() => this.startVideo())
      .catch((err) => console.error(err));
  }
  ngOnDestroy(): void {
    if (this.stream) {
      this.stream.getTracks().forEach((track: any) => track.stop());
    }
  }

  startVideo() {
    
    this.videoInput = this.video.nativeElement;
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(stream => {
      this.stream = stream; // store the stream in the component
      this.videoInput.srcObject = stream;
    })
      .catch(err => console.log(err));
    this.isLoading=false
    this.detect_Faces();
  }

  

  async detect_Faces() {
    this.elRef.nativeElement.querySelector('video').addEventListener('play', async () => {
      this.canvas = this.canvasRef.nativeElement;
      this.displaySize = {
        width: this.video.nativeElement.videoWidth,
        height: this.video.nativeElement.videoHeight
      };
      faceapi.matchDimensions(this.canvas, this.displaySize);
      setInterval(async () => {
        const detection = await faceapi.detectSingleFace(this.videoInput, new faceapi.TinyFaceDetectorOptions()).withAgeAndGender().withFaceExpressions();
        if (detection) {
          this.canvas.getContext('2d').clearRect(0, 0, this.video.nativeElement.videoWidth, this.video.nativeElement.videoHeight);
          const resizedDetection = faceapi.resizeResults(detection, this.displaySize);
          const box = resizedDetection.detection.box;
          let gender
          console.log(typeof(detection.gender))
          switch(detection.gender){
            case 'male' :{
              gender ='ชาย'
              break;
            }
            case 'female': {
              gender = "หญิง"
              break;
            }
            default : {
            gender="ไม่ทราบ"
            break;}
          }
          const drawBox = new faceapi.draw.DrawBox(box, { label: `อายุ ${Math.round(detection.age)} ปี \nเพศ${gender}` });
          drawBox.draw(this.canvas);
          const expressions = detection.expressions;
          const sortedExpressions = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
          sortedExpressions.forEach(([expression, probability], i) => {
            let translExpression
            switch (expression) {
              case 'neutral': {
                translExpression ='ปกติ'
                break;
              }
              case 'happy': {
                translExpression ='มีความสุข'
                break;
              }
              case 'sad': {
                translExpression ='เศร้า'
                break;
              }
              case 'angry': {
                translExpression ='โกรธ' 
                break;
              }
              case 'fearful': {
                translExpression ='หวาดกลัว'
                break;
              }
              case 'disgusted': {
                translExpression ='สะอิดสะเอียน'
                break;
              }
              case 'surprised': {
                translExpression ='ตกใจ'
                break;
              }
              default: {
                translExpression ='ไม่ทราบ'
                break;
              }
            }
            const text = `อารมณ์ ${translExpression} (${(probability * 100).toFixed(2)}%)`;
            new faceapi.draw.DrawTextField(
              [text],
              { x: box.x + box.width + 5, y: box.y + i * 20 },
              { backgroundColor: '#00000090' }
            ).draw(this.canvas);
          });
        }
      }, 1000);
    });
  }

  onNoClick(): void {
    this.activeModal.dismiss();
    if (this.stream) {
      this.stream.getTracks().forEach((track: any) => track.stop());
    }
  }

}