import { formatResult } from "../formatResult";
import { ICalculation } from "../Interfaces/iCalculation";

export class Calculation{
  public id: number = 0;
  public quantity: string = '';
  public price: string = '';

  constructor(calculation?: ICalculation){
    if(calculation){
      this.id = calculation.id;
      this.quantity = calculation.quantity;
      this.price = calculation.price;
    }
  }

  public get sum(){
    return this.quantity || this.price ?
      formatResult(Number(this.quantity) * Number(this.price), 2) : '';
  }
}