import { BaseDocument } from "./base-document";

export class Currency {
    constructor
    (
        currencyName?: string,
        currencyCode?: string,
        currencyDescription?: string,
        currencyRate?: number
     )
     {
        this.currencyName = currencyName;
        this.currencyCode = currencyCode;
        this.currencyDescription = currencyDescription;
        this.currencyRate = currencyRate;    
     }
     public currencyName: string;
     public currencyCode: string;
     public currencyDescription: string;
     public currencyRate:number;
}
