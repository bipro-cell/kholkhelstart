import { Component,ViewChildren,QueryList } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Platform,ModalController,MenuController,ActionSheetController,PopoverController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController,IonRouterOutlet,LoadingController,AlertController} from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  toa:any;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: '../assets/icon/home.png'
    },
    {
      title: 'Cities of Delhi',
      url: '/cities-of-delhi',
      icon: '../assets/icon/cities_of_delhi.png'
    },
    {
      title: 'Heritage Walks',
      url: '/heritage-walks',
      icon: '../assets/icon/walk.png'
    },
    {
      title: 'Associated People',
      url: '/associated-people',
      icon: '../assets/icon/associated_people.png'
    },
    {
      title: 'Registration',
      url: '/register',
      icon: '../assets/icon/register.svg'
    },
    // {
    //   title: 'Shop',
    //   url: '/shop',
    //   icon: ''
    // },
    // {
    //   title: 'Settings',
    //   url: '/settings',
    //   icon: 'settings'
    // },
    {
      title: 'About',
      url: '/about',
      icon: '../assets/icon/about.png'
    },
    {
      title: 'Contact us',
      url: '/contact',
      icon: '../assets/icon/contact.png'
    }
  ];
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public modalCtrl: ModalController,
    private menu: MenuController,
    private actionSheetCtrl: ActionSheetController,
    private popoverCtrl: PopoverController,
    private router: Router,
    private toast: ToastController,
    public loader: LoadingController,
    private alertCtrl:AlertController, 
    public navCtrl:NavController
  ) {
    this.initializeApp();
    // this.backButtonEvent();

  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  forward(link:string='/home'){
    // alert(link);
    this.navCtrl.navigateForward(link);

  }
//    backButtonEvent() {
//         this.platform.backButton.subscribe(async () => {
//             // close action sheet
//             try {
//                 const element = await this.actionSheetCtrl.getTop();
//                 if (element) {
//                     element.dismiss();
//                     return;
//                 }
//             } catch (error) {
//             }

//             // close popover
//             try {
//                 const element = await this.popoverCtrl.getTop();
//                 if (element) {
//                     element.dismiss();
//                     return;
//                 }
//             } catch (error) {
//             }

//             // close modal
//             try {
//                 const element = await this.modalCtrl.getTop();
//                 if (element) {
//                     element.dismiss();
//                     return;
//                 }
//             } catch (error) {
//                 console.log(error);

//             }

//             // close side menua
//             try {
//                 const element = await this.menu.getOpen();
//                 if (element !== null) {
//                     this.menu.close();
//                     return;

//                 }

//             } catch (error) {

//             }
//             try{
//               alert("loader dismiss");
//               this.loader.dismiss();
//             }
//             catch(error){

//             }

//             this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
//                 if (outlet && outlet.canGoBack()) {
//                     this.presentAlert();
//                     outlet.pop();

//                 } else if (this.router.url === '/home') {
//                     if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
//                         // this.platform.exitApp(); // Exit from app
//                         this.presentAlert();
//                         navigator['app'].exitApp(); // work for ionic 4

//                     } else {
//                       this.presentAlert();
//                         this.toa=this.toast.create({
//                                 message: 'User was added successfully',
//                                 duration: 3000,
//                                 position: 'top'
//                               });
//                         this.toa.present();

//                         this.lastTimeBackPress = new Date().getTime();
//                     }
//                 }
//             });
//         });
//     }
//    async presentAlert() {
//     const alert = await this.alertCtrl.create({
//       header: 'Alert',
//       subHeader: 'Subtitle',
//       message: 'This is an alert message.',
//       buttons: ['OK']
//     });

//     await alert.present();
//   }
 }
