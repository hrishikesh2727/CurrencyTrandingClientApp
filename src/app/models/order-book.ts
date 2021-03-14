export class OrderBook {
    constructor
    (
        currencyName?: string,
        currentRate?: string,
        position?: string,
        unit?: string,
        totalAmount?: string,
        orderAction?: string,
        endAction?:string
     )
     {
        this.currencyName = currencyName;
        this.currentRate = currentRate;
        this.position = position;
        this.unit = unit;
        this.totalAmount = totalAmount;
        this.orderAction = orderAction;  
        this.endAction = endAction;
     }
     public currencyName: string;
     public currentRate: string;
     public position: string;
     public unit: string;
     public totalAmount:string;
     public orderAction: string;
     public endAction:string;
}
