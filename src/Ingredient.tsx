export class Ingredient{
  constructor(
    public name: string,
    public amount?: number,
    public unit? : string
  ) {
    this.name = name;
    if(amount !== undefined) this.amount = amount;
    if(unit !== undefined) this.unit = unit;
  }
}