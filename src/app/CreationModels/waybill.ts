import { formatDate } from "@angular/common";
import { ITransport } from "../Interfaces/ITransport";
import { IWaybill } from "../Interfaces/iWaybill";
import { Calculation } from "./calculation";
import { Driver } from "./driver";
import { Operation } from "./operation";
import '@angular/common/locales/global/ru';

export class Waybill{
  public id: number = 0;
  public number: string = '';
  public date: Date = new Date();
  public days: string = '';
  public hours: string = '';

  public startFuel: string = '';
  public fuelTopUp: string = '';
  public endFuel: string = '';

  public driver: Driver | null = null;
  private _transport: ITransport | null = null;

  public weekend: string = '';
  public bonus: string = '';

  public operations: Operation[] = [];
  public calculations: Calculation[] = [];

  private operationsCount: number = 12;
  private calculationsCount: number = 6;

  constructor(waybill?: IWaybill){
    if(waybill){
      this.id = waybill.id;
      this.number = waybill.number;
      this.date = new Date(waybill.date);
      this.days = waybill.days;
      this.hours = waybill.hours;
      this.startFuel = waybill.startFuel;
      this.fuelTopUp = waybill.fuelTopUp;
      this.endFuel = waybill.endFuel;
      this.driver = waybill.driver ? new Driver(waybill.driver) : null;
      this.weekend = waybill.weekend.toString();
      this.bonus = waybill.bonus.toString(); 
      this.operations = waybill.operations.map(x => new Operation(x));
      this.transport = waybill.transport;
      this.calculations = waybill.calculations.map(x => new Calculation(x));
    }

    while (this.operations.length < this.operationsCount) {
      this.operations.push(new Operation());
    }
  
    while (this.calculations.length < this.calculationsCount) {
      this.calculations.push(new Calculation());
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
    return this.operations.reduce((total, operation) => total + Number(operation.totalFuelConsumption), 0);
  }

  public get earnings(){
    return this.calculations.reduce((total, calculation) => total + Number(calculation.sum), 0);
  }

  driverShortFullName = () => this.driver ? this.driver.shortFullName : '';
  transportName = () => this.transport ? this.transport.name : '';

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