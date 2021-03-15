export class LiveRates {
      constructor
      (
          position?: number,
          symbol?: string,
          ratedate?: Date,
          currentValue?: number,
          previousValue?: number,
       )
       {
          this.position = position;
          this.symbol = symbol;
          this.ratedate = ratedate;
          this.currentValue = currentValue;
          this.previousValue = previousValue;
       }
       public position: number;
       public symbol: string;
       public ratedate: Date;
       public currentValue:number;
       public previousValue:number;

}


