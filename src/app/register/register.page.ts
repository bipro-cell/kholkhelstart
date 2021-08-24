import { Component, OnInit } from '@angular/core';
import { NavController,NavParams } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HttpClient,HttpHeaders,HttpRequest } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss']
})
export class RegisterPage implements OnInit {
  
  public fname : string;
  public lname : string;
  public email : string;
  public phone : string;
  public desc : string;
  public mobile : string;
  public isUserCreated : any;
  public myphoto : any;
  constructor(public navCtrl: NavController,private camera: Camera,public http:HttpClient,public toastController: ToastController,public loadingCtrl:LoadingController) { }
    
  regForm(){
    
    let newpo=new FormData();
    newpo.append('username',this.fname);
    newpo.append('name',this.fname+" "+this.lname);
    newpo.append('password','123');
    newpo.append('first_name',this.fname);
    newpo.append('last_name',this.lname);
    newpo.append('email',this.email);
    newpo.append('description',this.desc);

    let headers = new HttpHeaders({
    'Authorization': 'Basic cml3YXlhdGVkaWxsaTpSaXdheWF0ZWRpbGwmJjIwMTk='});
   let options = { headers: headers };

    this.http.post('http://riwayatedilli.com/site/wp-json/wp/v2/users',newpo,options).subscribe(data=>{
        console.log(data);
        this.isUserCreated=data;
        if(this.isUserCreated){
          this.showToast("User created successfully");
        }
        else{
          this.showToast("Not able to create user, please try after sometime");
        }
    },error=>{
      this.showToast("Error");
    });
  
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

  takePhoto(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }


  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
