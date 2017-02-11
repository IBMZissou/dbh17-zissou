import {Container} from 'typedi';
import {Get, Post, JsonController, Param, Body, Req, UseBefore} from 'routing-controllers';
import {JSONWebToken} from '../../utils/JSONWebToken';
// import {Company} from '../../entities/company.model';
import {UserAuthenticatorMiddleware} from '../../middleware/UserAuthenticatorMiddleware';
import {BlockchainClient} from '../../blockchain/client/blockchainClient';

@JsonController('/companies')
@UseBefore(UserAuthenticatorMiddleware)
export class CompaniesController {
  private blockchainClient: BlockchainClient = Container.get(BlockchainClient);

  @Get('/')
  public getCompany(@Req() request: any): any {
    let enrollmentID = new JSONWebToken(request).getUserID();

    return this.blockchainClient.query('getCompanyByCertificate', [], enrollmentID);
  }
}