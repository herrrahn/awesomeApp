import {Component, OnInit} from '@angular/core';
import {AlertButtonService} from './alert-button.service';

@Component({
  selector: 'app-alert-button',
  templateUrl: './alert-button.component.html',
  styleUrls: ['./alert-button.component.scss']
})
export class AlertButtonComponent implements OnInit {
  severity = 423;
  hideContent = true;
  content = 'You have been warned from constant!';

  constructor(private alertButtonService: AlertButtonService) {
  }

  ngOnInit() {

  }

  async load() {
    this.content = await this.alertButtonService.getMessage();
  }

  toggle() {
    this.hideContent = !this.hideContent;
  }

  toggleAsync() {
    setTimeout(() => {
      this.toggle();
    }, 500);
  }

}
