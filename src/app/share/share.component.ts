import { Component, OnInit,Input } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of, lastValueFrom } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
declare var FB: any;
@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']

})


export class ShareComponent implements OnInit {
  @Input() inputfile:any
  task: AngularFireUploadTask;           
  constructor(private storage: AngularFireStorage, private db: AngularFirestore,) { }
  file:any
  downloadURL:any
  snapshot: Observable<any>;
  
  
  ngOnInit(): void {  
      FB.init({
        appId: '1923569421326153',
        version: 'v16.0' ,
        xfbml:false
      });
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js#version=v16.0&appId=1923569421326153&xfbml=false&autoLogAppEvents=true";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  setInputFile(file){
    this.inputfile = file
  }
  shareOnFacebook(): void {
   
    if (!this.inputfile) {
      console.error('File is undefined or null.');
      return;
    }
    this.file=this.inputfile
    this.startUpload()
  }


  startUpload() {
    let safeName = this.file.name.replace(/([^a-z0-9.]+)/gi, '');   // file name stripped of spaces and special chars
    let timestamp = Date.now();                                     // ex: '1598066351161'
    const uniqueSafeName = timestamp + '_' + safeName;
    const path = 'result/' + uniqueSafeName;                       // Firebase storage path
    const ref = this.storage.ref(path);        
    this.task=this.storage.upload(path, this.file)
    this.task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe(url => {
          console.log(url);
          this.startShareDialog(url)// <-- do what ever you want with the url..
        });
      })
    ).subscribe();
  }
  startShareDialog(url){
    FB.ui({
      method: 'feed',
      picture : url,
      link:"",
      name:"Face-Age-Generator",
      caption:"Face-Age-Generator",
      description:"Face-Age-Generator"
    }, function(response){});
  }

}
