import { Component } from '@angular/core';
import { NavController,ModalController } from '@ionic/angular';
import { ActivatedRoute, Router,RouterModule} from '@angular/router';
import { HttpClient,HttpHeaders,HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import {CommentPage} from '../comment/comment.page';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Storage } from '@ionic/storage';
// import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-postdetails',
  templateUrl: 'post-details.page.html',
  styleUrls: ['post-details.page.scss'],
})
export class PostdetailsPage {

	postid: any;
	details: any;
	datastring:String;
  isLoading = false;
  backsub:any;
  posts: any;
  narration:any;
  arg:String;
  narrative:any;
  arch:any;
  quote:any;
  reference:any;
  title:any;
  message:string;
  image:string;
  uri:string;
  comments:any;
  comen=[];
  font_quoteclass=20;
  font_archclass=17;
  font_narraclass=17;
  font_referclas=17;
  blogid:any;
  blogs:any;
  src:any;
  resposnse:object;
  returnDecide:number;
  

	constructor(public navCtrl: NavController,public socialSharing:SocialSharing,public toastController: ToastController,public platform: Platform,public loadingCtrl:LoadingController,private http: HttpClient,private route: ActivatedRoute, private router: Router,public modal:ModalController,private storage: Storage) {
		// this.postid =this.route.snapshot.paramMap.get('id');
  //   this.blogid =this.route.snapshot.paramMap.get('bid');
    this.route.params.subscribe(
      (params) =>  {
        this.postid = params.id,
        this.blogid = params.bid
        this.returnDecide = params.pagereturn
      }
     );
     // alert(this.postid);
            // var divToChange = document.getElemetById('my_id');
            this.loadingPresent();
            // this.http.get('http://riwayatedilli.com/site/wp-json/wp/v2/posts/'+this.postid).subscribe(data => {
            storage.get('postlist').then((val) => {
            this.details = Array.of(val);
            // console.log(val);
             // for(let post of this.details){
             //    var amg=post.content;
             //    this.title=post.title;
             //  }
             var amg=this.details[0][this.postid]['content'];
             this.title=this.details[0][this.postid]['title'];
             this.src=this.details[0][this.postid]['image'];
              let parser = new DOMParser();
              let parsedHtml = parser.parseFromString(amg, 'text/html');
             this.narrative=parsedHtml.getElementById("narrative").innerHTML;
             this.arch=parsedHtml.getElementById("arch").innerHTML;
             this.quote=parsedHtml.getElementById("quote").innerHTML;
             this.reference=parsedHtml.getElementById("refer").innerHTML;
             this.getComment();
             this.getBlog();
             this.loadingdismiss();
             // this.getPost();

            },error=>{
                  this.loadingdismiss();
                  this.presentToast();           

              });

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
// increaseFontSize() {
//     this.font_size = this.font_size * 1.1;
//     let htmlRoot:HTMLElement = <HTMLElement> document.getElementsByTagName("html")[0];
//     if (htmlRoot != null) {
//        htmlRoot.style.fontSize = this.font_size + '%';
//     }
// getPost()
// {
//   let formdata=new FormData();
//   formdata.append('id','543');
//   formdata.append('name','Iron Pillar');
//   this.http.post('https://riwayatedilli.com/site/wp-json/wp/v2/categories',formdata).subscribe(data => {
//                this.posts = data;
//                console.log(this.posts);
//                this.loadingdismiss();
//               },error=>{
//                   this.loadingdismiss();
//                   this.presentToast();           

//               });

// }

back(){
  if(this.returnDecide == 0){
    this.router.navigate(['/cities-of-delhi']);
  }
  else{
     this.router.navigate(['/home']);
  }
}
getComment()
{
  // let formdata=new FormData();
  // formdata.append('post',this.postid);
  this.http.get('https://riwayatedilli.com/site/wp-json/wp/v2/comments?post='+this.postid).subscribe(data => {
       // console.log(data);
     this.comments=data;
     // for(let com of this.comments)
     // {
     //     this.comen={'title':com.title,'username':com.author_name,'date':com.author_name,'content':com.content.rendered};
     // }
     // console.log(this.comments);
  },error=>{
                  this.loadingdismiss();
                  this.presentToast();           

              });

}
getBlog(){
  this.http.get('https://riwayatedilli.com/site/wp-json/wp/v2/posts?categories='+this.blogid).subscribe(data => {
               this.blogs=data;
               // console.log(data);
              },error=>{
                  this.loadingdismiss();
                  this.presentToast();           

              });
}
increaseFontSize(){
  this.font_quoteclass=this.font_quoteclass+10;
  this.font_archclass=this.font_archclass+10;
  this.font_narraclass=this.font_narraclass+10;
  this.font_referclas=this.font_referclas+10;

}
decreaseFontSize(){
  if(this.font_quoteclass>20 && this.font_archclass>17 && this.font_narraclass>17 && this.font_referclas>17)
  {
    this.font_quoteclass=this.font_quoteclass-10;
    this.font_archclass=this.font_archclass-10;
    this.font_narraclass=this.font_narraclass-10;
    this.font_referclas=this.font_referclas-10;
  }

}
// setMyStyles(){
//   let styles = {
//     'font_size': 17 + 'px',
//   };
//   return styles;
// }
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
  this.loadingdismiss();
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
