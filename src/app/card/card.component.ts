import { Component,Input,OnInit,Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() file:any
  @Input() fileSrc:any
  imageSrc:String
  constructor() { }
  
  ngOnInit(): void {
    if(this.file)
    this.loadFileImg();
    if(!this.file)
    this.imageSrc=this.fileSrc
    console.log(this.imageSrc)
  }
  loadFileImg(){
    // let output = document.getElementById('output') as HTMLImageElement | null;
    //     output.src = URL.createObjectURL(this.file);
    //     output.onload = function() {
    //     URL.revokeObjectURL(output.src) // free memory
        
    //   }
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.addEventListener('load', () => {
      this.imageSrc = reader.result as string;
      console.log("this.imageSrc=>",this.imageSrc)
      
    });
    console.log("APP-CARD this.file==>",this.file)
  //   reader.onload = () => {
   
  //   this.imageSrc = reader.result as string;
  
  // }
}
}
