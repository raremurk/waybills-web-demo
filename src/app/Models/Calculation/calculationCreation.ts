import { ICalculation } from "../../Interfaces/iCalculation";
import { Calculation } from "./calculation";

export class CalculationCreation extends Calculation{
  constructor(calculation?: ICalculation){
    super(calculation);
  }

  public get sum(){
    return Number(this.quantity) ? (Number(this.quantity) * Number(this.price)).toFixed(2) : '';
  }
}