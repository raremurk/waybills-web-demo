import { formatResult } from "../formatResult";
import { IOperation } from "../Interfaces/iOperation";

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
  
  public coefficient: number = 0;

  constructor(operation?: IOperation){
    if(operation){
      this.id = operation.id;
      this.productionCostCode = operation.productionCostCode;
      this.numberOfRuns = operation.numberOfRuns;
      this.totalMileage = operation.totalMileage;
      this.totalMileageWithLoad = operation.totalMileageWithLoad;
      this.transportedLoad = operation.transportedLoad;
      this.norm = operation.norm;
      this.fact = operation.fact;
      this.fuelConsumptionPerUnit = operation.fuelConsumptionPerUnit;
    }
  }

  public get mileageWithLoad(){
    return this.totalMileageWithLoad || this.numberOfRuns ?
      formatResult(Number(this.totalMileageWithLoad) / Number(this.numberOfRuns), 1) : '';
  }

  public get normShift(){
    return this.fact || this.norm ?
      formatResult(Number(this.fact) / Number(this.norm), 2) : '';
  }

  public get conditionalReferenceHectares(){
    return this.normShift && this.coefficient > 0 ?
      formatResult(Number(this.normShift) * this.coefficient, 2) : '';
  }

  public get totalFuelConsumption(){
    return this.fuelConsumptionPerUnit || this.fact ?
      formatResult(Number(this.fuelConsumptionPerUnit) * Number(this.fact), 1) : '';
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
