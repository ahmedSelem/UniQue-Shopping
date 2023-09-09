export class User {
  constructor(
    public id: string,
    public email: string,
    private _expirationDate : Date,
    private _token? : string,
  ) {}

  get token () {
    if(!this._expirationDate || new Date() > this._expirationDate) {
      return null;
    }
    return this._token;
  }

}
