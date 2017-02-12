import { ProjectWizardData } from './project-wizard-data.model';

export class Project {
  public projectID?: string;
  public projectName: string;
  public freelancer: string;
  public client: string;
  public startDate: number;
  public endDate: number;
  public budget: number;
  public billingMethod: string;
  public paymentType: string;
  public paymentTrigger: string;
  public paymentComments: string;
  public description: string;
  public deliverables: string;
  public jobRequirements: string[];
  public location: string;
  public hoursPerWeek: number;
  public creatorID?: string;
  public status?: string;
  public lastUpdated?: number;
  public signatures?: any;

  public static convert(wizardData: ProjectWizardData): Project {
    return {
      projectName: wizardData.project.projectName,
      freelancer: wizardData.freelancer.kvkNumber,
      client: wizardData.client.kvkNumber,
      startDate: +Date.UTC(wizardData.project.startYear, +wizardData.project.startMonth - 1, wizardData.project.startDay),
      endDate: +Date.UTC(wizardData.project.endYear, +wizardData.project.endMonth - 1, wizardData.project.endDay),
      budget: +wizardData.project.budget,
      billingMethod: wizardData.project.paymentMethod,
      paymentType: wizardData.project.budgetType,
      paymentTrigger: wizardData.project.paymentTrigger,
      paymentComments: wizardData.project.paymentInfo,
      description: wizardData.project.projectDescription,
      deliverables: '',
      jobRequirements: [],
      location: '',
      hoursPerWeek: 0
    };
  }
}
