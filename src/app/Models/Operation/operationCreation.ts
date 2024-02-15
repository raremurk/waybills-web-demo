import { IOperation } from "../../Interfaces/iOperation";
import { Operation } from "./operation";

export class OperationCreation extends Operation{ 
  public coefficient: number = 0;

  constructor(operation?: IOperation){
    super(operation);
  }

  public get mileageWithLoad(){
    return Number(this.numberOfRuns) ? (Number(this.totalMileageWithLoad) / Number(this.numberOfRuns)).toFixed(1) : '';
  }

  public get normShift(){
    return Number(this.norm) ? (Number(this.fact) / Number(this.norm)).toFixed(2) : '';
  }

  public get conditionalReferenceHectares(){
    return this.normShift ? (Number(this.normShift) * this.coefficient).toFixed(2) : '';
  }

  public get totalFuelConsumption(){
    return Number(this.fuelConsumptionPerUnit) ? (Number(this.fuelConsumptionPerUnit) * Number(this.fact)).toFixed(1) : '';
  }

  toJSON(){
    return {
      id: this.id,
      productionCostCode: this.productionCostCode,
      numberOfRuns: Number(this.numberOfRuns),
      totalMileage: Number(this.totalMileage),
      totalMileageWithLoad: Number(this.totalMileageWithLoad),
      transportedLoad: Number(this.transportedLoad),
      norm: Number(this.norm),
      fact: Number(this.fact),
      fuelConsumptionPerUnit: Number(this.fuelConsumptionPerUnit)
    };
  }
}
