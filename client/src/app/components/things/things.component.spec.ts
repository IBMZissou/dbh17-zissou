import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThingsComponent } from './things.component';
import { Observable } from 'rxjs';
import { ThingService } from '../../services/thing.service';
import { CompanyInfoService } from '../../services/companyinfo.service';

class MockThingService {
  public getThingsByUser(): Observable<any[]> {
    return Observable.of([]);
  }
}

class MockCompanyInfoService {
  public getCompanyByKvkNumber(): Observable<any> {
    return Observable.of({});
  }

  public getCompanyOfCurrentUser(): void {
  }
}

describe('ThingsComponent', () => {
  let component: ThingsComponent;
  let fixture: ComponentFixture<ThingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ThingsComponent ],
      providers: [
        { provide: ThingService, useClass: MockThingService },
        { provide: CompanyInfoService, useClass: MockCompanyInfoService }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
