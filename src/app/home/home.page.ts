import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NavController,NavParams,ModalController} from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs/Observable';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import{ModalPage} from '../modal/modal.page';
import { Platform } from '@ionic/angular';
import {ContactPage} from '../contact/contact.page';
import * as Hammer from 'hammerjs'
import * as $ from "jquery";
import {QuizmodalPage} from "../quizmodal/quizmodal.page";
declare let Phaser;


let game;
let player = {
  image: null,
  position: 0,
  targetPosition:0,
  wallet:100,
  // position: 68,
  movementTween: null,
  global_direction:0
};




// Aman's Global Variables - For Generic Game Algo
let bDicePause = false;
let gameconfig,positionConfig,questionConfig;
let iDisplacement = 0;
let iSnakeLadderBase = 0;
let iOld_state = 0;
let iCurrent_state = 0;
let iReverseTo = 0;
let iRoll;
let iOld_ReverseTo = 0;
let bank_coins=0;
let style_bank_score ={};

// let global_direction=1;

//Jit's variables
let dice, result, board, playerSprite, initHeight, positions, diceSound, ladderSound, snakeSound,start,scope,posts,bank_image,bank_transfer;
let plots = [];
let scrollStep = 0.05;
let sixRepeat = 0; // Make 0 on reset the game
let retreatPos = 0; // Make 0 on reset the game
let diceRolled = 0; // Make 0 on reset the game
let isShownToast = 0; // Make 0 on reset the game
let special_move_index=0;

// localStorage.clear();
let arr = {};
let statResultRolled = 0;

let statDiceRoll = [];
let statResult = [];
let statPosition = [];
let gotSnakeOrLadder = false;

// let toastShownFor = [67, 69, 70, 71];
let endToastShown = false;
let isToastDisplay = false;
let toastMSG;
let text;
let stageTxt;
let chakraTxt;
let style = {
  font: "24px Arial",
  wordWrap: true,
  align: "center",
  wordWrapWidth: 200
};
let confJson, posConfig;
let bLadderSnakeFacePressed = false;
let boot;
let mainState;
let game_start=false;
let that;
let simulator=[1,3,5];
let Dice:any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
@Injectable({
  providedIn: 'root'
})
export class HomePage {

  image:any=''
  postContent: string;
  postid: number;
  static post_id;
  static postname;
  static postdesc;
  static blogID;
  static lat;
  static long;
  static cell_wallet;
  static cellno;
  static myModal:any;
  static to_array:any=[];
  public classReference = HomePage;
  static modal:any;
  static callfn(){};
  static bank_of_self_discovery=0;
  static bankcoin=0;
  static wallet=100;
  static question="";
  static answer="";
  static option={};
  static question_status=false;
  static special_move_status=false;
  static quiz_image="";
  static temp_player_array:any=[];
  static temp_game_restart_exit=[0,0];

  subscribe:any;
  backsub:any;
  subscribeexit:any;
  pulldown:any;
  quizmodal:any;
  
  constructor(public navCtrl: NavController,public platform: Platform,private camera: Camera,private router: Router,public http: HttpClient,public events: Events,private modal:ModalController,private storage: Storage,public loadingCtrl:LoadingController){
    // console.log('Started');
    
    // alert(this.constructor.name);
    // this.subscribeexit=this.platform.backButton.subscribeWithPriority(666666,()=>{
    //   if(this.constructor.name=='HomePage')
    //   {
    //     navigator["app"].exitApp();
    //   }
    // });
    this.reloadContent();
    // this.http.get('https://riwayatedilli.com/site/wp-json/wp/v2/fetch/initialpost').subscribe(data => {
    // storage.set('postlist', data);
    // console.log(data);
    // },error=>{
      
    // });
    
    that=Object.create(this.constructor.prototype);
    game = new Phaser.Game(900, 900, Phaser.AUTO, 'game-canvas');
    game.state.add('boot', this.boot);
    game.state.add('main', this.mainState);
    game.state.start('boot');

    

   
    //this.callfn();

  }
  ngAfterViewInit(){
    
}
ngOnInit() {
  
}

  // async backbttsub()
  // {

  //   this.backsub=this.subscribe=this.platform.backButton.subscribeWithPriority(666666,()=>{
  //     if(this.constructor.name=="HomePage"){
  //       if(window.confirm("Do you want to exit?"))
  //       {
  //         navigator["app"].exitApp();
  //       }
  //     }
  //   });


  //   return await this.backbttsub().then(()=>console.log('subscribed')); 
  // }
  // async backbttunsub(){
  //   return await this.backsub.unsubscribe().then(()=>console.log('unsunscribed'));
  // }
  reloadContent(){
    this.http.get('https://riwayatedilli.com/site/wp-json/wp/v2/fetch/initialpost').subscribe(data => {
    this.storage.set('postlist', data);
    // console.log(data);
    this.pulldown=false;
    },error=>{
     this.pulldown=true;
      
    });
  }
  ngOnDestroy(){ 
  }

  doRefresh(event) {
    // console.log('Begin async operation');
    // this.loadingPresent();

    setTimeout(() => {
      this.reloadContent();
      // this.loadingdismiss();
      event.target.complete();
      
    }, 2000);
  }
  async loadingPresent() {
    return await this.loadingCtrl.create({
      message:"Please wait until data is loaded",
    }).then(a => {
      a.present().then(() => {
        
      });
    });
  }
    async loadingdismiss() {
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }


  async presentModal(isWalkThrough) {
    if(isWalkThrough){
      that.modal = await this.modal.create({
        component: ModalPage,
        componentProps: {
          'isWalkThrough':isWalkThrough,
          'blogID':HomePage.blogID
        },
        cssClass:'my-how-modal-css'
      });
    }
    else{
      that.modal = await this.modal.create({
        component: ModalPage,
        componentProps: {
          'header':HomePage.postname,
          'description': HomePage.postdesc,
          'post_id':"/post/"+HomePage.post_id+"/"+HomePage.blogID+"/"+1,
          'isWalkThrough':isWalkThrough,
          'blogID':HomePage.blogID,
          'lat':HomePage.lat,
          'long':HomePage.long
        },
        cssClass:'my-custom-modal-css'
      });
    }
  return await that.modal.present();
}
  

  boot = {

    preload() {
      game.load.image("board", "assets/game/board.jpg");
      game.load.image("player", "assets/game/token4.png");
      game.load.spritesheet("dice", "assets/game/dice.png", 100, 103, 9);
      game.load.audio('diceSound', 'assets/game/dice.mp3');
      game.load.audio('ladderSound', 'assets/game/ascend.mp3');
      game.load.audio('snakeSound', 'assets/game/descend.mp3');
      game.load.image('bank', 'assets/icon/bank_icon.png');
      game.load.image('bank_transfer', 'assets/game/cell_transparent_red.png');
      game.load.image('trans_dice', 'assets/game/transparent_dice.png');
      game.scale.maxWidth = 900;
      game.scale.maxHeight = 900;
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = false;
      game.scale.setShowAll();
      game.scale.refresh();

    },

    create() {
      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.stage.backgroundColor = "#FFC177";
      game.state.start("main");
      
    }
  };

