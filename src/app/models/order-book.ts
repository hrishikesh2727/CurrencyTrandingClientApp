export class OrderBook {
    constructor
    (
        currencyName?: string,
        currentRate?: string,
        position?: string,
        unit?: string,
        totalAmount?: string,
        orderAction?: string
     )
     {
        this.currencyName = currencyName;
        this.currentRate = currentRate;
        this.position = position;
        this.unit = unit;
        this.totalAmount = totalAmount;
        this.orderAction = orderAction;  
     }
     public currencyName: string;
     public currentRate: string;
     public position: string;
     public currencyRate:string;
     public unit: string;
     public totalAmount:string;
     public orderAction: string;
}
