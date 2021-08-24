import { Component, OnInit,ViewChildren,QueryList } from '@angular/core';
import { NavController,NavParams } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { LoadingController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import {Router} from '@angular/router';
import { ToastController,IonRouterOutlet } from '@ionic/angular';
import {NgPipesModule} from 'ngx-pipes';
@Component({
  selector: 'app-citiesofdelhi',
  templateUrl: 'cities-of-delhi.page.html',
  styleUrls: ['cities-of-delhi.page.scss']
})
export class CitiesOfDelhiPage implements OnInit {
  
    isLoading = false; 
    posts: any;
    backsub:any;
    lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
    constructor(public navCtrl: NavController,public toastController: ToastController,private router: Router,public platform: Platform,public loadingCtrl:LoadingController,private http: HttpClient) {
         /* alert("hiii");*/
             this.loadingPresent();
              this.http.get('https://riwayatedilli.com/site/wp-json/wp/v2/fetch/postbyparent/161').subscribe(data => {
               this.posts = data;
               this.loadingdismiss();
              },error=>{
                  this.loadingdismiss();
                  this.presentToast();           

              });
          //   loading.present();
          // })
          // loading.catch
          
  }
  ngOnDestroy(){ 
    // console.log("dismissed");
    this.loadingdismiss();
  }
  goback(){
    this.navCtrl.back();
  }
 // async backbttsub()
 //  {

 //    this.backsub=this.platform.backButton.subscribeWithPriority(666666,()=>{
 //              if(this.isLoading==true)
 //              {
 //                this.loadingdismiss();
 //              }
              
 //              this.navCtrl.back(); 
 //             });


 //    return await this.backbttsub().then(()=>console.log('subscribed')); 
 //  }
 //  async backbttunsub(){
 //    return await this.backsub.unsubscribe().then(()=>console.log('unsunscribed'));
 //  }

 myClickFunction(postTitle){
  // alert(postTitle);
  this.navCtrl.navigateForward('/post-detail/..12');
}
 removeHTMLInfo(value: string)
{  
    if (value)

        return value.replace(/<\/?[^>]+>/gi, "");
}


// goBack()
// {
//   this.router.navigateByUrl('/home');
// }
visible = false;
  toggle() {
   this.visible = !this.visible;
  }

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

  
  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
