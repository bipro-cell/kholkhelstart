import { Component, OnInit,ViewChildren,QueryList } from '@angular/core';
import { NavController,NavParams } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { LoadingController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController,IonRouterOutlet } from '@ionic/angular';
import { NgPipesModule } from 'ngx-pipes';

@Component({
  selector: 'app-heritagewalks',
  templateUrl: 'heritage-walks.page.html',
  styleUrls: ['heritage-walks.page.scss']
})
export class HeritageWalksPage implements OnInit {
  isLoading = false;
  posts: any;
  text: string;
  backsub:any;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  isShown = false;
  toggle:any;

  constructor(public navCtrl: NavController,public toastController: ToastController,private router: Router,public platform: Platform,public loadingCtrl:LoadingController,private http: HttpClient) {

    
    this.http.get('https://riwayatedilli.com/site/wp-json/wp/v2/fetch/postbyparent/2329').subscribe(data => {
     this.posts = data;
      // console.log(data);
    },error=>{
        // this.loadingdismiss();
        // this.presentToast();           

    });
  }

  showmore(){
  // alert("hiii");
  this.isShown=!this.isShown;
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
  async loadingPresent() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message:"Please wait until data is loaded",
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }
  async loadingdismiss() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'No Internet Connection or Data not found',
      duration: 2000,
      position:"middle",
      color:"primary"
    });
    toast.present();
  }
}
