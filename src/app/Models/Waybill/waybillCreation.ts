import { formatDate } from "@angular/common";
import { ITransport } from "../../Interfaces/ITransport";
import { IWaybill } from "../../Interfaces/iWaybill";
import { CalculationCreation } from "../Calculation/calculationCreation";
import { OperationCreation } from "../Operation/operationCreation";
import { Waybill } from "./waybill";
import '@angular/common/locales/global/ru';

export class WaybillCreation extends Waybill{
  private _transport: ITransport | null = null;
  public operations: OperationCreation[] = [];
  public calculations: CalculationCreation[] = [];

  constructor(waybill?: IWaybill){
    super(waybill);
    if(waybill){
      this.operations = waybill.operations.map(x => new OperationCreation(x));
      this.transport = waybill.transport;
      this.calculations = waybill.calculations.map(x => new CalculationCreation(x));
    }

    while(this.operations.length < this.operationsCount){
      this.operations.push(new OperationCreation());
    }

    while(this.calculations.length < this.calculationsCount){
      this.calculations.push(new CalculationCreation());
    }
  }

  public get transport(){
    return this._transport;
  }

  public set transport(transport: ITransport | null){
    this._transport = transport;
    this.operations.forEach(x => x.coefficient = this._transport ? this._transport.coefficient : 0);
  }

  public get factFuelConsumption(){
    return Number(this.startFuel) + Number(this.fuelTopUp) - Number(this.endFuel);
  }

  public get normalFuelConsumption(){
    return this.operations.reduce((total, operation) => total + Number(operation.totalFuelConsumption), 0).toFixed(1);
  }

  public get earnings(){
    return this.calculations.reduce((total, calculation) => total + Number(calculation.sum), 0).toFixed(2);
  }

  toJSON() {
    return {
      id: this.id,
      number: Number(this.number),
      date: formatDate(this.date, 'yyyy-MM-dd', 'ru'),
      days: Number(this.days),
      hours: Number(this.hours),
      startFuel: Number(this.startFuel),
      fuelTopUp: Number(this.fuelTopUp),
      endFuel: Number(this.endFuel),
      driverId: this.driver ? this.driver.id : 0,
      transportId: this.transport ? this.transport.id : 0,
      weekend: Number(this.weekend),
      bonus: Number(this.bonus),
      operations: this.operations.filter(x => Number(x.fact) > 0),
      calculations: this.calculations.filter(x => Number(x.sum) > 0)
    };
  }
}