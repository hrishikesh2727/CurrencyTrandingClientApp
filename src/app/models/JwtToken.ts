export class JwtToken {
    constructor
    (
      jwt?: string
     )
     {
        this.jwt = jwt;
     }
     public jwt: string;     
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
