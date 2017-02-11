export class Signature {
    private _timestamp: number;

    public constructor(private _hash: string, private _userID: string) {
        this._timestamp = new Date().getTime();
    }

    public get timestamp(): number {
        return this._timestamp;
    }

    public get hash(): string {
        return this._hash;
    }

    public get userID(): string {
        return this._userID;
    }

    public toJSON(): any {
        return {
            'timestamp': this.timestamp,
            'hash': this.hash,
            'userID': this.userID
        }
    }
}
