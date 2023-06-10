import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropzoneDirective } from './directives/dropzone.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';


import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxsModule } from "@ngxs/store";
import { WebcamModule } from 'ngx-webcam';
import { configState } from "./core";
import { urlState } from "./core";
import { resultState } from "./core";
import { pdpaState } from './core';
import { ageState } from './core';
import { NewhomeComponent } from './newhome/newhome.component';
import { IntroComponent } from './intro/intro.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { UploadTaskComponent } from './upload-task/upload-task.component';
import { ResultTaskComponent } from './result-task/result-task.component';
import { ConfigComponent } from './config/config.component';
import { PdpaConsentComponent } from './pdpa-consent/pdpa-consent.component';
import { NgbModalModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CameraComponent } from './camera/camera.component';
import { ShareComponent } from './share/share.component';
import { WebcamComponent } from './webcam/webcam.component';
import { FacedetectComponent } from './facedetect/facedetect.component';
import { GenDetectFaceComponent } from './gen-detect-face/gen-detect-face.component';
import { ShareModule } from 'ngx-sharebuttons';
import { ContactComponent } from './contact/contact.component';
import { OffcanvasComponent } from './offcanvas/offcanvas.component';
import { BannerComponent } from './banner/banner.component';
import { ModalErrorComponent } from './modal-error/modal-error.component';

@NgModule({
    declarations: [
        AppComponent,
        DropzoneDirective,
        NewhomeComponent,
        IntroComponent,
        HeaderComponent,
        CardComponent,
        UploadTaskComponent,
        ResultTaskComponent,
        ConfigComponent,
        PdpaConsentComponent,
        CameraComponent,
        ShareComponent,
        WebcamComponent,
        FacedetectComponent,
        GenDetectFaceComponent,
        ContactComponent,
        
        BannerComponent,
                  ModalErrorComponent,

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CommonModule,
        AngularFireModule.initializeApp(environment.firebase),  // imports firebase/app needed for everything
        AngularFirestoreModule,                                 // imports firebase/firestore, only needed for database features
        AngularFireStorageModule,                               // imports firebase/storage only needed for storage features
        AngularFireDatabaseModule,

        MatAutocompleteModule,
        MatBadgeModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        MatNativeDateModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        NgxsModule.forRoot([configState,urlState,resultState,pdpaState,ageState], { developmentMode: true }),
        NgxSliderModule,
        WebcamModule,
        NgbModalModule,
        ShareModule,
        OffcanvasComponent,
    ],
    providers: [NgbActiveModal,ConfigComponent,ShareComponent],
    bootstrap: [AppComponent]
    
})

export class AppModule { 
    
}
