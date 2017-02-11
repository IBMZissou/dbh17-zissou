import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  public username = '';
  public password = '';
  public authenticating = false;

  public constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService
  ) {}

  public ngOnInit(): void {
    // reset login status
    this._authenticationService.logout();
  }

  public login(username: string, password: string): void {
    this.authenticating = true;
    this._authenticationService.login(username, password).finally(() => this.authenticating = false)
      .subscribe(result => {
        if (result) {
          this._router.navigate(['./things']);
        }
      });
  }
}
