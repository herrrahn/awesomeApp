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

  private topSecret = 'secret';

  constructor(private alertButtonService: AlertButtonService) {
  }

  ngOnInit() {

  }

  async load() {
    this.content = await this.alertButtonService.getMessageAsPromise();
  }

  loadWithObservable() {
    this.alertButtonService.getMessageAsObservable().subscribe(message =>
      this.content = message
    );
  }

  toggle() {
    this.hideContent = !this.hideContent;
  }

  toggleAsync() {
    setTimeout(() => {
      this.toggle();
    }, 500);
  }

  notImplemented() {
    throw new Error('Sorry not implemented yet :(');
  }

  somePublicMethod() {
    console.log(this.secretFunction());
  }

  private secretFunction(): string {
    return this.topSecret;
  }

}
