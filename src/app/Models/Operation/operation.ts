import { IOperation } from "../../Interfaces/iOperation";

export class Operation{
  public id: number = 0;
  public productionCostCode: string = '';
  public numberOfRuns: string = '';
  public totalMileage: string = '';
  public totalMileageWithLoad: string = '';
  public transportedLoad: string = '';
  public norm: string = '';
  public fact: string = '';
  public fuelConsumptionPerUnit: string = '';
  
  constructor(operation?: IOperation){
    if(operation){
      this.id = operation.id;
      this.productionCostCode = operation.productionCostCode;
      if(operation.numberOfRuns !== 0){
        this.numberOfRuns = operation.numberOfRuns.toString();
      }
      if(operation.totalMileage !== 0){
        this.totalMileage = operation.totalMileage.toString();
      }
      if(operation.totalMileageWithLoad !== 0){
        this.totalMileageWithLoad = operation.totalMileageWithLoad.toString();
      }
      if(operation.transportedLoad !== 0){
        this.transportedLoad = operation.transportedLoad.toString();
      }
      if(operation.norm !== 0){
        this.norm = operation.norm.toString();
      }
      if(operation.fact !== 0){
        this.fact = operation.fact.toString();
      }
      if(operation.fuelConsumptionPerUnit !== 0){
        this.fuelConsumptionPerUnit = operation.fuelConsumptionPerUnit.toString();
      }
    }
  }
}
