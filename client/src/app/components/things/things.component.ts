import {Component, OnInit} from '@angular/core';
import {ThingService} from '../../services/thing.service'
import {CompanyInfoService} from '../../services/companyInfo.service'

@Component({
  selector: 'app-things',
  templateUrl: './things.component.html',
  styleUrls: ['./things.component.css']
})
export class ThingsComponent implements OnInit {
  private things: any;

  constructor(private _thingsService: ThingService,
              private _companyInfoService: CompanyInfoService  ) {
  }

  ngOnInit() {
    this._thingsService.getThingsByUser().subscribe(things => {
      console.log(things);
      this.things = things;
    });

    this._companyInfoService.getCompanyOfCurrentUser();
  }
}
