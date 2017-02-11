import { Component, OnInit } from '@angular/core';
import { ThingService } from '../../services/thing.service';
import { CompanyInfoService } from '../../services/companyInfo.service';

@Component({
  templateUrl: './things.component.html',
  styleUrls: ['./things.component.css']
})
export class ThingsComponent implements OnInit {
  public things: any[];

  public constructor(
    private _thingsService: ThingService,
    private _companyInfoService: CompanyInfoService
  ) {}

  public ngOnInit(): void {
    this._thingsService.getThingsByUser().subscribe(things => {
      console.log(things);
      this.things = things;
    });

    this._companyInfoService.getCompanyByKvkNumber('14060324').subscribe(company => {
      console.log(company);
    });
  }
}
