'use strict';

export class Company {
  public constructor(private _companyID: string,
                     private _name: string) {
  }

  public get companyID(): string {
    return this._companyID;
  }

  public get name(): string {
    return this._name;
  }

  public toJSON(): any {
    return {
      'companyID': this.companyID,
      'name': this.name
    };
  }
}