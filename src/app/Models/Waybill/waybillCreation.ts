import { formatDate } from "@angular/common";
import { ITransport } from "../../Interfaces/ITransport";
import { IWaybill } from "../../Interfaces/iWaybill";
import { CalculationCreation } from "../Calculation/calculationCreation";
import { OperationCreation } from "../Operation/operationCreation";
import { Waybill } from "./waybill";

export class WaybillCreation extends Waybill{
  private _transport: ITransport | null = null;
  private _bonus: string = '';
  private _weekend: string = '';
  public bonusSizeInPercentages: string = '';
  public weekendEqualsEarnings: boolean = false;

  public operations: OperationCreation[] = [];
  public calculations: CalculationCreation[] = [];

  constructor(waybill?: IWaybill){
    super(waybill);
    if(waybill){
      this.operations = waybill.operations.map(x => new OperationCreation(x));
      this.transport = waybill.transport;
      this.calculations = waybill.calculations.map(x => new CalculationCreation(x));
      this._bonus = waybill.bonus.toString();
      this._weekend = waybill.weekend.toString();
      this.bonusSizeInPercentages = (waybill.bonus / waybill.earnings * 100).toFixed();
      this.weekendEqualsEarnings = waybill.earnings === waybill.weekend;
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
    this.operations.forEach(x => x.coefficient = this._transport?.coefficient ?? 0);
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

  public get bonus(){
    return Number(this.bonusSizeInPercentages) ?
      (Number(this.earnings) * Number(this.bonusSizeInPercentages) / 100).toFixed(2) : this._bonus;
  }

  public set bonus(bonus: string){
    this._bonus = bonus;
  }

  public get weekend(){
    return this.weekendEqualsEarnings ? this.earnings : this._weekend;
  }

  public set weekend(weekend: string){
    this._weekend = weekend;
  }

  toJSON() {
    return {
      id: this.id,
      number: Number(this.number),
      date: formatDate(this.date, 'yyyy-MM-dd', 'en-US'),
      days: Number(this.days),
      hours: Number(this.hours),
      startFuel: Number(this.startFuel),
      fuelTopUp: Number(this.fuelTopUp),
      endFuel: Number(this.endFuel),
      driverId: this.driver?.id ?? 0,
      transportId: this.transport?.id ?? 0,
      bonus: Number(this._bonus),
      weekend: Number(this._weekend),
      bonusSizeInPercentages: Number(this.bonusSizeInPercentages),
      weekendEqualsEarnings: this.weekendEqualsEarnings,
      operations: this.operations.filter(x => Number(x.fact) > 0),
      calculations: this.calculations.filter(x => Number(x.sum) > 0)
    };
  }
}