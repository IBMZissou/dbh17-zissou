import { Signature } from './Signature';

export class Agreement {
    private _freelancerSignature: Signature;
    private _clientSignature: Signature;

    public constructor() {

    }

    public get freelancerSignature(): Signature {
        return this._freelancerSignature;
    }

    public get clientSignature(): Signature {
        return this._clientSignature;
    }

    public toJSON(): any {
        return {
            'freelancerSignature': this.freelancerSignature,
            'clientSignature': this.clientSignature
        }
    }
}