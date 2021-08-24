import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RecaptchaModule } from 'ng-recaptcha';
import { Camera } from '@ionic-native/camera/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { IonicStorageModule } from '@ionic/storage';
// import { EscapeHtmlPipe } from './pipes/keep-html.pipe';
import {LoaderService} from './services/loader.service';
import{LoaderComponentComponent} from './loader-component/loader-component.component';
import { Network } from '@ionic-native/network/ngx';
// import{FormPage}from './form/form.page';
import {SpeechRecognition} from '@ionic-native/speech-recognition/ngx';
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import {QuizmodalPageModule} from '../app/quizmodal/quizmodal.module';
// import { SpecialMovePageModule} from '../app/special-move/special-move.module';
import {SpecialmovemodalPageModule} from '../app/specialmovemodal/specialmovemodal.module';
// import{ChatComponent} from './chat/chat.component';
const config:SocketIoConfig={url:'https://3.7.44.247:5000',options:{secure:true,
reconnect: true,
rejectUnauthorized : false}};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    QuizmodalPageModule,
    SpecialmovemodalPageModule,
    IonicStorageModule.forRoot(),
    RecaptchaModule.forRoot(),
    SocketIoModule.forRoot(config)
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    SocialSharing,
    LoaderService,
    Network,
    SpeechRecognition,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
