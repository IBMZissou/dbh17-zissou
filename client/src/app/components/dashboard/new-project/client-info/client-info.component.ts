import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ProjectWizardData } from '../../../../models/project-wizard-data.model';

@Component({
  selector: 'np-client-info',
  templateUrl: './client-info.component.html'
})
export class NewProjectClientInfoComponent {
  @Input()
  public project: ProjectWizardData;

  @Output()
  public previousClicked = new EventEmitter<void>();

  @Output()
  public nextClicked = new EventEmitter<void>();
}
