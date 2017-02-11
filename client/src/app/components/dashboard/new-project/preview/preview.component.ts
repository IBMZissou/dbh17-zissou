import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProjectWizardData } from '../../../../models/project-wizard-data.model';

@Component({
  selector: 'np-preview',
  templateUrl: './preview.component.html',
  styleUrls: [ './preview.component.scss' ]
})
export class NewProjectPreviewComponent {
  @Input()
  public project: ProjectWizardData;

  @Output()
  public previousClicked = new EventEmitter<void>();

  @Output()
  public nextClicked = new EventEmitter<void>();

  public agreed = false;

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

  public paymentMethods = {
    'invoice': 'Invoice',
    'directdebit': 'Direct Debit'
  };

  public submit(): void {

  }

  public getStartDateString(): string {
    console.log(this.project);
    let utc = Date.UTC(this.project.project.startYear, +this.project.project.startMonth - 1, this.project.project.startDay);
    console.log(utc);
    return new Date(utc).toDateString();
  }

  public getEndDateString(): string {
    let utc = Date.UTC(this.project.project.endYear, +this.project.project.endMonth - 1, this.project.project.endDay);
    return new Date(utc).toDateString();
  }
}
