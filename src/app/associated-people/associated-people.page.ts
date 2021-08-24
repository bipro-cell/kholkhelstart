import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { LoadingController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-associatedpeople',
  templateUrl: 'associated-people.page.html',
  styleUrls: ['associated-people.page.scss']
})
export class AssociatedPeoplePage{
  

  postid: any;
  posts: any;
  details: any;
  datastring:String; 
  isLoading = false;
  backsub : any; 
  constructor(public navCtrl: NavController,public platform: Platform,public loadingCtrl:LoadingController,private http: HttpClient,private route: ActivatedRoute, private router: Router,public toastController: ToastController) {
    
           this.http.get('https://riwayatedilli.com/site/wp-json/wp/v2/fetch/postbycategory/535').subscribe(data => {
               this.posts = data;
               //console.log(this.posts);
               this.loadingdismiss();
              },error=>{
                  this.loadingdismiss();
                  this.presentToast();           

              });
  }



 
  backbttsub()
  {

    this.platform.backButton.subscribe(async ()=>{
              if(this.isLoading==true)
              {
                this.loadingdismiss();
              }
              
              this.navCtrl.back(); 
             });

 
  }
  backbttunsub(){
    this.platform.backButton.unsubscribe();
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
}

