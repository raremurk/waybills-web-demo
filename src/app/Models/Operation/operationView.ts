import { IOperation } from "../../Interfaces/iOperation";
import { Operation } from "./operation";

export class OperationView extends Operation{
  public mileageWithLoad: string = '';
  public normShift: string = '';
  public conditionalReferenceHectares: string = '';
  public totalFuelConsumption: string = '';

  constructor(operation?: IOperation){
    super(operation);
    if(operation){
      if(operation.mileageWithLoad !== 0){
        this.mileageWithLoad = operation.mileageWithLoad.toFixed(1);
      }
      if(operation.normShift !== 0){
        this.normShift = operation.normShift.toFixed(2);
      }
      if(operation.conditionalReferenceHectares !== 0){
        this.conditionalReferenceHectares = operation.conditionalReferenceHectares.toFixed(2);
      }
      if(operation.totalFuelConsumption !== 0){
        this.totalFuelConsumption = operation.totalFuelConsumption.toFixed(1);
      }
    }
  }
}
