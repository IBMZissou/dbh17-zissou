import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProjectWizardData } from '../../../../models/project-wizard-data.model';

@Component({
  selector: 'np-personal-info',
  templateUrl: './personal-info.component.html'
})
export class NewProjectPersonalInfoComponent {
  @Input()
  public project: ProjectWizardData;

  @Output()
  public nextClicked = new EventEmitter<void>();
}
