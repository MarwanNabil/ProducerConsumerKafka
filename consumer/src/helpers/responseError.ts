export class ResponseError extends Error {
  public statusCode: number;
  public data: any;
  constructor(message: string) {
    super(message);
    this.statusCode = 200;
    this.data = null;
  }
}
