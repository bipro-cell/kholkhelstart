import { Component, OnInit,Input} from '@angular/core';
import {ModalController,NavController} from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
image:any='';
isWalkThrough:any;
header:any;
description:any;
post_id:any;
@Input("blogID") blogID;
@Input("lat") lat;
@Input("long") long;

  slider=[{
    content: "1) This is a dice based race game played with stakes."

  },
  {
    content: "2) The stakes get collected in a bank called the bank of self discovery."
  },
  {
    content: "3) Your counter will move spirally inwards towards self discovery, engaging with the various monuments it lands on in it's path.",
    img:"../../assets/gif/how3.gif"
  },
  {
    content: "4) The monuments have their own personalities and this is an opportunity for you to interact, introspect and connect with your experiences and your narratives with these 'living monuments'"
  },
  {
    content: "5) special moves connecting to unique narratives weaved by time are embedded within each cell.  engage with these and add your own through the comments and blogs section which you can contribute to."
  },
  {
    content: "6) add your friends to your game play"
  },
  {
    content: "7) earn stakes by answering questions"
  }
  ];
  constructor(private modal:ModalController,private camera: Camera,public navCtrl:NavController) {

        // alert(this.blogID);
   }

  ngOnInit() {
  }

  async closeModal(){
  	await this.modal.dismiss();
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
  forward(link:string='/form'){
     this.navCtrl.navigateForward(link+'/'+this.blogID);
    // console.log(this.blogID);

  }
}
