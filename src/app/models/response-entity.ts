export class ResponseEntity {
    constructor
    (
        headers?: any,
        body?: any,
        statusCodeValue?: number,
        statusCode?: string
     )
     {
        this.headers = headers;
        this.body = body;
        this.statusCodeValue = statusCodeValue;
        this.statusCode = statusCode;
     }
     public headers: any;
     public body: any;
     public statusCodeValue: number;
     public statusCode: string;
}