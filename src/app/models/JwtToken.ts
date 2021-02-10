export class JwtToken {
    constructor
    (
      token?: string
     )
     {
        this.token = token;
     }
     public token: string;     
}

export class CurrencyApi {
   constructor
   (
      source?: string
    )
    {
       this.source = source;
    }
    public source: string;     
}
