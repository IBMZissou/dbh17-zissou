'use strict';

import * as crypto from 'crypto';
import {Password} from '../utils/Password';

export class User {
  private _userID: string;
  private _salt: string;
  private _hash: string;
  private _firstName: string;
  private _lastName: string;
  private _companyID: string;

  public constructor(userID: string, password: string, firstName: string, lastName: string, companyID: string) {
    this._userID = userID;
    this._firstName = firstName;
    this._lastName = lastName;
    this._companyID = companyID;
    this._salt = crypto.randomBytes(16).toString('hex');
    this._hash = new Password(password, this.salt).toHash();
  }

  public get userID(): string {
    return this._userID;
  }

  public get salt(): string {
    return this._salt;
  }

  public get hash(): string {
    return this._hash;
  }

  public get firstName(): string {
    return this._firstName;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public get companyID(): string {
    return this._companyID;
  }

  public toJSON(): any {
    return {
      'userID': this.userID,
      'salt': this.salt,
      'hash': this.hash,
      'firstName': this.firstName,
      'lastName': this.lastName,
      'companyID': this.companyID
    };
  }
}