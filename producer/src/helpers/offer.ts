export default class OfferModel {
  offerDisc: string;
  constructor(offerDisc: string) {
    this.offerDisc = offerDisc;
  }
  public getOfferDisc() {
    return this.offerDisc;
  }
}
