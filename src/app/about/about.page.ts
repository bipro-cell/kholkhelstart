import { Component,OnInit,OnDestroy} from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { LoadingController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss']
})
export class AboutPage{
  postid: any;
  details: any;
  datastring:String;
  isLoading = false; 
  backsub:any;
  constructor(public navCtrl: NavController,public loadingCtrl:LoadingController,public platform: Platform,private http: HttpClient,private route: ActivatedRoute, private router: Router,public toastController: ToastController) {
               
            this.http.get('https://riwayatedilli.com/site/wp-json/wp/v2/pages/1991').subscribe(data => { 
            this.details = Array.of(data);
            // console.log(this.details[0].title.rendered);
              }),error=>{
                  this.presentToast();           

              };
  }

  removeHTMLInfo(value: string)
  {  
      if (value)

          return value.replace(/<\/?[^>]+>/gi, "");
  }

ngOnDestroy(){ 
  this.loadingdismiss();
  }


  // backbttsub()
  // {

  //   this.platform.backButton.subscribe(async()=>{
  //             if(this.isLoading==true)
  //             {
  //               this.loadingdismiss();
  //             }
              
  //             this.navCtrl.back(); 
  //            });

 
  // }
  //  backbttunsub(){
  //    this.platform.backButton.unsubscribe();
  // }
  // goBack()
  // {
  //   this.router.navigateByUrl('/home');
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

  ngOnInit() {
  this.postid =this.route.snapshot.paramMap.get('id');
  // this.backbttsub();
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
