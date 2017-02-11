'use strict';

export class Company {
  private _companyType: string;

  public constructor(private _companyID: string,
                     private _name: string) {
    this._companyType = 'company';
  }

  public get companyID(): string {
    return this._companyID;
  }

  public get name(): string {
    return this._name;
  }

  public get companyType(): string {
    return this._companyType;
  }

  public toJSON(): any {
    return {
      'companyID': this.companyID,
      'name': this.name,
      'companyType': this.companyType
    };
  }
}