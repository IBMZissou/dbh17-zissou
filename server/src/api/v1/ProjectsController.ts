import { Post, Body, Req, JsonController, UseBefore, Get, Param } from 'routing-controllers';
import { BlockchainClient } from '../../blockchain/client/blockchainClient';
import { Container } from 'typedi';
import { JSONWebToken } from '../../utils/JSONWebToken';
import { Project } from '../../entities/project.model';
import { UserAuthenticatorMiddleware } from '../../middleware/UserAuthenticatorMiddleware';

@JsonController()
@UseBefore(UserAuthenticatorMiddleware)
export class ProjectsController {
    private blockchainClient: BlockchainClient = Container.get(BlockchainClient);

    @Get('/projects')
    public getProjectsForUser(@Req() request: any): any {
        let enrollmentID = new JSONWebToken(request).getUserID();

        return this.blockchainClient.query('getProjects', [], enrollmentID);
    }

    @Post('/projects')
    public create(@Body() project: Project, @Req() request: any): any {
      let enrollmentID = new JSONWebToken(request).getUserID();

        let newProject = new Project(
            request.body.freelancer,
            request.body.client,
            request.body.startDate,
            request.body.endDate,
            request.body.budget,
            request.body.paymentType,
            request.body.description,
            request.body.deliverables,
            request.body.jobRequirements,
            request.body.location,
            request.body.hoursPerWeek
        );

        return this.blockchainClient.invoke('createProject', [JSON.stringify(newProject)], enrollmentID);
    }

    @Get('/project/:id')
    public getProjectById(@Param('id') projectID: string, @Req() request: any): any {
        let enrollmentID = new JSONWebToken(request).getUserID();

        return this.blockchainClient.query('getProjectByID', [projectID], enrollmentID);
    }
}