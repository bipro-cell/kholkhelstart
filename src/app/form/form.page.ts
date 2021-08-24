import { Component, OnInit,NgZone} from '@angular/core';
import { NavController,NavParams } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HttpClient,HttpHeaders,HttpRequest} from '@angular/common/http';
// import { File } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router,RouterModule} from '@angular/router';
import { Platform } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { Observable } from 'rxjs/Observable';

// import{LoaderComponentComponent}from '../loader-component/loader-component.component';

@Component({
  selector: 'app-register',
  templateUrl: 'form.page.html',
  styleUrls: ['form.page.scss']
})
export class FormPage implements OnInit {
  
  myphoto : any;
  title:string;
  content:string;
  postid:any;
  now:any;
  isLoading = false;
  blogID:any;
  formdetails:any;
  public captchaPassed: boolean = false;
  public captchaResponse: string;
  myBoolean=false;
  postarray:any;
  // storageLength:int;
  float_length=0;




  constructor(public navCtrl: NavController,private camera: Camera,public loadingCtrl:LoadingController,public toastController: ToastController,private http:HttpClient,private route: ActivatedRoute, private router: Router,public platform: Platform,private zone: NgZone,private network: Network,private storage: Storage) { 
    // this.postid =this.route.snapshot.paramMap.get('id');
    // this.postid =this.route.snapshot.paramMap.get('id');
    // alert(this.postid);

   // this.postid = this.platform.getQueryParam("n");
   // alert(this.postid);
   this.postid =this.route.snapshot.paramMap.get('id');
    // alert(this.blogID);
    // alert(this.postid);
   // alert(this.captchaPassed);
   // alert(this.postid);
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
  captchaResolved(response: string): void {

        this.zone.run(() => {
            this.captchaPassed = true;
            this.captchaResponse = response;
            // alert(this.captchaPassed);
        });
        // alert(this.captchaPassed);

    }
  sendForm(): void {

        let data = {
            captchaResponse: this.captchaResponse
        };
        // this.http.post('http://localhost:8080/test', data).subscribe(res => {
        //     console.log(res);
        // });
      }


  ngOnInit() {
  }

  async presentToast(p:any) {
    if (p==1)
    {
      var mesg="Blog has been created";
      var clobutton="";
    }
    else{
     var mesg="Connection error Please try again"; 
     var clobutton="Reload";
    }
    const toast = await this.toastController.create({
      message: mesg,
      duration: 2000,
      position:"middle",
      color:"primary",
      showCloseButton: true,
      closeButtonText:clobutton
    });
    toast.onDidDismiss().then((data)=>{
          // alert('Reload');
    });
    toast.present();
  }
  async loadingPresent() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message:"Please wait while blog is created",
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
  // async loadingPresent() {
  //   this.isLoading = true;
  //   return await this.loadingCtrl.create({
  //     message:"Please wait while blog is created",
  //   }).then(a => {
  //     a.present().then(() => {
  //       console.log('presented');
  //       if (!this.isLoading) {
  //         a.dismiss().then(() => console.log('abort presenting'));
  //       }
  //     });
  //   });
  // }
  //   async loadingdismiss() {
  //   this.isLoading = false;
  //   return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  // }

  newpost(){
  //alert(this.title);
  this.loadingPresent();
   this.now=[this.postid];
  // var tag={'category':this.postid}
  // alert(JSON.stringify(tag));
  // var tag=Array.of(this.now);
  let newpo=new FormData();
  newpo.append('title',this.title);
  newpo.append('content',this.content);
  newpo.append('status','publish');
  newpo.append('categories[]',this.postid);
  // var newpo= {
  // "title":this.title,
  // "content":this.content,
  // "status": 'publish',
  // "categories": []
  // }

  
  let headers = new HttpHeaders({
    'Authorization': 'Basic cml3YXlhdGVkaWxsaTpSaXdheWF0ZWRpbGwmJjIwMTk='});
  let options = { headers: headers };
  
  this.http.post('https://riwayatedilli.com/site/wp-json/wp/v2/posts',newpo,options).subscribe(data=>{
     // (data);
     this.presentToast(1); 
     
     this.loadingdismiss();
     this.navCtrl.navigateBack('/home');
  },error=>{
    this.presentToast(2);
  });
}
// async presentToast(p:any) {
//     if (p==1)
//     {
//       var mesg="Blog has been created";
//       var clobutton="";
//     }
//     else{
//      var mesg="Connection error Please try again"; 
//      var clobutton="Reload";
//     }
//     const toast = await this.toastController.create({
//       message: mesg,
//       duration: 2000,
//       position:"middle",
//       color:"primary",
//       showCloseButton: true,
//       closeButtonText:clobutton
//     });
//     toast.onDidDismiss().then((data)=>{
//           // alert('Reload');
//     });
//     toast.present();
//   }
// newpost(){
//   // console.log(this.title);
//   // let newpo=new FormData();
//   this.storage.get('length').then((val) => {
//     this.storageLength=val;
//   });
//   this.postarray=[{'title':this.title,'content':this.content}];
//   console.log(this.postarray.length);
//   return;
//     // newpo.append('title',this.title);
//     // newpo.append('content',this.content);
//     // console.log(JSON.stringify(newpo));
//     // return;
//     this.storage.set('newpoLS[]',this.postarray);
//   //   this.storage.get('newpoLS[]').then((val) => {
//   //   // console.log(val);
//   // });
//       this.storage.get('newpoLS[]').then((val) => {
//           // this.formdetails=Array.of(val);
//           for(let npl of this.formdetails){
//              // console.log(npl);
//              // console.log(npl);
              

             
//               // this.http.post('https://riwayatedilli.com/site/wp-json/wp/v2/posts',newpo,options).subscribe(data=>{
//               // // (data);
//               //       this.presentToast(1); 

//               //       this.loadingdismiss();
//               //       this.navCtrl.navigateBack('/home');
//               //   },error=>{
//               //         this.presentToast(2);
//               //   });

//              // this.http.post('https://riwayatedilli.com/site/wp-json/wp/v2/posts',npl,options).subscribe(data=>{
//              //      console.log(data);
//              //  },error=>{
//              //    console.log("Error");
//              //  });
//           }
//       });
//      // alert("in the function");
//      // return;

//     let headers = new HttpHeaders({
//       'Authorization': 'Basic cml3YXlhdGVkaWxsaTpSaXdheWF0ZWRpbGwmJjIwMTk='});
//     let options = { headers: headers };

//     // watch network for a disconnection
//     let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
//       alert("disconnection");
      
//     });
//     // stop disconnect watch
//     disconnectSubscription.unsubscribe();


//     // watch network for a connection
//     let connectSubscription = this.network.onConnect().subscribe(() => {
//        alert('network connected!');
//       this.storage.get('newpoLS[]').then((val) => {
//           for(let npl of val){
//              alert(npl);
//               return;

             
//               this.http.post('https://riwayatedilli.com/site/wp-json/wp/v2/posts',newpo,options).subscribe(data=>{
//               // (data);
//                     this.presentToast(1); 

//                     this.loadingdismiss();
//                     this.navCtrl.navigateBack('/home');
//                 },error=>{
//                       this.presentToast(2);
//                 });

//              // this.http.post('https://riwayatedilli.com/site/wp-json/wp/v2/posts',npl,options).subscribe(data=>{
//              //      console.log(data);
//              //  },error=>{
//              //    console.log("Error");
//              //  });
//           }
//       });
      
     
      
//     });
//     // stop connect watch
//     connectSubscription.unsubscribe();

    
// }

  changeBoolean(){
    // alert(this.myBoolean
    if(this.myBoolean==true)
    {
      this.captchaPassed=true;
    }
    else{
           this.captchaPassed=false; 
    }
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
