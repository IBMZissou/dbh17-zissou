import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProjectWizardData } from '../../../../models/project-wizard-data.model';

@Component({
  selector: 'np-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: [ './questionnaire.component.scss' ]
})
export class NewProjectQuestionnaireComponent {
  @Input()
  public project: ProjectWizardData;

  @Output()
  public previousClicked = new EventEmitter<void>();

  @Output()
  public nextClicked = new EventEmitter<void>();

  public eligible = true;
  public currentQuestion = 0;
  public progress = 0;
  public questions = [
    'Will you be taking part in an economic transaction?',
    'Will you be the sole decision-maker on how you perform your job?',
    'Will you be working with your own equipment and material (e.g. Laptop, Phone)?',
    'Have you had more than one client in the past?',
    'Will you be spending time and money on actively finding new clients?',
    'Will you be deciding your own rate?',
    'Will you be invoicing directly to your client?',
    'Will you be taking on any financial risk as an independent contractor?',
    'Will you be liable for any debt?',
    'Is there a financial risk involved if you do not perform properly?',
    'Will your payment be withheld in case of illness?',
    'When you are too busy or in case of illness, can you decide who will replace you?'
  ];

  public yesClicked(): void {
    ++this.currentQuestion;
    this.progress = Math.floor((this.currentQuestion / (this.questions.length - 1)) * 100);

    if (this.currentQuestion === this.questions.length) {
      this.nextClicked.emit(undefined);
    }
  }

  public noClicked(): void {
    this.eligible = false;
  }
}
