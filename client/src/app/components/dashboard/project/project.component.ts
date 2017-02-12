import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models/project.model';
import { KvKCompany } from '../../../models/kvkcompany.model';
import { ActivatedRoute } from '@angular/router';
import { CompanyInfoService } from '../../../services/companyinfo.service';
import { ProjectService } from '../../../services/project.service';

@Component({
  templateUrl: './project.component.html',
  styleUrls: [ './project.component.scss' ]
})
export class ProjectComponent implements OnInit {
  public project: Project;
  public client: KvKCompany;
  public freelancer: KvKCompany;

  public budgetMethods = {
    hourly: 'Hourly',
    weekly: 'Weekly',
    montly: 'Monthly',
    'project-based': 'Project-based',
  };

  public paymentTriggers = {
    'default': 'Default',
    '30days': '30 days after',
    'custom': 'Custom',
  };

  public billingMethods = {
    'invoice': 'Invoice',
    'directdebit': 'Direct Debit'
  };

  public agreed = false;

  public constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private companyInfoService: CompanyInfoService
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (data: any) => this.projectService.getProject(data.id).subscribe(
        (project: Project) => {
          this.project = project;

          this.companyInfoService.getCompanyByKvkNumber(project.client).subscribe(
            (company: KvKCompany) => this.client = company
          );

          this.companyInfoService.getCompanyByKvkNumber(project.freelancer).subscribe(
            (company: KvKCompany) => this.freelancer = company
          );
        }
      )
    );
  }

  public convertDate(timestamp: number): string {
    return new Date(timestamp).toDateString();
  }

  public sign(): void {

  }
}
