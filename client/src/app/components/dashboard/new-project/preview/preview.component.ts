import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProjectWizardData } from '../../../../models/project-wizard-data.model';

@Component({
  selector: 'np-preview',
  templateUrl: './preview.component.html'
})
export class NewProjectPreviewComponent {
  @Input()
  public project: ProjectWizardData;

  @Output()
  public previousClicked = new EventEmitter<void>();

  @Output()
  public nextClicked = new EventEmitter<void>();
}
