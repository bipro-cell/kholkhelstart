import { Component, OnInit,ViewChildren,QueryList  } from '@angular/core';
import { NavController,ModalController } from '@ionic/angular';
import { HttpClient} from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NgPipesModule } from 'ngx-pipes';
import { ContactFormPage } from '../contactform/contactform.page';

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.page.html',
  styleUrls: ['contact.page.scss']
})
export class ContactPage implements OnInit{
  
  public email : string;
  public isEmailSent : any;
  public isLoading : false;
  public mobile : any; 
  public posts : any;
  
  constructor(public navCtrl: NavController,public http:HttpClient,public toastController: ToastController,public loadingCtrl:LoadingController, public modal:ModalController) {
        
  }


  ngOnInit() {
  }

  loadContentPage(){
    let newpo=new FormData();
    newpo.append('email',this.email)

    this.showToast("Please wait untill data is loading...");
    this.http.post('https://riwayatedilli.com/site/wp-json/wp/v2/fetch/contact',newpo).subscribe(data => {
      //console.log(data);
     this.posts = data;
     this.loadingdismiss();
    },error=>{
        this.showToast("No Internet Connection or Data not found"); 
        this.loadingdismiss();
    });
  }

  async presentModal() {
     let newmodal = await this.modal.create({
      component: ContactFormPage,
      componentProps: {},
      cssClass:'my-comment-modal-css'
    });
    return await newmodal.present();
  }

  logForm(){
    /*console.log(this.name);
    console.log(this.email);
    console.log(this.phone);*/
    

    /*let newpo=new FormData();
    newpo.append('name',this.name);
    newpo.append('email',this.email);
    newpo.append('phone',this.phone);
    newpo.append('desc',this.desc);

    let headers = new HttpHeaders({
    'Content-Type' : 'application/x-www-form-urlencoded'
    });
    
    this.http.post('https://riwayatedilli.com/site/wp-json/wp/v2/submit/contact',newpo,headers).subscribe(data=>{
        console.log(data);
        this.isEmailSent=data;
        if(this.isEmailSent){
          this.showToast("Mail Sent,Contacting you shortly.");
        }
        else{
          this.showToast("Mail can not sent, please try after sometime");
        }
    },error=>{
      this.showToast("Error");
    });*/

  }

 async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position:"middle",
      color:"primary",
      showCloseButton: true,
      closeButtonText:"Reload"
    });
    toast.onDidDismiss().then((data)=>{
          //this.loadContentPage();
    });
    toast.present();
  }

  async loadingdismiss() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }

}
