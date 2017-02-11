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

export class Project {
  public freelancer: ProjectFreelancer = new ProjectFreelancer();
  public client: ProjectClient = new ProjectClient();
}
