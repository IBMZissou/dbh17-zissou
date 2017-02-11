import { Signature } from './signature.model';

export class Signatures {
    private _freelancerSignature: Signature;
    private _clientSignature: Signature;

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
        };
    }
}