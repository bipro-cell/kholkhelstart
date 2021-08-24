import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders,HttpRequest} from '@angular/common/http';
import { ModalController,ToastController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
@Component({
  selector: 'app-specialmovemodal',
  templateUrl: './specialmovemodal.page.html',
  styleUrls: ['./specialmovemodal.page.scss'],
})
export class SpecialmovemodalPage implements OnInit {

  constructor(navparams:NavParams ,private http: HttpClient,public viewCtrl: ModalController) { }

  ngOnInit() {
  }

}
