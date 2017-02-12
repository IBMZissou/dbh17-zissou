import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProjectWizardData } from '../../../../models/project-wizard-data.model';
import { ProjectService } from '../../../../services/project.service';
import { Project } from '../../../../models/project.model';

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
  public submitting = false;

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

  public constructor(
    private projectService: ProjectService
  ) {}

  public submit(): void {
    this.submitting = true;
    this.projectService.createProject(Project.convert(this.project)).finally(() => this.submitting = false).subscribe(
      () => this.nextClicked.emit(undefined)
    );
  }

  public getStartDateString(): string {
    let utc = Date.UTC(this.project.project.startYear, +this.project.project.startMonth - 1, this.project.project.startDay);
    return new Date(utc).toDateString();
  }

  public getEndDateString(): string {
    let utc = Date.UTC(this.project.project.endYear, +this.project.project.endMonth - 1, this.project.project.endDay);
    return new Date(utc).toDateString();
  }
}
