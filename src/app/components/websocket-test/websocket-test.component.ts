import { Component, OnInit } from '@angular/core';
import * as SockJS from '../../../sockjs.min.js';
import { Stomp } from '../../../stomp.min.js';

@Component({
  selector: 'app-websocket-test',
  templateUrl: './websocket-test.component.html',
  styleUrls: ['./websocket-test.component.css']
})
export class WebsocketTestComponent implements OnInit {

  isConnected: boolean = false;
  greetings: string = "";
  stompClient: any;
  it: any = this;
  name: string = "no name specified yet";

  constructor() { }

  ngOnInit() {
  }

  connect() {
    var socket = new SockJS('http://localhost:8080/gs-guide-websocket');
    var stompClient = Stomp.over(socket);
    this.isConnected = true;
    stompClient.connect({}, this.onConnect.bind(this));
    this.stompClient = stompClient;
  }

  onConnect(frame) {
    this.stompClient.subscribe('/topic/greetings', this.onGreeting.bind(this));
  }

  onGreeting(greeting) {
    this.showGreeting(JSON.parse(greeting.body).content);
  }

  sendName() {
    if (this.name) {
      this.stompClient.send("/app/hello", {}, JSON.stringify({ 'name': this.name }));
    } else {
      console.log("no name!");
    }
  }

  disconnect() {
    if (this.stompClient !== null) {
        this.stompClient.disconnect();
    }

    this.isConnected = false;
    console.log("Disconnected");
  }

  showGreeting(message) {
    this.greetings += message + "\n\r";
  }
}
