import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

declare var Ably: any;

@Component({
  selector: 'app-vote-chart',
  templateUrl: './vote-chart.component.html',
  styleUrls: ['./vote-chart.component.css'],
})
export class VoteChartComponent implements OnInit {

  constructor() { }

  // Attributes
  ably: any;
  receiveChannel: any;
  yes_votes = 0;
  no_votes = 0;
  maybe_votes = 0;

  ngOnInit() {
    this.ably = new Ably.Realtime('<YOUR_APP_URL');
    // Attach to a Channel
    this.receiveChannel = this.ably.channels.get('vote-channel');
    // Ably Subscription
    this.receiveChannel.subscribe('update', function(message: any) {

      if (message.data.vote === 1) {
          this.yes_votes++;
      } else if (message.data.vote === -1) {
          this.no_votes++;
      } else if (message.data.vote === 0) {
          this.maybe_votes++;
      }
    });
  }
}