  mainState = {
    preload(){
      gameconfig=[
        {
          "x": 45,
          "y": 45,
          "posX": 0,
          "posY": 62.5,
          "topX":18.5,
          "topY":18.5,
          "postID": 1795,
          "cellno": 1,
          "name": "Iron Pillar, Qutub Complex, Mehrauli",
          "desc": "Iron Pillar, Qutub Complex, Mehrauli - 1",
          "blogID":543,
          "lat":0,
          "long":0,
          "wallet":0,
          "info":{
          "movement": {
            "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
            "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
            "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 999,999],
            "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        },
        "give":[1],
        "to":[64],
        "auto_give":[1],
        "specialMoveTrigger":[0,0],
        // "questions":[],
        // "images":[],
        // "options":[{}],
        // "answers":[]
        
        "questions":['Name the cooking technique which literally means “to breathe in.” ',"	What is the name of this delicacy? ","In the streets of which chowk can this delicacy be found? ","This delicacy can be found in which months?","Pandit Gaya Prasad established a small shop at the mouth of Kinari bazaar in 1872. Soon the locality around came to be known by the item he was selling. Name the locality"],
        "images":['chandni_chowk_1.jpg',"chandni_chowk_2.jpg","chandni_chowk_3.jpg","chandni_chowk_4.jpg",""],
        "options":[{},{"a":"Faluda","b":"Daulat ki Chat","c":"Phirni","d":"Rasmalai"},{"a":"Chandni","b":"Hauz Qazi","c":"Chatta","d":"Rajiv"},{"a":"Summer months – April, May June","b":"Winter months- November, December, January","c":"Monsoons- July, August, September","d":"Spring-February,March"},{"a":"Paranthe wali Gali","b":"Khari Baoli","c":"Nai Sarak","d":"Dariba Kalan"}],
        "answers":["Dum Technique","Daulat ki Chat","Chandni","Winter months- November, December, January","Paranthe wali Gali"],
        "game_restart_exit":[0,0],
        "passing_direction":[0],
        "landing_direction":[1]
      },
        {
          "x": 45,
          "y": 165,
          "posX": 18.5,
          "posY": 113,
          "topX":0,
          "topY":0,
          "postID": 1808,
          "cellno": 2,
          "name": "Suraj kund",
          "desc": "Suraj kund - 2",
          "blogID":544,
          "lat":"28°29'01.9\"N",
          "long":"77°17'00.6\"E",
          "wallet":0,
          "info":{
          "movement": {
            "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
            "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
            "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 999, 999],
            "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        },
        "give":[0],
        "to":[0],
        "auto_give":[1],
        "specialMoveTrigger":[0,0],
        // "questions":[],
        // "images":[],
        // "options":[{}],
        // "answers":[]
        "questions":['Name the cooking technique which literally means “to breathe in.” ',"	What is the name of this delicacy? ","In the streets of which chowk can this delicacy be found? ","This delicacy can be found in which months?","Pandit Gaya Prasad established a small shop at the mouth of Kinari bazaar in 1872. Soon the locality around came to be known by the item he was selling. Name the locality"],
        "images":['chandni_chowk_1.jpg',"chandni_chowk_2.jpg","chandni_chowk_3.jpg","chandni_chowk_4.jpg",""],
        "options":[{},{"a":"Faluda","b":"Daulat ki Chat","c":"Phirni","d":"Rasmalai"},{"a":"Chandni","b":"Hauz Qazi","c":"Chatta","d":"Rajiv"},{"a":"Summer months – April, May June","b":"Winter months- November, December, January","c":"Monsoons- July, August, September","d":"Spring-February,March"},{"a":"Paranthe wali Gali","b":"Khari Baoli","c":"Nai Sarak","d":"Dariba Kalan"}],
        "answers":["Dum Technique","Daulat ki Chat","Chandni","Winter months- November, December, January","Paranthe wali Gali"],
        "game_restart_exit":[0,0],
        "passing_direction":[0],
        "landing_direction":[1]
        
      } ,
        {
          "x": 45,
          "y": 265,
          "posX": 0,
          "posY": 200,
          "topX":18.5,
          "topY":207.5,
          "postID": 1805,
          "cellno": 3,
          "name": "Lal kot",
          "desc": "Lal kot - 3",
          "blogID":545,
          "lat":"28°48'53.4\"N",
          "long":"77°09'05.8\"E",
          "wallet":100,
          "info":{
          "movement": {
            "displacement": [0, 0, 0, 46, 46, 46, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
            "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
            "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 999, 999],
            "specialMove": [0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        },
        "give":[1],
        "to":[64],
        "auto_give":[1],
        "specialMoveTrigger":[0,0],
        // "questions":[],
        // "images":[],
        // "options":[{}],
        // "answers":[]
        "questions":['Name the cooking technique which literally means “to breathe in.” ',"	What is the name of this delicacy? ","In the streets of which chowk can this delicacy be found? ","This delicacy can be found in which months?","Pandit Gaya Prasad established a small shop at the mouth of Kinari bazaar in 1872. Soon the locality around came to be known by the item he was selling. Name the locality"],
        "images":['chandni_chowk_1.jpg',"chandni_chowk_2.jpg","chandni_chowk_3.jpg","chandni_chowk_4.jpg",""],
        "options":[{},{"a":"Faluda","b":"Daulat ki Chat","c":"Phirni","d":"Rasmalai"},{"a":"Chandni","b":"Hauz Qazi","c":"Chatta","d":"Rajiv"},{"a":"Summer months – April, May June","b":"Winter months- November, December, January","c":"Monsoons- July, August, September","d":"Spring-February,March"},{"a":"Paranthe wali Gali","b":"Khari Baoli","c":"Nai Sarak","d":"Dariba Kalan"}],
        "answers":["Dum Technique","Daulat ki Chat","Chandni","Winter months- November, December, January","Paranthe wali Gali"],
        "game_restart_exit":[0,0],
        "passing_direction":[0],
        "landing_direction":[1]
        
        },
        {
          "x": 45,
          "y": 365,
          "posX": 0,
          "posY": 300,
          "topX":18.5,
          "topY":308,
          "postID": 1803,
          "cellno": 4,
          "name": "Agrasan ki bauli",
          "desc": "Agrasan ki bauli - 4",
          "blogID":546,
          "lat":"28°37'34.3\"N",
          "long":"77°13'30.3\"E",
          "wallet":0,
          "info":{
            "movementRule": {
              "displacement": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 999],
              "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
              "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 999, 999],
              "specialMove": [0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            "movement": {
              "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
              "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
              "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 999, 999],
              "specialMove": [0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
        },
        "give":[2],
        "to":[9,17,25,30,47,48],
        "auto_give":[0],
        "specialMoveTrigger":[1,0],
        // "questions":[],
        // "images":[],
        // "options":[{}],
        // "answers":[]
        "questions":['Name the cooking technique which literally means “to breathe in.” ',"	What is the name of this delicacy? ","In the streets of which chowk can this delicacy be found? ","This delicacy can be found in which months?","Pandit Gaya Prasad established a small shop at the mouth of Kinari bazaar in 1872. Soon the locality around came to be known by the item he was selling. Name the locality"],
        "images":['chandni_chowk_1.jpg',"chandni_chowk_2.jpg","chandni_chowk_3.jpg","chandni_chowk_4.jpg",""],
        "options":[{},{"a":"Faluda","b":"Daulat ki Chat","c":"Phirni","d":"Rasmalai"},{"a":"Chandni","b":"Hauz Qazi","c":"Chatta","d":"Rajiv"},{"a":"Summer months – April, May June","b":"Winter months- November, December, January","c":"Monsoons- July, August, September","d":"Spring-February,March"},{"a":"Paranthe wali Gali","b":"Khari Baoli","c":"Nai Sarak","d":"Dariba Kalan"}],
        "answers":["Dum Technique","Daulat ki Chat","Chandni","Winter months- November, December, January","Paranthe wali Gali"],
        "game_restart_exit":[0,0],
        "passing_direction":[0],
        "landing_direction":[1]
        },
        {
          "x": 45,
          "y": 465,
          "posX": 0,
          "posY": 400,
          "topX":18.5,
          "topY":396.5,
          "postID": 1810,
          "cellno": 5,
          "name": "Qila Rai Pithora",
          "desc": "Qila Rai Pithora - 5",
          "blogID":547,
          "lat":"28°42'32.0\"N",
          "long":"77°11'19.9\"E",
          "wallet":0,
          "info":{
          "movement": {
            "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
            "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
            "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 999, 999],
            "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        },
        "give":[1],
        "to":[64],
        "auto_give":[1],
        "specialMoveTrigger":[0,0],
        // "questions":[],
        // "images":[],
        // "options":[{}],
        // "answers":[]
        "questions":['Name the cooking technique which literally means “to breathe in.” ',"	What is the name of this delicacy? ","In the streets of which chowk can this delicacy be found? ","This delicacy can be found in which months?","Pandit Gaya Prasad established a small shop at the mouth of Kinari bazaar in 1872. Soon the locality around came to be known by the item he was selling. Name the locality"],
        "images":['chandni_chowk_1.jpg',"chandni_chowk_2.jpg","chandni_chowk_3.jpg","chandni_chowk_4.jpg",""],
        "options":[{},{"a":"Faluda","b":"Daulat ki Chat","c":"Phirni","d":"Rasmalai"},{"a":"Chandni","b":"Hauz Qazi","c":"Chatta","d":"Rajiv"},{"a":"Summer months – April, May June","b":"Winter months- November, December, January","c":"Monsoons- July, August, September","d":"Spring-February,March"},{"a":"Paranthe wali Gali","b":"Khari Baoli","c":"Nai Sarak","d":"Dariba Kalan"}],
        "answers":["Dum Technique","Daulat ki Chat","Chandni","Winter months- November, December, January","Paranthe wali Gali"],
        "game_restart_exit":[0,0],
        "passing_direction":[0],
        "landing_direction":[1]
  
        },
        {
          "x": 45,
          "y": 565,
          "posX": 0,
          "posY": 500,
          "topX":18.5,
          "topY":491,
          "postID": 1812,
          "cellno": 6,
          "name": "Quwwat-ul-islam Mosque",
          "desc": "Quwwat-ul-islam Mosque - 6",
          "blogID":548,
          "lat":"28°39'38.5\"N",
          "long":"77°10'37.0\"E",
          "wallet":0,
          "info":{
          "movement": {
            "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 33, 33, 999],
            "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
            "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 999, 999],
            "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 0]
          }
        },
        "give":[5],
        "to":[64],
        "auto_give":[1],
        "specialMoveTrigger":[0,0],
        // "questions":[],
        // "images":[],
        // "options":[{}],
        // "answers":[]
        "questions":['Name the cooking technique which literally means “to breathe in.” ',"	What is the name of this delicacy? ","In the streets of which chowk can this delicacy be found? ","This delicacy can be found in which months?","Pandit Gaya Prasad established a small shop at the mouth of Kinari bazaar in 1872. Soon the locality around came to be known by the item he was selling. Name the locality"],
        "images":['chandni_chowk_1.jpg',"chandni_chowk_2.jpg","chandni_chowk_3.jpg","chandni_chowk_4.jpg",""],
        "options":[{},{"a":"Faluda","b":"Daulat ki Chat","c":"Phirni","d":"Rasmalai"},{"a":"Chandni","b":"Hauz Qazi","c":"Chatta","d":"Rajiv"},{"a":"Summer months – April, May June","b":"Winter months- November, December, January","c":"Monsoons- July, August, September","d":"Spring-February,March"},{"a":"Paranthe wali Gali","b":"Khari Baoli","c":"Nai Sarak","d":"Dariba Kalan"}],
        "answers":["Dum Technique","Daulat ki Chat","Chandni","Winter months- November, December, January","Paranthe wali Gali"],
        "game_restart_exit":[0,0],
        "passing_direction":[0],
        "landing_direction":[1]
        },
        {
          "x": 45,
          "y": 645,
          "posX": 0,
          "posY": 600,
          "topX":18.5,
          "topY":585.5,
          "postID": 1814,
          "cellno": 7,
          "name": "Qutub Minar",
          "desc": "Qutub Minar - 7",
          "blogID":549,
          "lat":"28°42'32.0\"N",
          "long":"77°09'55.7\"E",
          "wallet":0,
          "info":{
          "movement": {
            "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
            "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
            "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 999, 999],
            "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]


          }
        },
        "give":[1],
        "to":[64],
        "auto_give":[0],
        "specialMoveTrigger":[0,0],
      //   "questions":[],
      // "images":[],
      // "options":[],
      // "answers":[]
      "questions":['Name the cooking technique which literally means “to breathe in.” ',"	What is the name of this delicacy? ","In the streets of which chowk can this delicacy be found? ","This delicacy can be found in which months?","Pandit Gaya Prasad established a small shop at the mouth of Kinari bazaar in 1872. Soon the locality around came to be known by the item he was selling. Name the locality"],
      "images":['chandni_chowk_1.jpg',"chandni_chowk_2.jpg","chandni_chowk_3.jpg","chandni_chowk_4.jpg",""],
      "options":[{},{"a":"Faluda","b":"Daulat ki Chat","c":"Phirni","d":"Rasmalai"},{"a":"Chandni","b":"Hauz Qazi","c":"Chatta","d":"Rajiv"},{"a":"Summer months – April, May June","b":"Winter months- November, December, January","c":"Monsoons- July, August, September","d":"Spring-February,March"},{"a":"Paranthe wali Gali","b":"Khari Baoli","c":"Nai Sarak","d":"Dariba Kalan"}],
      "answers":["Dum Technique","Daulat ki Chat","Chandni","Winter months- November, December, January","Paranthe wali Gali"],
      "game_restart_exit":[0,0],
      "passing_direction":[0],
      "landing_direction":[1]
        },
      {
      "x": 45,
      "y": 745,
      "posX": 0,
      "posY": 700,
      "topX":0,
      "topY":0,
      "postID": 1816,
      "cellno": 8,
      "name": "Hauz-i-Shamsi",
      "desc": "Hauz-i-Shamsi - 8",
      "blogID":550,
      "lat":"28°41'57.3\"N",
      "long":"77°10'18.6\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 999, 999],
        "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    "give":[0],
    "to":[0],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
    "questions":[],
      "images":[],
      "options":[{}],
      "answers":[],
      "game_restart_exit":[0,0],
      "passing_direction":[0],
     "landing_direction":[1]
    },
    {
      "x": 135,
      "y": 745,
      "posX": 100,
      "posY": 710,
      "topX":113,
      "topY":680,
      "postID": 1818,
      "cellno": 9,
      "name": "Dargah of Qutubuddin Bakhtiyar Qaki",
      "desc": "Dargah of Qutubuddin Bakhtiyar Qaki - 9",
      "blogID":551,
      "lat":"28°37'54.4\"N",
      "long":"77°11'08.2\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 40, 40, 40, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 999, 999],
        "specialMove": [0, 0, 0, 0, 0, 0, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    "give":[9999],
    "to":[4,9,17,25,30,47,48],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
    "questions":[],
      "images":[],
      "options":[{}],
      "answers":[],
      "game_restart_exit":[0,0],
      "passing_direction":[0],
      "landing_direction":[1]
    },
    {
      "x": 235,
      "y": 745,
      "posX": 200,
      "posY": 700,
      "topX":0,
      "topY":0,
      "postID": 1820,
      "cellno": 10,
      "name": "Tomb of Iltutmish",
      "desc": "Tomb of Iltutmish - 10",
      "blogID":552,
      "lat":"28°39'38.5\"N",
      "long":"77°10'37.0\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 999, 999],
        "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[1],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[{}],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
     "landing_direction":[1]
  },
    {
      "x": 335,
      "y": 745,
      "posX": 300,
      "posY": 700,
      "topX":0,
      "topY":0,
      "postID": 1822,
      "cellno": 11,
      "name": "Balban’s Tomb",
      "desc": "Balban’s Tomb - 10",
      "blogID":553,
      "lat":"28°41'22.6\"N",
      "long":"77°13'51.0\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 999, 999],
        "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    "give":[1],
    "to":[64],
    "auto_give":[1],
    "specialMoveTrigger":[0,0],
    "questions":[],
      "images":[],
      "options":[{}],
      "answers":[],
      "game_restart_exit":[0,0],
      "passing_direction":[0],
      "landing_direction":[1]
    },
    {
      "x": 435,
      "y": 745,
      "posX": 400,
      "posY": 700,
      "topX":0,
      "topY":0,
      "postID": 1824,
      "cellno": 12,
      "name": "Siri",
      "desc": "Siri - 12",
      "blogID":554,
      "lat":"28°32'57.8\"N",
      "long":"77°12'59.1\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 3, 3, 0, 4, 4, 0, 5, 5, 0, 6, 999],
        "state": [0, 1, 2, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
        "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
        "specialMove": [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[{}],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
    "landing_direction":[1]
    },
    {
      "x": 520,
      "y": 745,
      "posX": 500,
      "posY": 700,
      "topX":0,
      "topY":0,
      "postID": 1826,
      "cellno": 13,
      "name": "Hauz Khas",
      "desc": "Hauz Khas - 13",
      "blogID":555,
      "lat":"28°32'50.6\"N",
      "long":"77°12'09.5\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 999, 999],
        "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    "give":[1],
    "to":[64],
    "auto_give":[1],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[{}],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
    "landing_direction":[1]
    },
    {
      "x": 620,
      "y": 745,
      "posX": 600,
      "posY": 700,
      "topX":0,
      "topY":0,
      "postID": 1828,
      "cellno": 14,
      "name": "Alai Darwaza",
      "desc": "Alai Darwaza - 14",
      "blogID":556,
      "lat":"28°31'45.0\"N",
      "long":"77°11'10.9\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 999, 999],
        "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
    "questions":[],
      "images":[],
      "options":[{}],
      "answers":[],
      "game_restart_exit":[0,0],
      "passing_direction":[0],
      "landing_direction":[1]
    },
    {
      "x": 720,
      "y": 745,
      "posX": 700,
      "posY": 700,
      "topX":0,
      "topY":0,
      "postID": 1830,
      "cellno": 15,
      "name": "Alauddin Khilji’s Tomb and Madrassa",
      "desc": "Alauddin Khilji’s Tomb and Madrassa - 15",
      "blogID":557,
      "lat":"28°31'47.0\"N",
      "long":"77°11'03.2\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 999, 999],
        "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    "give":[1],
    "to":[64],
    "auto_give":[1],
    "specialMoveTrigger":[0,0],
    "questions":[],
      "images":[],
      "options":[{}],
      "answers":[],
      "game_restart_exit":[0,0],
      "passing_direction":[0],
      "landing_direction":[1]
    },
    {
  
      "x": 715,
      "y": 645,
      "posX": 700,
      "posY": 600,
      "topX":0,
      "topY":0,
      "postID": 1832,
      "cellno": 16,
      "name": "Alai Minar",
      "desc": "Alai Minar - 16",
      "blogID":558,
      "lat":0,
      "long":0,
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [-9, -9, -9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
        "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
        "specialMove": [16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
    "questions":[],
      "images":[],
      "options":[{}],
      "answers":[],
      "game_restart_exit":[0,0],
      "passing_direction":[0],
      "landing_direction":[1]
    },
    {
      "x": 715,
      "y": 545,
      "posX": 700,
      "posY": 500,
      "topX":680,
      "topY":491,
      "postID": 1834,
      "cellno": 17,
      "name": "Hazrat Nizamuddin Auliya",
      "desc": "Hazrat Nizamuddin Auliya - 17",
      "blogID":559,
      "lat":"28°35'29.0\"N",
      "long":"77°14'30.7\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 8, 8, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 999, 999],
        "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 17, 17]
      }
    },
    "give":[9999],
    "to":[4,9,17,25,30,47,48],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
    "questions":[],
      "images":[],
      "options":[{}],
      "answers":[],
      "game_restart_exit":[0,0],
      "passing_direction":[0],
      "landing_direction":[1]
    },
    {
      "x": 715,
      "y": 445,
      "posX": 700,
      "posY": 400,
      "topX":0,
      "topY":0,
      "postID": 1836,
      "cellno": 18,
      "name": "Tughlaqabad",
      "desc": "Tughlaqabad - 18",
      "blogID":560,
      "lat":"28°47'07.9\"N",
      "long":"77°15'35.2\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 0, -1, -1, 0, -1, -1, 0, -1, -1, 0, -1, -1, 0, -1, -1, 0, -1, 999],
        "state": [0, 1, 2, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 2],
        "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
        "specialMove": [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
    "questions":[],
      "images":[],
      "options":[{}],
      "answers":[],
      "game_restart_exit":[0,0],
      "passing_direction":[0],
      "landing_direction":[1]
    },
    {
      "x": 715,
      "y": 345,
      "posX": 700,
      "posY": 300,
      "topX":0,
      "topY":0,
      "postID": 1839,
      "cellno": 19,
      "name": "Adilabad / Muhammadabad fort",
      "desc": "Adilabad / Muhammadabad fort - 19",
      "blogID":561,
      "lat":"28°40'11.7\"N",
      "long":"77°17'15.7\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 999, 999],
        "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    "give":[1],
    "to":[64],
    "auto_give":[1],
    "specialMoveTrigger":[0,0],
    "questions":[],
      "images":[],
      "options":[{}],
      "answers":[],
      "game_restart_exit":[0,0],
      "passing_direction":[0],
     "landing_direction":[1]
  
    },
    {
      "x": 715,
      "y": 245,
      "posX": 700,
      "posY": 200,
      "topX":0,
      "topY":0,
      "postID": 1841,
      "cellno": 20,
      "name": "Jahanpannah",
      "desc": "Jahanpannah - 20",
      "blogID":562,
      "lat":"28°32'47.5\"N",
      "long":"77°12'23.4\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19, 999, 999],
        "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
    "questions":[],
      "images":[],
      "options":[{}],
      "answers":[],
      "game_restart_exit":[0,0],
      "passing_direction":[0],
      "landing_direction":[1]
  },
    {
      "x": 715,
      "y": 145,
      "posX": 700,
      "posY": 100,
      "topX":0,
      "topY":0,
      "postID": 1849,
      "cellno": 21,
      "name": "Satpula",
      "desc": "Satpula - 21",
      "blogID":563,
      "lat":"28°43'05.2\"N",
      "long":"77°12'17.5\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 999, 999],
        "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0]
      }
    },
    "give":[1],
    "to":[64],
    "auto_give":[1],
    "specialMoveTrigger":[0,0],
    "questions":[],
      "images":[],
      "options":[{}],
      "answers":[],
      "game_restart_exit":[0,0],
      "passing_direction":[0],
      "landing_direction":[1]
    },
    {
      "x": 715,
      "y": 60,
      "posX": 700,
      "posY": 0,
      "topX":0,
      "topY":0,
      "postID": 1851,
      "cellno": 22,
      "name": "Ferozabad and Kotla Feroz Shah",
      "desc": "Ferozabad and Kotla Feroz Shah - 20",
      "blogID":564,
      "lat":"28°38'06.5\"N",
      "long":"77°14'33.6\"E",
      "wallet":0,
      "info":{
        "movementRule": {
          "displacement": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 999],
          "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
          "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 999, 999],
          "specialMove": [0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        "movement": {
          "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
          "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
          "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 999, 999],
          "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0]
        }
      },
      "give":[2],
      "to":[64],
      "auto_give":[0],
      "specialMoveTrigger":[1,0],
      "questions":['The team Delhi Daredevils began its IPL career in 2008 under the ownership of GMR. But before official announcement of the name of IPL’s Delhi franchise, a SMS poll was conducted. The name ‘Delhi Daredevils’ secured 67 percent of the total votes and won the poll. What was the other name that was suggested in the polls?'],
      "images":[''],
      "options":[{"a":"Delhi Dynamites","b":"Delhi Defenders","c":"Delhi Mughals","d":"Delhi Capitals"}],
      "answers":["Delhi Mughals"],
      "game_restart_exit":[0,0],
      "passing_direction":[0],
      "landing_direction":[1]

    },
    {
      "x": 625,
      "y": 60,
      "posX": 628,
      "posY": 0,
      "topX":0,
      "topY":0,
      "postID": 1853,
      "cellno": 23,
      "name": "Asokan Pillar (Delhi-Topra)",
      "desc": "Asokan Pillar (Delhi-Topra) - 23",
      "blogID":565,
      "lat":"30°07'33.9\"N",
      "long":"77°09'42.9\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 999, 999],
        "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0]
      }
    },
    "give":[1],
    "to":[64],
    "auto_give":[1],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
    "landing_direction":[1]
    },
    {
      "x": 530,
      "y": 60,
      "posX": 510,
      "posY": 0,
      "topX":0,
      "topY":0,
      "postID": 1855,
      "cellno": 24,
      "name": "Kushk-i-shikhar",
      "desc": "Kushk-i-shikhar - 24",
      "blogID":566,
      "lat":0,
      "long":0,
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 999, 999],
        "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0]
      }
    },
    "give":[0],
    "to":[0],
    "auto_give":[1],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
    "landing_direction":[1]
    },
    {
      "x": 448,
      "y": 60,
      "posX": 428,
      "posY": 0,
      "topX":396.5,
      "topY":18.5,
      "postID": 1857,
      "cellno": 25,
      "name": "Chiragh-e-Roshan Dehlvi",
      "desc": "Dargah of Nasiruddin Chiragh-e-Roshan Dehlvi - 25",
      "blogID":567,
      "lat":"28°32'35.1\"N",
      "long":"77°13'32.9\"E",
      "wallet":0,
      "info":{
        "movement":{
          "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 18, 18, 18, 6, 6, 999],
          "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
          "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 999, 999],
          "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 25, 25, 0, 0,0]
        }
      },
      "give":[9999],
    "to":[4,9,17,25,30,47,48],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
    "landing_direction":[1]
    },
    {
      "x": 330,
      "y": 60,
      "posX": 310,
      "posY": 0,
      "topX":0,
      "topY":0,
      "postID": 1859,
      "cellno": 26,
      "name": "Khirki Mosque",
      "desc": "Khirki Mosque - 26",
      "blogID":568,
      "lat":"28°32'06.9\"N",
      "long":"77°13'09.8\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 999, 999],
        "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
    "landing_direction":[1]
    },
    {
      "x": 230,
      "y": 60,
      "posX": 210,
      "posY": 0,
      "topX":0,
      "topY":0,
      "postID": 1861,
      "cellno": 27,
      "name": "Lodhi Garden",
      "desc": "Lodhi Garden - 27",
      "blogID":569,
      "lat":"28°35'25.6\"N",
      "long":"77°13'14.3\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, -2, -2, -2, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 26, 999, 999],
        "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 27, 27, 0, 0, 0, 0, 0, 0]
      }
    },
    "give":[1],
    "to":[64],
    "auto_give":[1],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
    "landing_direction":[1]
    },
    {
      "x": 130,
      "y": 50,
      "posX": 110,
      "posY": 0,
      "postID": 1864,
      "cellno": 28,
      "name": "Jahaz Mahal",
      "desc": "Jahaz Mahal - 28",
      "blogID":570,
      "lat":"28°31'09.4\"N",
      "long":"77°10'45.3\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 21, 21, 21, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 999, 999],
        "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 28, 28, 0, 0, 0, 0, 0, 0, 0, 0,0]
      }
    },
    "give":[0],
    "to":[0],
    "auto_give":[1],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
    "landing_direction":[1]
    },
    {
      "x": 135,
      "y": 145,
      "posX": 128,
      "posY": 100,
      "topX":0,
      "topY":0,
      "postID": 1866,
      "cellno": 29,
      "name": "Moth ki masjid",
      "desc": "Moth ki masjid - 29",
      "blogID":571,
      "lat":0,
      "long":0,
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 999, 999],
        "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    "give":[1],
    "to":[64],
    "auto_give":[1],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
    "landing_direction":[1]
    },
    {
      "x": 135,
      "y": 245,
      "posX": 110,
      "posY": 200,
      "topX":113,
      "topY":207.5,
      "postID": 1868,
      "cellno": 30,
      "name": "Jamali Kamali Mosque and Tomb",
      "desc": "Jamali Kamali Mosque and Tomb - 30",
      "blogID":572,
      "lat":"28°31'29.4\"N",
      "long":"77°11'13.7\"E",
      "wallet":0,
      "info":{
        "movementRule": {
          "displacement": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 999],
          "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
          "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 999, 999],
          "specialMove": [0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        "movement": {
          "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
          "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
          "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 29, 999, 999],
          "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
  
      },
      "give":[2],
    "to":[4,9,17,25,30,47,48],
    "auto_give":[0],
    "specialMoveTrigger":[1,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
    "landing_direction":[1]
    },
    {
      "x": 135,
      "y": 345,
      "posX": 128,
      "posY": 300,
      "topX":0,
      "topY":0,
      "postID": 1870,
      "cellno": 31,
      "name": "Din-Pannah",
      "desc": "Din-Pannah - 31",
      "blogID":573,
      "lat":"28°36'42.9\"N",
      "long":"77°14'29.9\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 999, 999],
        "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    "give":[1],
    "to":[64],
    "auto_give":[1],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
    "landing_direction":[1]
    },
    {
      "x": 135,
      "y": 445,
      "posX": 110,
      "posY": 400,
      "topX":0,
      "topY":0,
      "postID": 1872,
      "cellno": 32,
      "name": "Purana Qila",
      "desc": "Sher Shahbad, Purana Qila - 32",
      "blogID":574,
      "lat":"28°36'34.5\"N",
      "long":"77°14'37.4\"E",
      "info":{
        "movement": {
          "displacement": [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 999],
          "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
          "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 29, 999, 999],
          "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
    },
    "give":[0],
    "to":[0],
    "auto_give":[1],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[1,1],
    "passing_direction":[0],
    "landing_direction":[1]
    },
    {
      "x": 135,
      "y": 545,
      "posX": 128,
      "posY": 500,
      "topX":0,
      "topY":0,
      "postID": 1843,
      "cellno": 33,
      "name": "Humayun’s Tomb",
      "desc": "Humayun’s Tomb - 33",
      "blogID":575,
      "lat":"28°35'36.3\"N",
      "long":"77°15'02.5\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 999, 999],
        "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    "give":[1],
    "to":[64],
    "auto_give":[1],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
    "landing_direction":[1]
    },
    {
      "x": 135,
      "y": 645,
      "posX": 110,
      "posY": 600,
      "topX":0,
      "topY":0,
      "postID": 1845,
      "cellno": 34,
      "name": "Abdul Rahim Khan-i-Khanan",
      "desc": "Abdul Rahim Khan-i-Khanan - 34",
      "blogID":576,
      "lat":"28°35'17.5\"N",
      "long":"77°14'52.7\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 33, 999, 999],
        "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        
      },
    },
    "give":[0],
    "to":[0],
    "auto_give":[1],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
    "landing_direction":[1]
    },
    {
      "x": 235,
      "y": 645,
      "posX": 210,
      "posY": 600,
      "topX":0,
      "topY":0,
      "postID": 1876,
      "cellno": 35,
      "name": "Shahjahanabad",
      "desc": "Shahjahanabad - 35",
      "blogID":577,
      "lat":0,
      "long":0,
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 34, 999, 999],
        "specialMove":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    "give":[1],
    "to":[64],
    "auto_give":[1],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
    "landing_direction":[1]
    },
    {
      "x": 335,
      "y": 645,
      "posX": 310,
      "posY": 600,
      "topX":0,
      "topY":0,
      "postID": 1878,
      "cellno": 36,
      "name": "Qila Mubarak",
      "desc": "Qila Mubarak - 36",
      "blogID":578,
      "lat":0,
      "long":0,
      "wallet":0,
      "info":{
        "movementRule": {
          "displacement": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 999],
          "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
          "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 999, 999],
          "specialMove": [0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
      "movement": {
        "displacement": [0, 0, 0, 999, 1, 1, 999, 2, 2, 999, 3, 3, 999, 4, 4, 999, 5, 5, 999, 6,999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 35, 999, 999],
        "specialMove":[0, 0, 0, 0, 0, 36, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[0],
    "specialMoveTrigger":[1,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
     "landing_direction":[1]
    },
    {
      "x": 435,
      "y": 645,
      "posX": 428,
      "posY": 600,
      "topX":0,
      "topY":0,
      "postID": 1874,
      "cellno": 37,
      "name": "Manjile-e-nigambodh",
      "desc": "Manjile-e-nigambodh - 37",
      "blogID":579,
      "lat":0,
      "long":0,
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 23, 23, 23, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 36, 999, 999],
        "specialMove":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 37, 37, 0, 0, 0]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
    "landing_direction":[1]
    },
    {
      "x": 535,
      "y": 645,
      "posX": 510,
      "posY": 600,
      "topX":0,
      "topY":0,
      "postID": 1880,
      "cellno": 38,
      "name": "Chandini Chowk",
      "desc": "Chandini Chowk - 38",
      "blogID":580,
      "lat":"28°39'03.1\"N",
      "long":"77°13'48.9\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 999, 999],
        "specialMove":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
    "questions":['Name the cooking technique which literally means “to breathe in.” ',"	What is the name of this delicacy? ","In the streets of which chowk can this delicacy be found? ","This delicacy can be found in which months?","Pandit Gaya Prasad established a small shop at the mouth of Kinari bazaar in 1872. Soon the locality around came to be known by the item he was selling. Name the locality"],
     "images":['chandni_chowk_1.jpg',"chandni_chowk_2.jpg","chandni_chowk_3.jpg","chandni_chowk_4.jpg",""],
     "options":[{},{"a":"Faluda","b":"Daulat ki Chat","c":"Phirni","d":"Rasmalai"},{"a":"Chandni","b":"Hauz Qazi","c":"Chatta","d":"Rajiv"},{"a":"Summer months – April, May June","b":"Winter months- November, December, January","c":"Monsoons- July, August, September","d":"Spring-February,March"},{"a":"Paranthe wali Gali","b":"Khari Baoli","c":"Nai Sarak","d":"Dariba Kalan"}],
     "answers":["Dum Technique","Daulat ki Chat","Chandni","Winter months- November, December, January","Paranthe wali Gali"],
     "game_restart_exit":[0,0],
     "passing_direction":[0],
     "landing_direction":[1]
    },
    {
      "x": 615,
      "y": 645,
      "posX": 628,
      "posY": 600,
      "topX":0,
      "topY":0,
      "postID": 1882,
      "cellno": 39,
      "name": "Masjid-e-jahan-numa",
      "desc": "Masjid-e-jahan-numa - 39",
      "blogID":581,
      "lat":0,
      "long":0,
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 38, 999, 999],
        "specialMove":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
     "landing_direction":[1]
    },
    {
      "x": 615,
      "y": 545,
      "posX": 610,
      "posY": 500,
      "topX":0,
      "topY":0,
      "postID": 1884,
      "cellno": 40,
      "name": "Fatehpuri Masjid",
      "desc": "Fatehpuri Masjid - 40",
      "blogID":582,
      "lat":"28°39'24.7\"N",
      "long":"77°13'21.4\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 39, 999, 999],
        "specialMove":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
    "landing_direction":[1]
    
    },
    {
      "x": 615,
      "y": 445,
      "posX": 628,
      "posY": 400,
      "topX":0,
      "topY":0,
      "postID": 1886,
      "cellno": 41,
      "name": "Kashmiri Gate",
      "desc": "Kashmiri Gate - 41",
      "blogID":583,
      "lat":"28°40'02.4\"N",
      "long":"77°13'44.1\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 13, 13, 13, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 999, 999],
        "specialMove":[0, 0, 0, 0, 0, 0, 0, 0, 0, 41, 41, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
    "questions":[],
     "images":[],
     "options":[{}],
     "answers":[],
     "game_restart_exit":[0,0],
     "passing_direction":[0],
     "landing_direction":[1]
    },
    {
      "x": 615,
      "y": 345,
      "posX": 610,
      "posY": 300,
      "topX":0,
      "topY":0,
      "postID": 1888,
      "cellno": 42,
      "name": "Shalimar Bagh",
      "desc": "Shalimar Bagh - 42",
      "blogID":584,
      "lat":0,
      "long":0,
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 41, 999, 999],
        "specialMove":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
    "landing_direction":[1]
    },
    {
      "x": 615,
      "y": 245,
      "posX": 628,
      "posY": 200,
      "topX":0,
      "topY":0,
      "postID": 1890,
      "cellno": 43,
      "name": "Jantar Mantar",
      "desc": "Jantar Mantar - 43",
      "blogID":585,
      "lat":"28°37'37.8\"N",
      "long":"77°13'00.2\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 42, 999, 999],
        "specialMove":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
    "questions":['It was at X that Anna Hazare commenced his hunger strike on 5th April 2011. Identify X.'],
     "images":["jantar_mantar_1.jpg"],
     "options":[{"a": "Connaught Place","b":"Qutub Complex","c":"Red Fort (Lal Qila)","d":"Jantar Mantar"},],
     "answers":["Jantar Mantar"],
     "game_restart_exit":[0,0],
     "passing_direction":[0],
     "landing_direction":[1]
    },
    {
      "x": 615,
      "y": 145,
      "posX": 610,
      "posY": 100,
      "topX":0,
      "topY":0,
      "postID": 1892,
      "cellno": 44,
      "name": "Sunehri Masjid",
      "desc": "Sunehri Masjid- 44",
      "blogID":586,
      "lat":"28°39'21.8\"N",
      "long":"77°13'54.7\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 43, 999, 999],
        "specialMove":[0, 0, 0, 0, 0, 0, 44, 44, 44, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[1],
    "specialMoveTrigger":[1,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[1,1],
    "passing_direction":[0],
    "landing_direction":[1]
    },
    {
      "x": 515,
      "y": 145,
      "posX": 510,
      "posY": 100,
      "topX":0,
      "topY":0,
      "postID": 1892,
      "cellno": 45,
      "name": "Safdarjung’s Tomb",
      "desc": "Safdarjung’s Tomb - 45",
      "blogID":587,
      "lat":"28°35'22.2\"N",
      "long":"77°12'37.9\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, -11, -11, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 44, 999, 999],
        "specialMove":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 45, 45, 0]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
    "landing_direction":[1]
    },
    {
      "x": 415,
      "y": 145,
      "posX": 430,
      "posY": 100,
      "topX":0,
      "topY":0,
      "postID": 1847,
      "cellno": 46,
      "name": "Kalkaji Temple",
      "desc": "Kalkaji Temple - 46",
      "blogID":588,
      "lat":"28°43'39.9\"N",
      "long":"77°18'34.8\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 45, 999, 999],
        "specialMove":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
    "landing_direction":[1]
    },
    {
      "x": 335,
      "y": 145,
      "posX": 310,
      "posY": 100,
      "topX":302,
      "topY":113,
      "postID": 1897,
      "cellno": 47,
      "name": "Gurudwara Bangla Sahib",
      "desc": "Gurudwara Bangla Sahib - 47",
      "blogID":589,
      "lat":"28°37'34.7\"N",
      "long":"77°12'33.9\"E",
      "wallet":0,
      "info":{
        "movementRule": {
          "displacement": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 999],
          "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
          "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 999, 999],
          "specialMove": [0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 46, 999, 999],
        "specialMove":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    "give":[9999],
    "to":[4,9,17,25,30,47,48],
    "auto_give":[0],
    "specialMoveTrigger":[1,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
    "landing_direction":[1]
    },
    {
      "x": 235,
      "y": 145,
      "posX": 210,
      "posY": 100,
      "topX":207.5,
      "topY":113,
      "postID": 1899,
      "cellno": 48,
      "name": "Gurudwara Sis Ganj Sahib",
      "desc": "Gurudwara Sis Ganj Sahib - 48",
      "blogID":590,
      "lat":"28°39'21.6\"N",
      "long":"77°13'57.2\"E",
      "wallet":0,
      "info":{
        "movementRule": {
          "displacement": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 999],
          "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
          "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 999, 999],
          "specialMove": [0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 47, 999, 999],
        "specialMove":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    "give":[9999],
    "to":[4,9,17,25,30,47,48],
    "auto_give":[0],
    "specialMoveTrigger":[1,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
     "landing_direction":[1]
    },
    {
      "x": 235,
      "y": 245,
      "posX": 210,
      "posY": 200,
      "topX":0,
      "topY":0,
      "postID": 1901,
      "cellno": 49,
      "name": "Phoolwalon ki Sair/ Sair-e- Gulfaroshan",
      "desc": "Phoolwalon ki Sair/ Sair-e- Gulfaroshan - 49",
      "blogID":591,
      "lat":"28°31'09.3\"N",
      "long":"77°10'46.0\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 999, 999],
        "specialMove":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
     "landing_direction":[1]
    },
    {
      "x": 235,
      "y": 345,
      "posX": 210,
      "posY": 300,
      "topX":0,
      "topY":0,
      "postID": 1903,
      "cellno": 50,
      "name": "Ghalib ki Haveli",
      "desc": "Ghalib ki Haveli - 50",
      "blogID":592,
      "lat":"28°39'15.7\"N",
      "long":"77°13'32.2\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, -6, -6, -6, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49, 999, 999],
        "specialMove":[0, 0, 0, 0, 0, 0, 50, 50, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
     "questions":['1.	“Tujhse milna puraani Dilli mein,Chhod aaye nishaani Diili mein,Ballimaran se Daribe talak,Teri-meri kahaani Dilli mein”'],
     "images":['garib_ki_haveli_1.jpg'],
     "options":[{"a": "Ghalib Ki Haveli","b":"Jama Masjid (Masjid-e-jahan-numa","c":"Red Fort (Qila-e-Mubarak)","d":"Fatehpuri Masjid"},],
     "answers":[],
     "game_restart_exit":[0,0],
     "passing_direction":[0],
     "landing_direction":[1]
    },
    {
      "x": 235,
      "y": 445,
      "posX": 210,
      "posY": 400,
      "topX":0,
      "topY":0,
      "postID": 1905,
      "cellno": 51,
      "name": "Metcalfe’s House",
      "desc": "Metcalfe’s House - 51",
      "blogID":593,
      "lat":"28°31′21″N",
      "long":"77°11′13″E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 999, 999],
        "specialMove":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
     "landing_direction":[1]
    },
    {
      "x": 235,
      "y": 545,
      "posX": 210,
      "posY": 500,
      "topX":0,
      "topY":0,
      "postID": 1907,
      "cellno": 52,
      "name": "Dilkhusha",
      "desc": "Dilkhusha - 52",
      "blogID":594,
      "lat":"28°41'57.3\"N",
      "long":"77°13'44.1\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 51, 999, 999],
        "specialMove":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
     "landing_direction":[1]
    },
    {
      "x": 335,
      "y": 545,
      "posX": 310,
      "posY": 500,
      "topX":0,
      "topY":0,
      "postID": 1909,
      "cellno": 53,
      "name": "Zafar Mahal",
      "desc": "Zafar Mahal - 53",
      "blogID":595,
      "lat":"28°53'30.5\"N",
      "long":"77°18'21.0\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, -20, -20, -20, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 52, 999, 999],
        "specialMove":[0, 0, 0, 0, 0, 0, 0, 0, 0, 53, 53, 53, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
     "landing_direction":[1]
    },
    {
      "x": 435,
      "y": 545,
      "posX": 430,
      "posY": 500,
      "topX":0,
      "topY":0,
      "postID": 1911,
      "cellno": 54,
      "name": "Ajitgarh",
      "desc": "Ajitgarh - 54",
      "blogID":596,
      "lat":"28°40'17.7\"N",
      "long":"28°40'17.7\"N",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 53, 999, 999]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
     "landing_direction":[1]
    },
    {
      "x": 535,
      "y": 545,
      "posX": 510,
      "posY": 500,
      "topX":0,
      "topY":0,
      "postID": 1913,
      "cellno": 55,
      "name": "Maiden’s Hotel, Civil Lines",
      "desc": "Maiden’s Hotel, Civil Lines - 55",
      "blogID":597,
      "lat":"28°40'28.1\"N",
      "long":"77°13'34.3\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 54, 999, 999]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
     "landing_direction":[1]
    },
    {
      "x": 515,
      "y": 445,
      "posX": 510,
      "posY": 400,
      "topX":0,
      "topY":0,
      "postID": 1915,
      "cellno": 56,
      "name": "Lutyen’s Delhi",
      "desc": "Lutyen’s Delhi - 56",
      "blogID":598,
      "lat":0,
      "long":0,
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 55, 999, 999]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
     "landing_direction":[1]
    },
    {
      "x": 515,
      "y": 345,
      "posX": 510,
      "posY": 300,
      "topX":0,
      "topY":0,
      "postID": 1917,
      "cellno": 57,
      "name": "Rashtrapati Bhawan",
      "desc": "Rashtrapati Bhawan - 57",
      "blogID":599,
      "lat":0,
      "long":0,
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 56, 999, 999]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
     "landing_direction":[1]
    },
    {
      "x": 515,
      "y": 235,
      "posX": 510,
      "posY": 200,
      "topX":0,
      "topY":0,
      "postID": 1919,
      "cellno": 58,
      "name": "Parlament House",
      "desc": "Parlament House - 58",
      "blogID":600,
      "lat":0,
      "long":0,
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, -55, -55, -55, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 57, 999, 999]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
    "landing_direction":[1]
    },
    {
      "x": 415,
      "y": 245,
      "posX": 428,
      "posY": 200,
      "topX":0,
      "topY":0,
      "postID": 1930,
      "cellno": 59,
      "name": "India Gate",
      "desc": "India Gate - 59",
      "blogID":601,
      "lat":0,
      "long":0,
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 58, 999, 999]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
    "landing_direction":[1]
    },
    {
      "x": 315,
      "y": 245,
      "posX": 310,
      "posY": 200,
      "topX":0,
      "topY":0,
      "postID": 1919,
      "cellno": 60,
      "name": "University of Delhi",
      "desc": "University of Delhi - 60",
      "blogID":602,
      "lat":"28°41'16.1\"N",
      "long":"77°12'37.8\"E",
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, -6, -6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 59, 999, 999]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[0],
    "questions":['Which 2006 movie is a story revolving around Delhi University students?','In the movie “Rang De Basanti”, which place in reality has been shown as the ‘Delhi University Campus’?'],
     "images":['','university_of_delhi_2.jpg'],
     "options":[{"a":"Rang De Basanti","b":"Dilli-6","c":"Delly Belly","d":"3 idiots"},{"a":"Jawaharlal Nehru University ","b":"India Habitat Centre","c":"IIT Delhi","d":"Delhi Technological University"}],
     "answers":["Rang De Basanti","India Habitat Centre"],
     "game_restart_exit":[0,0],
     "passing_direction":[0],
     "landing_direction":[1]
    },
    {
      "x": 315,
      "y": 345,
      "posX": 310,
      "posY": 300,
      "topX":0,
      "topY":0,
      "postID": 1921,
      "cellno": 61,
      "name": "Connaught Place",
      "desc": "Connaught Place - 61",
      "blogID":603,
      "lat":0,
      "long":0,
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, -39, -39, -39, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 999, 999]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
    "landing_direction":[1]
    },
    {
      "x": 315,
      "y": 445,
      "posX": 310,
      "posY": 400,
      "topX":0,
      "topY":0,
      "postID": 1932,
      "cellno": 62,
      "name": "Lajpat Nagar",
      "desc": "Lajpat Nagar - 62",
      "blogID":604,
      "lat":0,
      "long":0,
      "wallet":0,
      "info":{
       "movementRule": {
          "displacement": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 999],
          "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
          "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 999, 999],
          "specialMove": [0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
       "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 61, 999, 999]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[0],
    "specialMoveTrigger":[1,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[0,0],
    "passing_direction":[0],
    "landing_direction":[1]
    },
    {
      "x": 415,
      "y": 445,
      "posX": 428,
      "posY": 400,
      "topX":0,
      "topY":0,
      "postID": 1934,
      "cellno": 63,
      "name": "Rajghat",
      "desc": "Rajghat - 63",
      "blogID":605,
      "lat":0,
      "long":0,
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 62, 999, 999]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
    "questions":['Tees January Road commemorates the martyrdom of whom?',"In which house in Delhi did M.K. Gandhi spent his last 144 days?"],
     "images":["rajghat_1.jpg","rajghat_2.jpg"],
     "options":[{"a":"Jawaharlal Nehru","b":"M.K. Gandhi","c":"Maulana Azad","d":"Lal Bahadur Shastri"},{"a":"Birla House","b":"Teen Murti Bhawan","c":"Rashtrapati Bhawan","d":"Sansad Bhavan"}],
     "answers":["M.K. Gandhi","Birla House"],
     "game_restart_exit":[0,0],
     "passing_direction":[0],
     "landing_direction":[1]
    },
    {
      "x": 415,
      "y": 345,
      "posX": 430,
      "posY": 300,
      "topX":396.5,
      "topY":302,
      "postID": 1936,
      "cellno": 64,
      "name": "Self Discovery",
      "desc": "Self Discovery - 64",
      "blogID":606,
      "lat":0,
      "long":0,
      "wallet":0,
      "info":{
      "movement": {
        "displacement": [0, 0, 0, -63, -63, -63, -62, -62, -62, -61, -61, -61, -60, -60, -60, -59, -59, -59, -58, -58, 999],
        "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
        "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 63, 999, 999]
      }
    },
    "give":[2],
    "to":[64],
    "auto_give":[0],
    "specialMoveTrigger":[0,0],
    "questions":[],
    "images":[],
    "options":[],
    "answers":[],
    "game_restart_exit":[1,1],
    "passing_direction":[-1],
    "landing_direction":[0]
    }
    ];
    positionConfig={
      "initCellPos": 0,
      "initPlayerPos": 0,
      "initTargetPos": 0,
      "shortTitle": "BY",
      "retreatCellResult": 6,
      "retreatCellOnCount": 3,
      "initialMoveResult": 6,
      "firstLandingCell": 0,
      "cellDimentionX": 85,
      "cellDimentionY": 85,
      
    };


    // questionConfig=[{},];

    // questionConfig=[
    //   {
    //     question_index:0,
    //     questions:'“Tujhse milna puraani Dilli mein,Chhod aaye nishaani Diili mein,Ballimaran se Daribe talak,Teri-meri kahaani Dilli mein” What is located in Ballimaran which you can find on the game board as well?,Chhod aaye nishaani Diili mein,Ballimaran se Daribe talak,Teri-meri kahaani Dilli mein”',
    //     options:[{"a": "Ghalib Ki Haveli","b":"Jama Masjid (Masjid-e-jahan-numa","c":"Red Fort (Qila-e-Mubarak)","d":"Fatehpuri Masjid"}],
    //     answers:["Ghalib Ki Haveli"]
        

    //   },
    //   {
    //     question_index:1,
    //     questions:'Name the cooking technique which literally means “to breathe in.”',
    //     options:[{}],
    //     answers:["Dum Technique"]

    //   },
    //   {
    //     question_index:2,
    //     questions:'What is the name of this delicacy?',
    //     options:[{"a":"Faluda","b":"Daulat ki Chat","c":"Phirni","d":"Rasmalai"}],
    //     answers:["Daulat ki Chat"]

    //   },
    //   {
    //     question_index:3,
    //     questions:'In the streets of which chowk can this delicacy be found?',
    //     options:[{"a":"Chandni","b":"Hauz Qazi","c":"Chatta","d":"Rajiv"}],
    //     answers:["Chandni"]

    //   },
    //   {
    //     question_index:4,
    //     questions:'This delicacy can be found in which months?',
    //     options:[{"a":"Summer months – April, May June","b":"Winter months- November, December, January","c":"Monsoons- July, August, September","d":"Spring-February,March"}],
    //     answers:["Winter months- November, December, January"]

    //   },
    //   {
    //     question_index:5,
    //     questions:'Tees January Road commemorates the martyrdom of whom?',
    //     options:[{"a":"Jawaharlal Nehru","b":"M.K. Gandhi","c":"Maulana Azad","d":"Lal Bahadur Shastri"}],
    //     answers:["M.K. Gandhi"]

    //   },
    //   {
    //     question_index:6,
    //     questions:'In which house in Delhi did M.K. Gandhi spent his last 144 days?',
    //     options:[{"a":"Birla House","b":"Teen Murti Bhawan","c":"Rashtrapati Bhawan","d":"Sansad Bhavan"}],
    //     answers:["Birla House"]

    //   },
    //   {
    //     question_index:7,
    //     questions:'Which 2006 movie is a story revolving around Delhi University students?',
    //     options:[{"a":"Rang De Basanti","b":"Dilli-6","c":"Delly Belly","d":"3 idiots"}],
    //     answers:["Rang De Basanti"]

    //   },
    //   {
    //     question_index:8,
    //     questions:'In the movie “Rang De Basanti”, which place in reality has been shown as the ‘Delhi University Campus’?',
    //     options:[{"a":"Jawaharlal Nehru University ","b":"India Habitat Centre","c":"IIT Delhi","d":"Delhi Technological University"}],
    //     answers:["India Habitat Centre"]

    //   },
    //   {
    //     question_index:9,
    //     questions:'“Tujhse milna puraani Dilli mein,Chhod aaye nishaani Diili mein,Ballimaran se Daribe talak,Teri-meri kahaani Dilli mein” What is located in Ballimaran which you can find on the game board as well?,Chhod aaye nishaani Diili mein,Ballimaran se Daribe talak,Teri-meri kahaani Dilli mein”',
    //     options:[{"a": "Ghalib Ki Haveli","b":"Jama Masjid (Masjid-e-jahan-numa","c":"Red Fort (Qila-e-Mubarak)","d":"Fatehpuri Masjid"}],
    //     answers:["Ghalib Ki Haveli"]

    //   },
    //   {
    //     question_index:10,
    //     questions:'“Tujhse milna puraani Dilli mein,Chhod aaye nishaani Diili mein,Ballimaran se Daribe talak,Teri-meri kahaani Dilli mein” What is located in Ballimaran which you can find on the game board as well?,Chhod aaye nishaani Diili mein,Ballimaran se Daribe talak,Teri-meri kahaani Dilli mein”',
    //     options:[{"a": "Ghalib Ki Haveli","b":"Jama Masjid (Masjid-e-jahan-numa","c":"Red Fort (Qila-e-Mubarak)","d":"Fatehpuri Masjid"}],
    //     answers:["Ghalib Ki Haveli"]

    //   },
    //   {
    //     question_index:11,
    //     questions:'“Tujhse milna puraani Dilli mein,Chhod aaye nishaani Diili mein,Ballimaran se Daribe talak,Teri-meri kahaani Dilli mein” What is located in Ballimaran which you can find on the game board as well?,Chhod aaye nishaani Diili mein,Ballimaran se Daribe talak,Teri-meri kahaani Dilli mein”',
    //     options:[{"a": "Ghalib Ki Haveli","b":"Jama Masjid (Masjid-e-jahan-numa","c":"Red Fort (Qila-e-Mubarak)","d":"Fatehpuri Masjid"}],
    //     answers:["Ghalib Ki Haveli"]

    //   },
    //   {
    //     question_index:12,
    //     questions:'“Tujhse milna puraani Dilli mein,Chhod aaye nishaani Diili mein,Ballimaran se Daribe talak,Teri-meri kahaani Dilli mein” What is located in Ballimaran which you can find on the game board as well?,Chhod aaye nishaani Diili mein,Ballimaran se Daribe talak,Teri-meri kahaani Dilli mein”',
    //     options:[{"a": "Ghalib Ki Haveli","b":"Jama Masjid (Masjid-e-jahan-numa","c":"Red Fort (Qila-e-Mubarak)","d":"Fatehpuri Masjid"}],
    //     answers:["Ghalib Ki Haveli"]

    //   },
    //   {
    //     question_index:12,
    //     questions:'“Tujhse milna puraani Dilli mein,Chhod aaye nishaani Diili mein,Ballimaran se Daribe talak,Teri-meri kahaani Dilli mein” What is located in Ballimaran which you can find on the game board as well?,Chhod aaye nishaani Diili mein,Ballimaran se Daribe talak,Teri-meri kahaani Dilli mein”',
    //     options:[{"a": "Ghalib Ki Haveli","b":"Jama Masjid (Masjid-e-jahan-numa","c":"Red Fort (Qila-e-Mubarak)","d":"Fatehpuri Masjid"}],
    //     answers:["Ghalib Ki Haveli"]

    //   },
    //   {
    //     question_index:13,
    //     questions:'“Tujhse milna puraani Dilli mein,Chhod aaye nishaani Diili mein,Ballimaran se Daribe talak,Teri-meri kahaani Dilli mein” What is located in Ballimaran which you can find on the game board as well?,Chhod aaye nishaani Diili mein,Ballimaran se Daribe talak,Teri-meri kahaani Dilli mein”',
    //     options:[{"a": "Ghalib Ki Haveli","b":"Jama Masjid (Masjid-e-jahan-numa","c":"Red Fort (Qila-e-Mubarak)","d":"Fatehpuri Masjid"}],
    //     answers:["Ghalib Ki Haveli"]

    //   },
    //   // {
    //   //   question_index:0,

    //   // },
    //   // {
    //   //   question_index:0,

    //   // },
    //   // {
    //   //   question_index:0,

    //   // },
    //   // {
    //   //   question_index:0,

    //   // },
    //   // {
    //   //   question_index:0,

    //   // },
    //   // {
    //   //   question_index:0,

    //   // },
    //   // {
    //   //   question_index:0,

    //   // },
    //   // {
    //   //   question_index:0,

    //   // },
    //   // {
    //   //   question_index:0,

    //   // },
     
    
    // ];
  
    
      /*game.load.json('gameconfig', 'assets/game/gameconfig.json');*/
    },

      create() {

    
     /* confJson = game.cache.json.get('gameconfig');*/
      positions = gameconfig;
      posConfig = positionConfig;



      Dice = function (x, y) {
        Phaser.Sprite.call(this, game, x, y, 'dice');
        
        this.tween;
        this.anim;
        // this.blurX = game.add.filter("BlurX");  // Blur filters taken from
        // this.blurY = game.add.filter("BlurY");  // Filters -> blur example
    
        this.anchor.setTo(0.5, 0.5);
    
        var i;
        var frames = [];
        for (i=0; i < 15; i++) {
            frames[i] = game.rnd.pick([0,1,2,3,4,5,6]);
        }
    
        // the animation displays the frames from the spritesheet in a random order
        this.anim = this.animations.add("roll", frames);
        this.anim.onComplete.add(this.rollComplete, this); 
    
        this.frame = 1;
    
        game.add.existing(this);
    };
    
    Dice.prototype = Object.create(Phaser.Sprite.prototype);
    Dice.prototype.constructor = Dice;
    
    Dice.prototype.roll = function() {
        // this.filters = [this.blurX, this.blurY];
        this.animations.play("roll", 20);
    };
    
    Dice.prototype.rollComplete = function() {
        this.filters = null;
        this.frame = game.rnd.pick([0,1,2,3,4,5,6]);
        // alert("Value of the Frame :"+ this.frame);
         result=this.frame+1;
        

    };
    
    Dice.prototype.update = function() {
        if (this.anim.isPlaying) {
            this.angle = game.rnd.angle();
        }
    };
    
    Dice.prototype.isAnimationRunning = function () {
        return this.anim.isPlaying;
    };
    
    
    Dice.prototype.value = function() {
        switch(this.frame) {
        case 0:
            return 0;
        case 1:
            return 1;
        case 2:
            return 2;
        case 3:
            return 3;
        case 4:
            return 4;
        case 5:
            return 5;
        case 6:
            return 6;
        default:
            return null;
        }
    };
       //positions = confJson.cellConfig;
      //posConfig = confJson.positionConfig;
       //console.log(positions);
      board = game.add.sprite(0, 0, "board");
      // playerSprite = game.add.sprite(0, 0);
      // board.addChild(playerSprite);
      playerSprite = game.add.sprite(0,0, "player");
      board.addChild(playerSprite);
      // game.physics.arcade.enable(player);
      player.image = playerSprite;
      dice = game.add.button(350, 795, "trans_dice", this.rollDiceNew, this);
      bank_image = game.add.button(630,805,"bank",this.transferCowries,this);
      bank_image.scale.set(0.2,0.2);
      bank_image.visible=false;

      bank_image = game.add.button(630,805,"bank",this.transferCowries,this);
      bank_image.scale.set(0.2,0.2);
      bank_image.visible=false;

      // bank_transfer=game.add.image(680,680,"bank_transfer");
      // bank_transfer.scale.set(0.55,0.56);
      // bank_transfer.visible=true;
      var style = { font: "50px Arial", fill: "#ffff", wordWrap: true, wordWrapWidth: bank_image.width, align: "center", backgroundColor: "#ffff00" };
      text = game.add.text(800,885,"0", style);
      text.anchor.set(1);
      dice.frame = 6;


      this.diceGroup = this.game.add.group();
      this.dice = [];
      this.text = this.game.add.text(this.world.centerX,10, "Total: ");
      this.text.fill = "#d3d3d3";
  
    //  for (var i=0; i < 2; i++) {
        var d = new Dice(399, 845);
        this.diceGroup.add(d);
      //  }
  
      // roll the dice when a mouse button is clicked
      this.game.input.onDown.add(this.rollDiceNew,this);

      // this.retriveGameState();
      this.retrieveCellInfo(player.position);

      diceSound = game.add.audio('diceSound');
      ladderSound = game.add.audio('ladderSound');
      snakeSound = game.add.audio('snakeSound');

      // board.inputEnabled = true;
      // board.input.enableDrag();
      // board.events.onDragUpdate.add(this.dragUpdate, this);
      // board.enableBody = true;      
      initHeight = board.height;
      this.addTapAreas();
      this.enablePinchToZoom();
      // game.sound.setDecodedCallback([diceSound, ladderSound, snakeSound], start, this);
     
    
      },

      update(){
        
        if ((player.targetPosition != player.position && (player.movementTween == null || !player.movementTween.isRunning))){
          console.log("Target "+player.targetPosition);
          if (player.targetPosition > player.position && bLadderSnakeFacePressed == false) {
            if(positions[player.position].passing_direction[0]==0)
            {
              
              player.position+=(player.global_direction);
            }
            else if(positions[player.position].passing_direction[0]<0)
            {
              player.global_direction=positions[player.position].passing_direction[0];
              player.targetPosition =player.position-(player.targetPosition-player.position);
              player.position+=(player.global_direction);
            }
              this.movePlayer();
          } else {
            // Got Snake
            console.log("Here");
            player.position = player.targetPosition;
            // alert(player.targetPosition);
            this.movePlayer();
            bDicePause = false;
          }
          // console.log("Target Position -- "+player.targetPosition);
          // console.log("Player Position -- "+player.position);
        }

        if (player.targetPosition == player.position && (player.movementTween == null || !player.movementTween.isRunning)) {
          console.log("Old State "+iOld_state);
          if (dice.frame < 6) {
            if(iSnakeLadderBase < 0) {
              bDicePause = true;
              dice.frame = 7;
              this.retrieveCellInfo(player.position);
            } else if(iSnakeLadderBase > 0) {
              bDicePause = true;
              dice.frame = 8;
              this.retrieveCellInfo(player.position);
            } else {
              bDicePause = false;
              if (player.position == posConfig.initPlayerPos) {
                game.time.events.add(400, function() {
                  dice.frame = 6;
                });
              } else {
                game.time.events.add(400, function() {
                  this.frame = 6;
                });
              }
              this.retrieveCellInfo(player.position);

            }
            this.saveGameState();
            // console.log("Reverse "+ iReverseTo);
          } else if (dice.frame == 7 && bLadderSnakeFacePressed == true) {
            bLadderSnakeFacePressed = false;
            iSnakeLadderBase = 0;
            bDicePause = false;
            this.frame = 6;
            this.retrieveCellInfo(player.position);
            this.saveGameState();
            // console.log("It's a Snake");
          } else if (dice.frame == 8 && bLadderSnakeFacePressed == true) {
            bLadderSnakeFacePressed = false;
            iSnakeLadderBase = 0;
            bDicePause = false;
            this.frame = 6;
            this.retrieveCellInfo(player.position);
            this.saveGameState();
            // console.log("It's a Ladder");
          }

          if(positions[player.position].landing_direction[0]==1)
            {
               player.global_direction=1;
            }
          else if(positions[player.position].landing_direction[0]==0)
            {
               player.global_direction=0;
            }
            

        }

      },
      
      rollDiceNew() {
        // this.text.setText("Total: ");
            this.diceGroup.callAll("roll", null);
        var timer = this.game.time.events.add(100, this.rollDiceCompleteNew, this);
      },
      rollDiceCompleteNew() {
        var rollComplete = true;
        this.diceGroup.forEach(function(item) {
          if(item.isAnimationRunning())
            rollComplete = false;
        }, this);
        if(rollComplete) {
          var total = 0;
          this.diceGroup.forEach(function(item) { total += item.value(); });
          // this.text.setText("Total: "+total);
          // alert("Total Value :: "+total);
          this.initiatePawnMovement();
        } else {
          var timer = this.game.time.events.add(100, this.rollDiceCompleteNew, this);
        }
      },

      rollDice(){

        diceSound.play();
        diceRolled++;
        board.scale.set(1);
        board.position.set(0);
        if (dice.frame == 6) {
           result = game.rnd.integerInRange(1, 6);
          //  if(positions[player.position].cellno!=27 && positions[player.position].cellno!=36 && positions[player.position].cellno!=41 )
          //  {
          //   result = 4;
          //  }
          //  else if(positions[player.position].cellno==27)
          //   {
          //     result=1;
          //   }
          // else if(positions[player.position].cellno==41)
          //   {
          //     result=2;
          //   }
          // if(positions[player.position].cellno==2)
          // {
          //   result=2;
          // }
          //  result=1;
          if(diceRolled==1)
          {
            result=simulator[0];
          }
          else if(diceRolled==2)
          {
            result=simulator[1];
          }
          else
          {
            result=simulator[2];
          }
         
          if(result==1 && game_start==false)
          {
            this.movePlayer();
            
            // player.targetPosition=0;
          }
          dice.frame = result - 1;
          // this.initiatePawnMovement();
        } else if (dice.frame > 6) {
          bLadderSnakeFacePressed = true;
          // this.initiatePawnMovement();
        }

        // console.log("Current Target Position - " + player.targetPosition + " - Current Position " + player.position);
        if(game_start==true)
        {
          this.initiatePawnMovement();
        }
        if(result==1 && game_start==false)
        {
          game_start=true;
        }

        // else if (dice.frame == 7) {
        //   isLadder = 2;
        // } else if (dice.frame == 8) {
        //   isLadder = 1;
        // }


      },
      initiatePawnMovement(){
        
        // alert(positions[24].info.movement.displacement[1]);


        

        // alert("The length of the Array is "+positions[player.position].to.length);

        // alert("Current special_move_index :: "+ special_move_index);
        // alert("Current Special mve value :: " + positions[player.position].specialMoveTrigger[special_move_index]);

        if (bDicePause == false) {
          // iRoll = dice.frame + 1;
          // iRoll = 6;
          iRoll = result;
          // console.log("iRoll Set - "+iRoll);
          iOld_state = iCurrent_state;
          // console.log("** Old State is  :: "+iOld_state );
          // console.log("** Dice Roll place"+(iRoll * 3) );
          // console.log("** Is special move :: "+positions[player.position].info.movement.specialMove[(iRoll * 3)]);
          // console.log("** Is cell number :: "+positions[player.position].cellno);
          // console.log("** State of Six Throw Set "+ iOld_state);

          if(positions[player.position].specialMoveTrigger[special_move_index]==1)
          {
            iCurrent_state = positions[player.position].info.movementRule.state[(iRoll * 3) + iOld_state];
          }
          else
          {
            iCurrent_state = positions[player.position].info.movement.state[(iRoll * 3) + iOld_state];

          }
          
          // console.log("** Current State -- "+iCurrent_state);
          if (iCurrent_state == 999) {
            iCurrent_state = iOld_state;
          }
          if(positions[player.position].specialMoveTrigger[special_move_index]==1)
          {
            iDisplacement = positions[player.position].info.movementRule.displacement[iOld_state];
          }
          else
          {
            iDisplacement = positions[player.position].info.movement.displacement[iOld_state];
          }
          // console.log("** Calculated Zero Displacement is "+iDisplacement+ "For a Roll of "+iRoll);
          if (iDisplacement == 0) {
            if(positions[player.position].specialMoveTrigger[special_move_index]==1){
                  iDisplacement = positions[player.position].info.movementRule.displacement[(iRoll * 3) + iOld_state];
            }
            else
            {
              iDisplacement = positions[player.position].info.movement.displacement[(iRoll * 3) + iOld_state];
            }
            // console.log("** Re-calculating Displacement is "+iDisplacement+ "For a Roll of "+iRoll);
          }
          // console.log ("** Player.Position - " + player.position + " iDisplacement - " + iDisplacement);
          // console.log ("** Return Cell " + iReverseTo)
          if (iDisplacement < 999) {
            // console.log("** Player Position :: "+player.position);
            // console.log("** Current State :: "+iCurrent_state);
            // console.log("** Displacement :: "+iDisplacement);
            // console.log("** Displacement Second  :: "+positions[player.position+iDisplacement].info.movement.displacement[iCurrent_state]);
            if(positions[player.position].specialMoveTrigger[special_move_index]==1)
            {
              iSnakeLadderBase = positions[player.position+iDisplacement].info.movementRule.displacement[iCurrent_state];
            
            }
            else
            {
              iSnakeLadderBase = positions[player.position+iDisplacement].info.movement.displacement[iCurrent_state];

            }
            
          }
          // console.log("** Calculated Displacement is "+iDisplacement+ " -- For a Roll of "+iRoll);
          if ((iDisplacement != 0) && (iDisplacement < 999) && (bDicePause == false)) {
            console.log("** Ready to set Target Position")
            iOld_ReverseTo = iReverseTo;
            if(positions[player.position].specialMoveTrigger[special_move_index]==0)
            {
              iReverseTo = positions[player.position].info.movement.return[(iRoll * 3) + iOld_state];
            }
            else
            {
              iReverseTo = positions[player.position].info.movementRule.return[(iRoll * 3) + iOld_state];
            }
              if (iReverseTo == 999) {
              iReverseTo = iOld_ReverseTo;
            }
            console.log("** Reverse "+iReverseTo);
            player.targetPosition = player.position + iDisplacement;
          } else if (iDisplacement == 999) {
            player.targetPosition = iReverseTo;
          }
          else if(iDisplacement==111)
          {
            
          }
          // console.log("** Going to the target - " + player.targetPosition + " - Current Position " + player.position);
        } else {
          // console.log("** Dice Status -- "+bDicePause);
          // player.targetPosition = player.position + iDisplacement;
          player.targetPosition = player.position + iSnakeLadderBase;
          // console.log("** GO TO -- "+player.targetPosition);
          // console.log("** SNAKE LADDER BASE -- "+iSnakeLadderBase);
          // bDicePause = false;
          // dice.frame = 6;
        }
        if(positions[player.position].specialMoveTrigger[special_move_index]==0)
        {
          // alert("The value is :>> Working");
          // let i=0;
          special_move_index=0
          HomePage.temp_player_array=[];
          bank_image.visible=false;
          text.visible=false;
          

          
        }
      //   if(player.position==player.targetPosition && positions[player.position].specialMoveTrigger[special_move_index]==1 )
      //   {
      //     HomePage.temp_player_array=[];
      //     player_Array.forEach(element => {

      //     //  alert("Player Position is  :: "+ element.position);
      //       if(positions[player.targetPosition].to.includes(element.position))
      //       {
      //         HomePage.temp_player_array.push(element);
          
      //       }

            
          
      //      });
      // }
      // alert("Special Movie Trigger :: "+positions[player.position].specialMoveTrigger[special_move_index]);
      if(positions[player.targetPosition].specialMoveTrigger[special_move_index]==1)
      {
        let i=0;
        // alert("Array of Images :: "+JSON.stringify(positions[player.position]));
        positions[player.targetPosition].to.forEach(element => {
         this["bank_transfer_"+i]=game.add.image(positions[element-1].topX,positions[element-1].topY,"bank_transfer");
         this["bank_transfer_"+i].scale.set(0.55,0.56);
         this["bank_transfer_"+i].visible=true;
         i++;
        });
      }
      alert("Value in wallet  :: "+positions[player.targetPosition].wallet);
        that.callfn(positions[player.targetPosition].postID,positions[player.targetPosition].name,positions[player.targetPosition].desc,positions[player.targetPosition].blogID,positions[player.targetPosition].lat,positions[player.targetPosition].long,positions[player.targetPosition].wallet);
        // this.walletTrans(player.targetPosition);
        HomePage.temp_game_restart_exit=positions[player.targetPosition].game_restart_exit;
        this.specialMoveTrans(positions[player.position].info.movement.specialMove[(iRoll * 3) + iOld_state]);
        this.quizTrans(player.targetPosition);

      
        // if(player.targetPosition!=player.targetPosition)
        // {
        //   alert("To target position :: "+positions[player.position].to.length);
        // }

        



        // console.log("** Dice Frame " + dice.frame);
      },
      movePlayer() {
        if (player.movementTween != null) {
          player.movementTween.stop(); //remove the last tween from the manager, will be garbage collected
        }
        player.movementTween = game.add.tween(player.image).to({
          x: positions[player.position].x,
          y: positions[player.position].y
        }, 600, Phaser.Easing.Linear.None, true);

        game.add.tween(player.image.anchor).to({
          y: 0.5
        }, 200, Phaser.Easing.Linear.None, true, 0, 0, true);
      },
      climbLadder() {
        statDiceRoll.push(diceRolled);
        statResult.push(statResultRolled);
        statPosition.push(player.position);

        if (positions[player.position].snakeLadder != 0) {
          // window.setTimeout(function(){},3000);
          if (positions[player.position].snakeLadder > player.position) {
            ladderSound.play();
          } else {
            snakeSound.play();
          }
          player.targetPosition = positions[player.position].snakeLadder;
          player.position = positions[player.position].snakeLadder;
          statResultRolled = 0;
          gotSnakeOrLadder = true;
          this.movePlayer();
          return true;
        }
        return false;
      },
      saveGameState() {
        // localStorage.set(posConfig.shortTitle+"playerPosition", player.position);
        console.log("bDicePause -- "+bDicePause);
        console.log("iDisplacement -- "+iDisplacement);
        console.log("iSnakeLadderBase -- "+iSnakeLadderBase);
        console.log("iOld_state -- "+iOld_state);
        console.log("iCurrent_state -- "+iCurrent_state);
        console.log("iReverseTo -- "+iReverseTo);
        console.log("iOld_ReverseTo -- "+iOld_ReverseTo);
        console.log("bLadderSnakeFacePressed -- "+bLadderSnakeFacePressed);
        var gameSaveObj = {
          "bDicePause" : bDicePause,
          "iDisplacement" : iDisplacement,
          "iSnakeLadderBase" : iSnakeLadderBase,
          "iOld_state" : iOld_state,
          "iCurrent_state" : iCurrent_state,
          "iReverseTo" : iReverseTo,
          "iOld_ReverseTo" : iOld_ReverseTo,
          "bLadderSnakeFacePressed" : bLadderSnakeFacePressed
        }
        // localStorage.setObject(posConfig.shortTitle+"gameSaveObj",gameSaveObj);
        // localStorage.set("sixRepeat", sixRepeat);
        // localStorage.set("retreatPos", retreatPos);
        // localStorage.set("diceRolled", diceRolled);
      },

      retriveGameState() {
        var pos = parseInt(localStorage.get(posConfig.shortTitle+"playerPosition", 0));
        if (pos !== 0) {
          player.image.x = positions[pos].x;
          player.image.y = positions[pos].y;
          player.position = pos;
          player.targetPosition = pos;

          stageTxt = game.add.text(50, 830, "Stage - " + positions[pos].stage, style);
          chakraTxt = game.add.text(580, 830, "Chakra - " + positions[pos].chakra, style);
        } else {
          // Starting position
          player.image.x = positions[posConfig.initCellPos].x;
          player.image.y = positions[posConfig.initCellPos].y;
          player.position = posConfig.initPlayerPos;
          player.targetPosition = posConfig.initTargetPos;
          // console.log(posConfig.initCellPos);
          stageTxt = game.add.text(50, 830, "Stage - " + positions[posConfig.initCellPos].stage, style);
          chakraTxt = game.add.text(580, 830, "Chakra - " + positions[posConfig.initCellPos].chakra, style);
        }
        // console.log(positions[pos].stage);
        player.image.anchor.x = 0.1;
        player.image.anchor.y = 0.1;
        player.image.pivot.x = 0.5;
        player.image.pivot.y = 0.5;
        sixRepeat = parseInt(localStorage.get("sixRepeat", 0));
        retreatPos = parseInt(localStorage.get("retreatPos", 0));
        diceRolled = parseInt(localStorage.get("diceRolled", 0));
        /* ############ Retrive Game Statistics ################ */
        var array = localStorage.getObject("gameStatObj");
        if (array.diceRolled) {
          statDiceRoll = array.diceRolled;
          statResult = array.result;
          statPosition = array.position;
        }
      },
      retrieveCellInfo(position) {
        // stageTxt.kill();
        // chakraTxt.kill();
        // scope.$parent.cell.name = positions[position].info.name;
        // scope.$parent.cell.quote = positions[position].info.quote[Math.floor(Math.random() * positions[position].info.quote.length)].name;
        // scope.$parent.cell.postID = positions[position].postID;
        // stageTxt = game.add.text(50, 830, "Stage - " + positions[position].stage, style);
        // chakraTxt = game.add.text(580, 830, "Chakra - " + positions[position].chakra, style);
        // scope.$apply();
      },

      walletTrans(trancposition) {
        // alert("Current Position of player :: "+ trancposition);
        // alert("Punishment :: "+positions[trancposition].give[0]);
        

        if(positions[trancposition].to[0]==64)
        {
           
          HomePage.bank_of_self_discovery=HomePage.bank_of_self_discovery+positions[trancposition].give[0];
          player.wallet=player.wallet-positions[trancposition].give[0];
          // alert("player wallet :: "+player.wallet);
          
          HomePage.wallet=player.wallet;

          // alert("Homepage wallet :: "+HomePage.wallet);
          // alert("Bank of self Discovery :: "+HomePage.bank_of_self_discovery);
          
        }
        

        // stageTxt.kill();
        // chakraTxt.kill();
        // scope.$parent.cell.name = positions[position].info.name;
        // scope.$parent.cell.quote = positions[position].info.quote[Math.floor(Math.random() * positions[position].info.quote.length)].name;
        // scope.$parent.cell.postID = positions[position].postID;
        // stageTxt = game.add.text(50, 830, "Stage - " + positions[position].stage, style);
        // chakraTxt = game.add.text(580, 830, "Chakra - " + positions[position].chakra, style);
        // scope.$apply();
      },
      quizTrans(trancposition) {
        // alert("Current Position of player :: "+ trancposition);
        // alert("Punishment :: "+positions[trancposition].give[0]);
        // alert("Question is length ::"+ positions[trancposition].questions.length);

        if(positions[trancposition].questions.length>0)
        {
          // alert("Question is length ::"+ positions[trancposition].questions.length);
          if(positions[trancposition].questions.length==1)
          {

            HomePage.question=positions[trancposition].questions[0];
            //  alert("Question ::"+positions[trancposition].questions[0]);
            
              HomePage.option=positions[trancposition].options[0];
              HomePage.answer=positions[trancposition].answers[0];
              HomePage.quiz_image=positions[trancposition].images[0];
              //  alert(HomePage.answer);
              HomePage.question_status=true;
          }
          else{
            // alert("Question ::"+positions[trancposition].questions[0]);
            //  alert("Answer ::" +positions[trancposition].answers[0]);
            //  alert("Answer ::" +positions[trancposition].images[0]);

            let random_number=game.rnd.integerInRange(0, positions[trancposition].questions.length);
            HomePage.question=positions[trancposition].questions[random_number];
            HomePage.option=positions[trancposition].options[random_number];
            HomePage.answer=positions[trancposition].answers[random_number];
            HomePage.option=positions[trancposition].options[random_number];
            HomePage.quiz_image=positions[trancposition].images[random_number];
            HomePage.question_status=true;

            // alert("Question ::"+HomePage.question);
            // alert("Answer ::" +HomePage.answer);
            // alert("image ::" +HomePage.quiz_image);
          }

          
        }
        else
        {
          HomePage.question_status=false;
        }
        

        // stageTxt.kill();
        // chakraTxt.kill();
        // scope.$parent.cell.name = positions[position].info.name;
        // scope.$parent.cell.quote = positions[position].info.quote[Math.floor(Math.random() * positions[position].info.quote.length)].name;
        // scope.$parent.cell.postID = positions[position].postID;
        // stageTxt = game.add.text(50, 830, "Stage - " + positions[position].stage, style);
        // chakraTxt = game.add.text(580, 830, "Chakra - " + positions[position].chakra, style);
        // scope.$apply();
      },

      specialMoveTrans(move)
      {
        
        
        if(move==0)
        {
          HomePage.special_move_status=false;
        }
        else
        {

          HomePage.special_move_status=true;
        }


      },


      
      
      

      enablePinchToZoom(){
        let myElement=document.getElementById('game-canvas');
       
        let hammertime=new Hammer(myElement);
        
        hammertime.get('pinch').set({
          enable : true,
          domEvents : true
        });

        hammertime.on('pinchstart', function(event) {
          
          if (event.scale > 1) {
          board.inputEnabled = false;
          }
        });
        hammertime.on('pinchout', function(event) {
          
          
          if(event.scale > 1){
            board.scale.set(event.scale);
            board.position.x=0;
            board.position.y = 0;
            
          }
          
// alert(board.position.y);
          // if(board.position.y > 800){

          // }
          // if (event.scale < 2) {
          //   if (board.scale.x < event.scale) {
          //     board.scale.set(event.scale);
          //     // board.inputEnabled = false;
          //     // board.input.enableDrag(false);
          //   }

          // }
          // else{
          //    board.inputEnabled = true;
          // }
          // Update Drag
//            var fixBottomHeight = board.height - initHeight;

//           if (board.position.x > 0) {
//             board.position.x = 0;
//           }

//           if (board.position.y > 0) {
//             board.position.y = 0;
//           }
          

//           if (board.position.y < fixBottomHeight - (fixBottomHeight * 2)) {
//             alert("fixBottomHeight"+fixBottomHeight);
// alert("board.position.y"+board.position.y);
//             board.position.y = fixBottomHeight - (fixBottomHeight * 2);
//           }


        });

        hammertime.on('pinchin', function(event) {
          
          if (board.scale.x > 1) {
            if (event.scale < 1) {
              board.scale.set(1);
              board.position.x = 0;
              board.position.y = 0;
              board.inputEnabled = false;
            } else {
              board.scale.set(event.scale);
            }
          }
          // Update Drag
          // var fixBottomHeight = board.height - initHeight;

          // if (board.position.x > 0) {

          //   board.position.x = 0;
          // }

          // if (board.position.y > 0) {
          //   board.position.y = 0;
          // }
          // if (game.world.right < game.world.width) {
          //   var diff = game.world.width - game.world.right;
          //   board.position.x = board.position.x + diff;
          // }

          // if (board.position.y < fixBottomHeight - (fixBottomHeight * 2)) {
          //   board.position.y = fixBottomHeight - (fixBottomHeight * 2);
          // }

        });

        hammertime.on("pinchend", function(event) {
        
          if (event.scale < 1) {
            board.inputEnabled = false;
          }
          else{
            board.inputEnabled = true; 
            board.input.enableDrag(false);
            // board.events.onDragUpdate.add(this.dragUpdate, this);
            // alert(board.position.x);
            
          }
          
          // Update Drag
          // var fixBottomHeight = board.height - initHeight;

          // if (board.position.x > 0) {
          //   board.position.x = 0;
          // }

          // if (board.position.y > 0) {
          //   board.position.y = 0;
          // }
          // if (game.world.right < game.world.width) {
          //   var diff = game.world.width - game.world.right;
          //   board.position.x = board.position.x + diff;
          // //   board.inputEnabled = true;
          // // board.input.enableDrag(false);
          // }

          // if (board.position.y < fixBottomHeight - (fixBottomHeight * 2)) {
          //   board.position.y = fixBottomHeight - (fixBottomHeight * 2);
             

          // }
          
          // Update Drag
          
        });

      },
      onDragStart(){
        // alert("hiii");

        // var fixBottomHeight = board.height - initHeight;

        // if (board.position.x > 0) {
        //   board.position.x = 0;
        // }

        // if (board.position.y > 0) {
        //   board.position.y = 0;
        // }
        // if (game.world.right < game.world.width) {
        //   var diff = game.world.width - game.world.right;
        //   board.position.x = board.position.x + diff;
        // }

        // if (board.position.y < fixBottomHeight - (fixBottomHeight * 2)) {
        //   board.position.y = fixBottomHeight - (fixBottomHeight * 2);
        // }
      },
      
      addTapAreas() {
        var bmd = game.add.bitmapData(posConfig.cellDimentionX, posConfig.cellDimentionY);
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, 80, 90);
        bmd.ctx.fillStyle = '#FFF';
        bmd.ctx.globalAlpha = 0;
        bmd.ctx.fill();
        for (var i = 0; i < positions.length; i++) {
          plots[i] = game.add.sprite(positions[i].posX, positions[i].posY, bmd);
          board.addChild(plots[i]);
        }
        //alert(http);
        game.input.onTap.add(this.tapAction, this);
    },

    transferCowries()
  {

    positions[HomePage.cellno-1].wallet=positions[HomePage.cellno-1].wallet+positions[player.position].give[0];
    player.wallet=player.wallet-positions[player.position].give[0];
    text.setText(""+positions[HomePage.cellno-1].wallet+"");
    special_move_index=1;
    HomePage.wallet=player.wallet;
    let i=0;
    positions[player.position].to.forEach(element => {

      this["bank_transfer_"+i].visible=false;
      // this["bank_transfer_"+i]=null;
      
      i++;
     });
  },
    
    tapAction(pointer, doubleTap) {

      //let httpObj=new this.http();
      //if (doubleTap) {
      // alert(pointer.x+","+pointer.y);
        for (var i = 0; i < positions.length; i++) {
          let inside = plots[i].getBounds().contains(pointer.x, pointer.y);
          //alert(inside);
          if (inside) {
            //alert(positions[i].desc);
            if(positions[player.position].to.includes(positions[i].cellno) && positions[player.position].specialMoveTrigger[special_move_index]==1)
            {
              // positions[i].wallet=positions[i].wallet+positions[player.position].give[0];

               bank_image.visible=true;
               
               HomePage.cellno=positions[i].cellno;
               text.visible=true;
               text.setText(""+positions[HomePage.cellno-1].wallet+"");
              // alert("Cell Wallet ::"+positions[i].wallet);

              // special_move_index=1;

            }
            else
            {
              HomePage.cellno=999;
            }
            that.callfn(positions[i].postID,positions[i].name,positions[i].desc,positions[i].blogID,positions[i].lat,positions[i].long,positions[i].wallet);
            break;
          }
        }
      //}
    }

    
      
  };

  callfn(postid,postname,postdesc,blogID,lat,long,wallet){
    HomePage.post_id=postid;
    HomePage.postname=postname;
    HomePage.postdesc=postdesc;
    HomePage.blogID=blogID;
    HomePage.lat=lat;
    HomePage.cell_wallet=wallet;
    // alert("Wallet for a cell :: "+HomePage.cell_wallet);
    // alert(HomePage.blogID);
  };

  

  changeGameDirections(change_special_move_state=true)
  {

    if(change_special_move_state==true)
    {
      special_move_index=1;
    }
  }

  playerWalletTrans(playerInfo:any)
  {
        // alert("Player Wallet is Transfered :: ");
        // alert("Transfer amount "+positions[player.position].give[0]);
        // alert("Transfer Player Wallet :: "+player_Array[playerInfo.player_no].wallet);
        // alert("CURRENT PLAYER INFO : "+playerInfo.player_no);
        // HomePage.bank_of_self_discovery=HomePage.bank_of_self_discovery+positions[trancposition].give[0];
        // alert("JSON Stringfy :: "+playerInfo.player_no);
        // alert("Wallet for the base :: "+ HomePage.playerArray[playerInfo.player_no].wallet);
          // player.wallet=player.wallet-positions[player.position].give[0];
          // HomePage.playerArray[playerInfo.player_no].wallet=HomePage.playerArray[playerInfo.player_no].wallet+positions[player.position].give[0];
          // alert("player wallet :: "+player.wallet);
          // text.setText(""+HomePage.bank_of_self_discovery+"");
          special_move_index=1;
          HomePage.wallet=player.wallet;
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
  async openModal(question="",answer="",option={},image="",postid=0){
    if(HomePage.question_status==true)
    {
    this.quizmodal=await this.modal.create({
      component:QuizmodalPage,
      componentProps: { 
        Que: question,
        ans: answer,
        opt:option,
        image:image,
        postID:postid,
      }
      });
      this.quizmodal.onDidDismiss().then((dataReturned) => {
        if (dataReturned !== null) {
          console.log(dataReturned.data.result);

           if(dataReturned.data.result==false)
           {
            player.wallet=player.wallet-2
            HomePage.wallet=player.wallet;
           }
           else
           {
            player.wallet=player.wallet+2;
            HomePage.wallet=player.wallet;
           }
           dice.inputEnabled = true;
           HomePage.question_status=false;
          
        }
      });
      return await this.quizmodal.present();
    }
  }

transferTreasure()
{
  
  player.wallet=player.wallet+positions[player.targetPosition].wallet;
  HomePage.wallet=player.wallet;
  positions[player.targetPosition].wallet=0;
}
  

  //  rollDice(diceRolled) {
  //   const dice = [...document.querySelectorAll(".die-list")];
  //   dice.forEach(die => {
  //     this.toggleClasses(die);
  //     die.dataset.roll = diceRolled;
  //   });
  // }
  //  toggleClasses(die) {
  //   die.classList.toggle("odd-roll");
  //   die.classList.toggle("even-roll");
  // }
  
  ionViewWillLeave() {
   // that.modal.dismiss();
  }
  

}
