import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ProjectWizardData } from '../../../../models/project-wizard-data.model';

@Component({
  selector: 'np-project',
  templateUrl: './project.component.html'
})
export class NewProjectProjectComponent {
  @Input()
  public project: ProjectWizardData;

  @Output()
  public previousClicked = new EventEmitter<void>();

  @Output()
  public nextClicked = new EventEmitter<void>();
}
