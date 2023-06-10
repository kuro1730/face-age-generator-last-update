import { Component, OnInit, ElementRef, ViewChild,ChangeDetectorRef,OnDestroy } from '@angular/core';
import * as faceapi from 'face-api.js';
import { IDrawTextFieldOptions } from 'face-api.js/build/commonjs/draw';
@Component({
  selector: 'app-gen-detect-face',
  templateUrl: './gen-detect-face.component.html',
  styleUrls: ['./gen-detect-face.component.scss']
})
export class GenDetectFaceComponent implements OnInit {
  file: File
  displaySize: any
  isHovering: boolean;
  files: File[] = []
  toggleUpload: boolean;
  resultImg:any
  resultFile:File
  isLoading:boolean=false;
  toggleDetect:boolean=false;
  constructor(private cdr:ChangeDetectorRef) { }

  async ngOnInit() {

    
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }
  onDrop(event) {
    for (let i = 0; i < event.length; i++) {
      console.log('uploadManager adding file: ', event.item(i));
      this.files.push(event.item(i));
      this.file = this.files[i]

    }
  }
  removeFile() {
    this.resultImg=null
    this.files = [];
    this.toggleDetect=false
  }
  async startDetect(){
    this.toggleDetect=true;
    this.isLoading=true;
    await Promise.all([
      faceapi.nets.faceExpressionNet.loadFromUri('../../assets/models'),
      faceapi.nets.ageGenderNet.loadFromUri('../../assets/models'),
    ])
    .then(() => {
      console.log('Models loaded successfully.');
      this.detect_Faces();
    })
      .catch((err) => console.error(err));
  }
  async detect_Faces() {
    const img = await faceapi.bufferToImage(this.file);
    const detections = await faceapi.detectAllFaces(img).withAgeAndGender().withFaceExpressions();

    const canvas = document.createElement('canvas');
    //document.body.appendChild(canvas);
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const resizedDetections = faceapi.resizeResults(detections, { width: img.width, height: img.height });
    resizedDetections.forEach(detection => {
      const box = detection.detection.box;
      let gender;
      switch (detection.gender) {
        case 'male':
          gender = 'ชาย';
          break;
        case 'female':
          gender = 'หญิง';
          break;
        default:
          gender = 'ไม่ทราบ';
          break;
      }
      const text = `อายุ ${Math.round(detection.age)} ปี \nเพศ ${gender}`;
      const textWidth = canvas.getContext('2d').measureText(text).width;
      const fontSize = Math.floor(Math.min(canvas.width *3/ textWidth, canvas.height *10));
      const drawBox = new faceapi.draw.DrawBox(box, { label: text ,drawLabelOptions:{fontSize: fontSize}});
      drawBox.draw(canvas);
      const expressions = detection.expressions;
      const sortedExpressions = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
      sortedExpressions.forEach(([expression, probability], i) => {
        let translExpression;
        switch (expression) {
          case 'neutral':
            translExpression = 'ปกติ';
            break;
          case 'happy':
            translExpression = 'มีความสุข';
            break;
          case 'sad':
            translExpression = 'เศร้า';
            break;
          case 'angry':
            translExpression = 'โกรธ';
            break;
          case 'fearful':
            translExpression = 'หวาดกลัว';
            break;
          case 'disgusted':
            translExpression = 'สะอิดสะเอียน';
            break;
          case 'surprised':
            translExpression = 'ตกใจ';
            break;
          default:
            translExpression = 'ไม่ทราบ';
            break;
        }
        const text = `อารมณ์ ${translExpression} (${(probability * 100).toFixed(2)}%)`;
        new faceapi.draw.DrawTextField(
          [text],
          { x: box.x + box.width + 5, y: box.y + i * fontSize*1.5 },
          { backgroundColor: '#00000090',fontSize:fontSize}
        ).draw(canvas);
      });
    });
    this.resultImg=canvas.toDataURL()
    this.isLoading=false;
    // export canvas as a result file
     canvas.toBlob((blob) => {
      const resultFile = new File([blob], 'result.png', { type: 'image/png' });
      this.setResultFile(resultFile)
      console.log(resultFile);
      // do something with the result file
    });
  }

  setResultFile(resultFile){
    this.cdr.markForCheck();
    this.resultFile = resultFile
    // this.files=[]
    // this.files.push(resultFile)
    this.cdr.detectChanges()
  }

  ngOnDestroy(): void {
    this.resultImg=null
    this.files = [];
    this.toggleDetect=false
  }

}
