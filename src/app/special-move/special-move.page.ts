import { Component, OnInit, Input} from '@angular/core';
import { HttpClient,HttpHeaders,HttpRequest} from '@angular/common/http';
import { ModalController,ToastController } from '@ionic/angular';
// import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-special-move',
  templateUrl: './special-move.page.html',
  styleUrls: ['./special-move.page.scss'],
})
export class SpecialMovePage implements OnInit {

  title:any;
  content:any;
  resposne:any={};
  @Input() special_id;

  constructor(private http: HttpClient,public viewCtrl: ModalController) {


    this.getContent(18);

    console.log(this.special_id);

  }

  ngOnInit() {
  
  }


  getContent(cell_id:any)
  {

    this.http.get("https://riwayatedilli.com/site/wp-json/wp/v2/fetch/postbytitle/"+cell_id).subscribe(data=>{

    this.resposne=data;
    this.content=(this.resposne.content).replace("<p>",'');
    this.content=(this.content).replace("</p>",'');
    this.title=this.resposne.title;

    
  });

  }




}
