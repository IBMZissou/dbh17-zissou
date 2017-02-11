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
                       private _deliverables: string) {
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

    public toJSON(): any {
        return {
            'projectID': this.projectID,
            'freelancer': this.freelancer,
            'client': this.client,
            'startDate': this.startDate,
            'endDate': this.endDate,
            'budget': this.budget,
            'paymentType': this.paymentType,
            'deliverables': this.deliverables,
            'creatorID': this.creatorID
        };
    }
}