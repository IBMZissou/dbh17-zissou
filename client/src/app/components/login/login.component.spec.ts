import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../../services/authentication.service';
import { Observable } from 'rxjs';
import { NgSemanticModule } from 'ng-semantic/ng-semantic';

class MockAuthenticationService {
  public logout(): void  {
  }

  public login(username: string, password: string): Observable<boolean> {
    return Observable.of(false);
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService }
      ],
      imports: [
        RouterTestingModule,
        FormsModule,
        NgSemanticModule
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
