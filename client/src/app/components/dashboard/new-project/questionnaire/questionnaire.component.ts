import { Component, Input, Output, EventEmitter, trigger, state, style, transition, animate } from '@angular/core';
import { ProjectWizardData } from '../../../../models/project-wizard-data.model';

@Component({
  selector: 'np-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: [ './questionnaire.component.scss' ],
  animations: [
    trigger('collapse',[
      state('open', style({
        height: '*'
      })),
      state('closed', style({
        height: 0
      })),
      transition('open <=> closed', animate(300))
    ])
  ]
})
export class NewProjectQuestionnaireComponent {
  @Input()
  public project: ProjectWizardData;

  @Output()
  public previousClicked = new EventEmitter<void>();

  @Output()
  public nextClicked = new EventEmitter<void>();

  public collapse = true;
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
  public information = [
    'You are taking part in an economic transaction whenever you deliver goods or services to ' +
    'private individuals or companies that in exchange will compensate you in a way that isn’t symbolical.',
    'Entrepreneurship involves choosing which jobs you do as well as the way you execute them. Not being able ' +
    'to make work related decisions could be an indication of not being an entrepreneur.',
    'To become less dependent you should invest in your own equipment as well as use your own equipment ' +
    'during jobs. If your job involves delivering goods it is perfectly possible you need to work with your ' +
    'client’s equipment, in this case not using your own equipment is not a problem.',
    'Working for only one client for a long time and retrieve almost all of your income from one client could ' +
    'very well be an indication of not being an entrepreneur.',
    'Entrepreneurs should be actively finding new clients. Some examples are: having your own website, ' +
    'advertise, being a member of a network association etc.',
    'Entrepreneurship involves deciding your own rates. It could be an indication of not being an entrepreneur ' +
    'when your client decides your rates.',
    'Third parties doing your invoicing could be an indication of not being an entrepreneur.',
    'Entrepreneurial risk is part of being an entrepreneur. If there is no financial risk, this is an ' +
    'indication of not being an entrepreneur.',
    'Not being liable for your own debt is an indication of not being an entrepreneur.',
    'Not performing properly should be at one’s own expense, if not, this is in indication of not being an ' +
    'entrepreneur.',
    'Other than working as an employee you will not be paid wages whenever you fall ill, this means you ' +
    'are not an entrepreneur.',
    'When delivering services, it’s perfectly possible you’re irreplaceable, but when this is not the case, ' +
    'you should make agreements about replacement during illness and in case of over-occupation.'
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

  public resume(): void {
    this.eligible = true;
    this.yesClicked();
  }
}
