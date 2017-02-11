import { Component, OnInit } from '@angular/core';
import { ProjectWizardData } from '../../../models/project-wizard-data.model';
import { CompanyInfoService } from '../../../services/companyinfo.service';
import { KvKCompany } from '../../../models/kvkcompany.model';

@Component({
  templateUrl: 'newproject.component.html',
  styleUrls: [ './newproject.component.scss' ]
})
export class NewProjectComponent implements OnInit {
  public currentStep = 0;
  public project = new ProjectWizardData();

  public constructor(
    private companyInfoService: CompanyInfoService
  ) {}

  public ngOnInit(): void {
    this.companyInfoService.getCompanyOfCurrentUser().subscribe(
      (company: KvKCompany) => this.prefillFields(company)
    );
  }

  private prefillFields(company: KvKCompany): void {
    if (!company) {
      return;
    }

    this.project.freelancer.kvkNumber = +company.kvknummer;
    this.project.freelancer.companyName = company.businessName;
    this.project.freelancer.address = (company.street + ' ' + company.houseNumber + ' ' +  company.houseNumberAddition).trim();
    this.project.freelancer.zipcode = company.postalCode;
  }

  public next(): void {
    ++this.currentStep;
  }

  public previous(): void {
    --this.currentStep;
  }
}
