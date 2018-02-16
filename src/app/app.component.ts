// declare var require: any;
import { Component } from '@angular/core';
import * as mqtt from 'mqtt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  client: any;
  constructor() {

  }

  ngOnInit() {
    this.client = mqtt.connect('ws://localhost:3000', {
      clientId: 'chrome'
    });

    this.client.subscribe('presence');

    console.log('Client publishing.. ');

  }

  publish() {
    this.client.publish('presence', 'Client 1 is alive.. Test Ping! ' + Date());
  }
}
