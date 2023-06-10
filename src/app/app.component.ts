import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'face-age-generator';
 
 
  // ngAfterViewChecked(){
  //   this.currentPath = this.route.snapshot.url.map(segment => segment.path).join('/');
  //   console.log("this.currentPath==>",this.currentPath)
  // }
  
}
