import { Component } from '@angular/core';
import { ModalController,NavController } from '@ionic/angular';
import { HttpClient,HttpHeaders,HttpRequest } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: 'contactform.page.html',
  styleUrls: ['contactform.page.scss']
})
export class ContactFormPage{
  public name : string;
  public email : string;
  public phone : string;
  public desc : string;
  public subject : string;
  public isEmailSent : any;
  
  constructor(public navCtrl: NavController,public modal:ModalController,public http:HttpClient,public toastController: ToastController) {
       
  }

  async closeModal(){
    await this.modal.dismiss();
  }

  logForm(){
    
    let newpo=new FormData();
    newpo.append('name',this.name);
    newpo.append('email',this.email);
    newpo.append('phone',this.phone);
    newpo.append('desc',this.desc);
    newpo.append('subject',this.subject);

    this.http.post('https://riwayatedilli.com/site/wp-json/wp/v2/submit/contact',newpo).subscribe(data=>{
        //console.log(data);
        this.isEmailSent=data;
        if(this.isEmailSent == 1){
          this.showToast("Mail Sent,Contacting you shortly.");
        }
        else if(this.isEmailSent == 2){
          this.showToast("Mail can not sent, please try after sometime.");
        }
        else{
          this.showToast("Email ID not registered with us.");
        }
    },error=>{
      this.showToast("Error");
    });
    this.closeModal();
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position:"top",
      color:"primary",
      showCloseButton: true,
      closeButtonText:"Reload"
    });
    toast.onDidDismiss().then((data)=>{
          
    });
    toast.present();
  }

}
