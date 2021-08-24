import { Component } from '@angular/core';
import { NavController,ModalController } from '@ionic/angular';
import { ActivatedRoute, Router,RouterModule} from '@angular/router';
import { HttpClient,HttpHeaders,HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { CommentPage } from '../comment/comment.page';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Storage } from '@ionic/storage';
// import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-postwalkdetails',
  templateUrl: 'post-walk-details.page.html',
  styleUrls: ['post-walk-details.page.scss'],
})
export class PostwalkdetailsPage {

	postid: any;
	details: any;
	datastring:String;
  isLoading = false;
  backsub:any;
  narration:any;
  arg:String;
  narrative:any;
  timeinout:any;
  entryfee:any;
  arch:any;
  quote:any;
  reference:any;
  title:any;
  message:string;
  image:string;
  uri:string;
	constructor(public navCtrl: NavController,public socialSharing:SocialSharing,public toastController: ToastController,public platform: Platform,public loadingCtrl:LoadingController,private http: HttpClient,private route: ActivatedRoute, private router: Router,public modal:ModalController,private storage: Storage) {
		// this.postid =this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe(
      (params) => {
        this.postid = params.id
      }
    );
             storage.get('postlist').then((val) => {
            this.details = Array.of(val);

             // for(let post of this.details){
             //    var amg=post.content.rendered;
             //    this.title=post.title.rendered;
             //  }
              var amg=this.details[0][this.postid]['content'];
              this.title=this.details[0][this.postid]['title']
              let parser = new DOMParser();
              let parsedHtml = parser.parseFromString(amg, 'text/html');
              // console.log(parsedHtml);
              this.narrative=parsedHtml.getElementById("walk").innerHTML;
              this.timeinout=parsedHtml.getElementById("timeinout").innerHTML;
              this.entryfee=parsedHtml.getElementById("entryfee").innerHTML;
              // this.loadingdismiss(); 

            },error=>{
                  // this.presentToast();           

              });

}
back(){
  this.router.navigate(['/heritage-walks']);
}
// comment(){
//   let formdata=new FormData();
//   formdata.append('post',this.postid);
//   formdata.append('author_name','Biprt');
//   formdata.append('author_email','djkjd@gmail.com');
//   formdata.append('content','Doodle');

//   this.http.post('http://riwayatedilli.com/site/wp-json/wp/v2/comments',formdata).subscribe(data=>{
//       console.log(data);
//   },error=>{
//     console.log("Error");
//   });
// }
// newpost(){
//   let newpo=new FormData();
//   newpo.append('title','test from ionic');
//   newpo.append('content','Show Data');
//   let headers = new HttpHeaders({
//     'Authorization': 'Basic cml3YXlhdGVkaWxsaTpSaXdheWF0ZWRpbGwmJjIwMTk='});
//   let options = { headers: headers };
  
//   this.http.post('https://riwayatedilli.com/site/wp-json/wp/v2/posts',newpo,options).subscribe(data=>{
//       console.log(data);
//   },error=>{
//     console.log("Error");
//   });
// }

    
  readyToShare(){
       var options={
         title:'Riwayat-e-Dill',
         message:this.title,
        subject:'',
        files:'',
        url:'https://riwayatedilli.com/site/?p='+this.postid,
       };
       this.socialSharing.shareWithOptions(options);
   }
ngOnDestroy(){ 
  // this.loadingdismiss();
  // this.backbttunsub();
  }
  // backbttsub()
  // {

  //   this.platform.backButton.subscribe(async ()=>{
  //             if(this.isLoading==true)
  //             {
  //               this.loadingdismiss();
  //             }
              
  //             this.navCtrl.back(); 
  //            });

 
  // }
  // backbttunsub(){
  //   this.platform.backButton.unsubscribe();
  // }
	// goBack()
	// {
 //  		this.router.navigateByUrl('/cities-of-delhi');
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
  ionViewDidEnter(){
  // this.backbttsub();
}

ionViewWillEnter(){
  // alert("is entering");
}
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'No Internet Connection or Data not found',
      duration: 2000,
      position:"middle",
      color:"primary",
      showCloseButton: true,
      closeButtonText:"Reload"
    });
    toast.onDidDismiss().then((data)=>{
          // alert('Reload');
    });
    toast.present();
  }
  async presentModal() {
   let newmodal = await this.modal.create({
    component: CommentPage,
    componentProps: {
      'postid':this.postid,
    },
    cssClass:'my-comment-modal-css'
  });
  return await newmodal.present();
}

	ngOnInit() {

	this.postid =this.route.snapshot.paramMap.get('id');
	}
  // clickrun()
  // {
  //   var sjdj=document.getElementById("narration");
  //   alert(sjdj);
  // }

}
