export class ProjectFreelancer {
  public companyName: string;
  public kvkNumber: number;
  public address: string;
  public zipcode: string;
  public firstName: string;
  public lastName: string;
}

export class ProjectClient {
  public companyName: string;
  public kvkNumber: number;
  public address: string;
  public zipcode: string;
}

export class ProjectData {
  public projectName: string;
  public projectDescription: string;

  public budgetType: string;
  public budget: number;
  public paymentTrigger: string;

  public startDay: number;
  public startMonth: number;
  public startYear: number;

  public endDay: number;
  public endMonth: number;
  public endYear: number;

  public paymentMethod: string;
  public paymentInfo: string;
}

export class ProjectWizardData {
  public freelancer: ProjectFreelancer = new ProjectFreelancer();
  public client: ProjectClient = new ProjectClient();
  public project: ProjectData = new ProjectData();
}
