import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ProjectWizardData } from '../../../../models/project-wizard-data.model';
import { CompanyInfoService } from '../../../../services/companyinfo.service';
import { KvKCompany } from '../../../../models/kvkcompany.model';

@Component({
  selector: 'np-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: [ './client-info.component.scss' ]
})
export class NewProjectClientInfoComponent {
  @Input()
  public project: ProjectWizardData;

  @Output()
  public previousClicked = new EventEmitter<void>();

  @Output()
  public nextClicked = new EventEmitter<void>();

  public searchingCompany = false;

  public constructor(
    private companyInfoService: CompanyInfoService
  ) {}

  public searchCompany(identifier: string): void {
    if (!identifier) {
      return;
    }

    this.searchingCompany = true;

    if (this.isNumeric(identifier)) {
      this.companyInfoService.findByKvKNumber(identifier).finally(() => this.searchingCompany = false).subscribe(
        (result: {companies: KvKCompany[]}) => this.populateFromSearch(result.companies)
      );
    } else {
      this.companyInfoService.findByName(identifier).finally(() => this.searchingCompany = false).subscribe(
        (result: {companies: KvKCompany[]}) => this.populateFromSearch(result.companies)
      );
    }
  }

  private isNumeric(value: string): boolean {
    return /^\d+$/.test(value);
  }

  private populateFromSearch(result: KvKCompany[]) {
    if (!result || result.length !== 1) {
      return;
    }

    let company = result[0];

    this.project.client.companyName = company.businessName;
    this.project.client.kvkNumber = company.kvknummer;
    this.project.client.address = (company.street + ' ' + company.houseNumber + ' ' + company.houseNumberAddition).trim();
    this.project.client.zipcode = company.postalCode;
  }
}
