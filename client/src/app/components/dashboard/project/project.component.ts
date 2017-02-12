import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models/project.model';
import { KvKCompany } from '../../../models/kvkcompany.model';
import { ActivatedRoute, Router } from '@angular/router';
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
  public user: any;
  public userNeedsToSign = false;
  public signing = false;

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
    private router: Router,
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

          this.userNeedsToSign = this.currentUserNeedsToSign();
        }
      )
    );
    this.user = JSON.parse(localStorage.getItem('currentUser')).user;
  }

  public convertDate(timestamp: number): string {
    return new Date(timestamp).toDateString();
  }

  public sign(): void {
    this.signing = true;
    this.projectService.signProject(this.project.projectID).finally(() => this.signing = false).subscribe(
      (result: any) => this.router.navigate(['/dashboard'])
    );
  }

  private currentUserNeedsToSign(): boolean {
    if (this.user.companyType === 'tax' || this.user.companyType === 'chamberOfCommerce') {
      return false;
    } else if (this.user.companyID === this.project.freelancer && this.project.signatures.freelancerSignature.hash === '') {
      return true;
    } else if (this.user.companyID === this.project.client && this.project.signatures.clientSignature.hash === '') {
      return true;
    }
  }
}
