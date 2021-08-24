import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ToastController,Platform } from '@ionic/angular';
import {SpeechRecognition} from '@ionic-native/speech-recognition/ngx';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  message = '';
  messages = [];
  currentUser = '';
  roomer='';
  rooms=[];
  roomdet:any;
  currentroom:any='';
  textBox:boolean=false;
  msgforoom:any;
  matches:String[];
  isRecording=false;
  constructor(private socket: Socket, private toastCtrl: ToastController,private plt:Platform,private speechrecog:SpeechRecognition) { 


  }

  ngOnInit() {
    this.socket.connect();
 
    let name = `user-${new Date().getTime()}`;
    this.currentUser = name;
    
    this.socket.emit('set-name', name);
 
    this.socket.fromEvent('users-changed').subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });
 
    this.socket.fromEvent('message').subscribe(message => {
      this.messages.push(message);
    });

    this.socket.fromEvent('create-room-ack').subscribe(room => {
      console.log('it is working');
      this.roomdet=room;
      if(this.roomdet.roomdesc!="NO")
      {
        this.rooms.push(this.roomdet.roomdesc);
        this.showToast("room is created");
        this.textBox=!this.textBox;
      }
      else{
        this.showToast(this.roomdet.roomdesc);
        this.textBox=!this.textBox;
      }
    });

    this.socket.fromEvent('send-message-room-ack').subscribe(message => {
      this.msgforoom=message;
      console.log("ack recieved for room message");
      if(this.msgforoom.msg!="NO")
      {
        console.log("Room exists");
        this.messages.push(this.msgforoom);
        this.showToast("Message in roomid-"+this.msgforoom.room);
      }
      else{
        console.log("Room doesn't exists");
        this.showToast("No Such room exists");
      }
    });

  }

  startListening(){
    console.log("listening listening");
    let options={
      language:'en-US'
    };
    this.speechrecog.startListening().subscribe(matches=>{
      this.showToast("Recording....");
      this.matches=matches;
    });

    this.isRecording=true;

  }
  stopListening(){
    console.log("Stop listening");
    this.speechrecog.stopListening().then(()=>{
    this.showToast("Recording Stopped");
    });

  }

  getPermission(){
    console.log("getting permission");
    this.speechrecog.hasPermission().then((hasPermission:boolean)=>{
        console.log(hasPermission);
      if(!hasPermission){
        this.speechrecog.requestPermission();
      }

    })
  }
  sendMessage() {
    console.log("room message is sent");
    this.socket.emit('send-message-room', {text: this.message,room:this.currentroom});
    this.message = '';
  }


   createRoom(){
     this.socket.emit('create-room',this.roomer);
     this.roomer='';
   }
 
  ionViewWillLeave() {
    this.socket.disconnect();
  }
 
  async showToast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
  changeRoom(roomid){
    this.currentroom=roomid;
  }
  openTextbox(){
    this.textBox=!this.textBox;
  }

  getMatch(textspeech){
      this.message=textspeech;
      this.matches.splice(0,this.matches.length);
      this.isRecording=false;
  }

}
