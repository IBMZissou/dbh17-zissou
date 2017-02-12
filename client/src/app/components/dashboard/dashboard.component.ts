import { Component } from '@angular/core';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: [ 'dashboard.component.scss' ]
})
export class DashboardComponent {
  private user: any;

  public constructor() {
    this.user = JSON.parse(localStorage.getItem('currentUser')).user;
  }
}
