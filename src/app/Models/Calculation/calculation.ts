import { ICalculation } from "../../Interfaces/iCalculation";

export class Calculation{
  public id: number = 0;
  public quantity: string = '';
  public price: string = '';

  constructor(calculation?: ICalculation){
    if(calculation){
      this.id = calculation.id;
      this.quantity = calculation.quantity.toString();
      this.price = calculation.price.toString();
    }
  }
}