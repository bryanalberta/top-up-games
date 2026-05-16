declare module 'midtrans-client' {
  export class Snap {
    constructor(options: any);
    createTransaction(parameter: any): Promise<any>;
    transaction: {
      notification(reqBody: any): Promise<any>;
    };
  }

  export class CoreApi {
    constructor(options: any);
  }
}
