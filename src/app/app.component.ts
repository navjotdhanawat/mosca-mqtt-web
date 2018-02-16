declare var $: any;
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
  sensorValue: any = 0;
  dial: any;
  gauge_value: any;
  constructor() {

  }

  ngOnInit() {
    this.dial = $(".dial .inner");
    this.gauge_value = $(".gauge .value");

    var self = this;
    this.client = mqtt.connect('ws://localhost:3000', {
      clientId: 'chrome', username: 'admin', password: 'admin'
    });

    this.client.subscribe('sensor-status');
    this.client.on('message', function (topic, payload) {
      switch (topic) {
        case 'sensor-status':
          self.sensorValue = payload.toString('utf-8');
          self.rotateDial(parseInt(self.sensorValue));
          break;
        default:
          break;
      }
    });
  }

  rotateDial(value) {
    var deg = 0;
    deg = (value * 177.5) / 100;
    this.gauge_value.html(value + "%");
    this.dial.css({ 'transform': 'rotate(' + deg + 'deg)' });
    this.dial.css({ '-ms-transform': 'rotate(' + deg + 'deg)' });
    this.dial.css({ '-moz-transform': 'rotate(' + deg + 'deg)' });
    this.dial.css({ '-o-transform': 'rotate(' + deg + 'deg)' });
    this.dial.css({ '-webkit-transform': 'rotate(' + deg + 'deg)' });
  }
}
