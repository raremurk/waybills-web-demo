import { ICalculation } from "../../Interfaces/iCalculation";
import { Calculation } from "./calculation";

export class CalculationView extends Calculation{
  public sum: string = '';

  constructor(calculation?: ICalculation){
    super(calculation);
    if(calculation){
      this.sum = calculation.sum.toFixed(2);
    }
  }
}