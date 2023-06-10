import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewhomeComponent } from './newhome/newhome.component';
import { ConfigComponent } from './config/config.component';
import { ResultTaskComponent } from './result-task/result-task.component';
import { IntroComponent } from './intro/intro.component';
import { FacedetectComponent } from './facedetect/facedetect.component';
import { BannerComponent } from './banner/banner.component';
const routes: Routes = [
    { path: '', redirectTo: 'intro', pathMatch: 'full' },
    { path: 'intro', component: IntroComponent },
    { path: 'home', component: NewhomeComponent },
    { path: 'result', component: ResultTaskComponent },
    { path: 'facedetect', component: FacedetectComponent },
    { path: 'banner', component: BannerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
