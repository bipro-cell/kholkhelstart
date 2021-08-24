import { Component, OnInit } from '@angular/core';
import { ModalController,ToastController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { HttpClient,HttpHeaders,HttpRequest} from '@angular/common/http';
@Component({
  selector: 'app-quizmodal',
  templateUrl: './quizmodal.page.html',
  styleUrls: ['./quizmodal.page.scss'],
})
export class QuizmodalPage implements OnInit {
  question:any;
  answer:any;
  option:{};
  answer_status=false;
  opt_length:any;
  quiz_progress_status=1;
  one_word_answer="";
  postid:any;
  image:any;
  name="Aman";
  email="agsureka@gmail.com";

  //quiz_progress_status checks the current state of the quiz 1:Answer Not Given 2:Answer Given 3:Result Computed 4:Close Quiz 
  constructor(public viewCtrl: ModalController,navParams: NavParams,public http:HttpClient,public toastCtrl:ToastController) { 
    this.question=navParams.get('Que');
    this.answer=navParams.get('ans');
    this.option=navParams.get('opt');
    this.postid=navParams.get('postID');
    this.image=navParams.get('image');
    // alert("image is  :: "+this.image);
    // alert("quetion is  :: "+this.question);
    this.opt_length=Object.keys(this.option).length;
    // alert(this.question);
    // alert(this.answer);
    // alert(this.option["a"]);

  }

  ngOnInit() {
  }
  
  dismiss() {
    let data={'result':this.answer_status};
    this.viewCtrl.dismiss(data);
    }
  
    async answergiven(value)
    {
      // alert("answer given :: " + value);
      this.quiz_progress_status=3;
      let keys=Object.keys(this.option);
        if(this.opt_length>0 && this.answer==this.option[value])
        {
          this.answer_status=true;
        }
        else if(this.opt_length==0 && value=='z' && this.answer==this.one_word_answer)
        {
          this.answer_status=true;
        }
        else
        {
          this.answer_status=false;
        }
        alert("the answer is :: " + this.answer_status );
        // await this.delay(5000);
        this.quiz_progress_status=4;

    }
    delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
  }
  comment(){
    let formdata=new FormData();
    formdata.append('post',this.postid);
    formdata.append('author_name',this.name);
    formdata.append('author_email',this.email);
    formdata.append('content',this.one_word_answer);
  
    this.http.post('http://riwayatedilli.com/site/wp-json/wp/v2/comments',formdata).subscribe(data=>{
        console.log(data);
        this.presentToast('Comment Successfully Added');
        this.answergiven('z');  

    },error=>{
      this.presentToast('Internet Error');
      console.log("Error");
    });
    
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
          // this.readyToShare();
    });
    toast.present();
  }

}
