import { Component, OnInit } from '@angular/core';
import {ModalController,NavController,ToastController} from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HttpClient,HttpHeaders,HttpRequest} from '@angular/common/http';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@Component({
  selector: 'app-modal',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {
image:any='';
postid:any;
name:string;
email:string;
content:string;
  constructor(private modal:ModalController,public socialSharing:SocialSharing,private camera: Camera,public navCtrl:NavController,public http:HttpClient,public toastCtrl:ToastController) {


   }

  ngOnInit() {
  }

  async closeModal(){
  	await this.modal.dismiss();
  }
  async presentToast(sign='') {
    let toast = await this.toastCtrl.create({
      message: sign,
      duration: 2000,
      position:"middle",
      showCloseButton: true,
      closeButtonText: "share",
      cssClass: "commentToast"
    });
    toast.onDidDismiss().then((data)=>{
          this.readyToShare();
    });
    toast.present();
  }
  openCam(){
		  const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }


    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     //alert(imageData)
     this.image=(<any>window).Ionic.WebView.convertFileSrc(imageData);
    }, (err) => {
     // Handle error
     // alert("error "+JSON.stringify(err))
    });

	}
  comment(){
  let formdata=new FormData();
  formdata.append('post',this.postid);
  formdata.append('author_name',this.name);
  formdata.append('author_email',this.email);
  formdata.append('content',this.content);

  this.http.post('http://riwayatedilli.com/site/wp-json/wp/v2/comments',formdata).subscribe(data=>{
      console.log(data);
      this.presentToast('Comment Successfully Added');  
  },error=>{
    this.presentToast('Internet Error');
    console.log("Error");
  });
  this.modal.dismiss();
}
 readyToShare(){
       // alert("On it");
       var options={
         message:'',
        subject:'GOOD TO NOW',
        files:'',
        url:'',
       };
       this.socialSharing.shareWithOptions(options);
   }
  forward(link:string='/form'){
    // alert(link);
    this.navCtrl.navigateForward(link);

  }
}
