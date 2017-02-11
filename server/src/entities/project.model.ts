'use strict';

import * as shortID from 'shortid';

export class Project {
    private _projectID: string;
    private _creatorID: string;

    public constructor(private _freelancer: string,
                       private _client: string,
                       private _startDate: number,
                       private _endDate: number,
                       private _budget: number,
                       private _paymentType: string,
                       private _description: string,
                       private _deliverables: string,
                       private _jobRequirements: string[],
                       private _location: string,
                       private _hoursPerWeek: number) {
        this._projectID = shortID.generate();
    }

    public get projectID(): string {
        return this._projectID;
    }

    public get freelancer(): string {
        return this._freelancer;
    }

    public get client(): string {
        return this._client;
    }

    public get startDate(): number {
        return this._startDate;
    }

    public get endDate(): number {
        return this._endDate;
    }

    public get budget(): number {
        return this._budget;
    }

    public get paymentType(): string {
        return this._paymentType;
    }

    public get deliverables(): string {
        return this._deliverables;
    }

    public get creatorID(): string {
        return this._creatorID;
    }

    public get description(): string {
        return this._description;
    }

    public get jobRequirements(): string[] {
        return this._jobRequirements;
    }

    public get location(): string {
        return this._location;
    }

    public get hoursPerWeek(): number {
        return this._hoursPerWeek;
    }

    public toJSON(): any {
        return {
            'projectID': this.projectID,
            'freelancer': this.freelancer,
            'client': this.client,
            'startDate': this.startDate,
            'endDate': this.endDate,
            'budget': this.budget,
            'paymentType': this.paymentType,
            'description': this.description,
            'deliverables': this.deliverables,
            'jobRequirements': this.jobRequirements,
            'location': this.location,
            'hoursPerWeek': this.hoursPerWeek,
            'creatorID': this.creatorID
        };
    }
}