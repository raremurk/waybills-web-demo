import { formatDate } from "@angular/common";
import { formatResult } from "../formatResult";
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
      this.weekend = waybill.weekend;
      this.bonus = waybill.bonus; 
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
    return formatResult(Number(this.startFuel) + Number(this.fuelTopUp) - Number(this.endFuel), 0);
  }

  public get normalFuelConsumption(){
    return formatResult(this.operations.reduce((total, operation) => total + Number(operation.totalFuelConsumption), 0), 0);
  }

  public get earnings(){
    return formatResult(this.calculations.reduce((total, calculation) => total + Number(calculation.sum), 0), 2);
  }

  public get normShift(){
    return formatResult(this.operations.reduce((total, operation) => total + Number(operation.normShift), 0), 2);
  }

  public get conditionalReferenceHectares(){
    return formatResult(this.operations.reduce((total, operation) => total + Number(operation.conditionalReferenceHectares), 0), 2);
  }

  driverShortFullName = () => this.driver ? this.driver.shortFullName : '';
  transportName = () => this.transport ? this.transport.name : '';

  public fullDate(){
    let day = this.date.getDate();
    let daysRange = Number(this.days) === 2 ? `${day}—${day + 1}` : `${day}`;
    let monthAndYear = formatDate(this.date, 'MMMM YYYY', 'ru');
    return `${daysRange} ${monthAndYear}`;
  }

  public isLastDayOfMonth(){
    let lastDayOfMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
    let day = this.date.getDate();
    return day === lastDayOfMonth;
  }

  toJSON() {
    return {
      id: this.id,
      number: Number(this.number),
      date: formatDate(this.date, 'YYYY-MM-dd', 'ru'),
      days: Number(this.days),
      hours: Number(this.hours),
      startFuel: Number(this.startFuel),
      fuelTopUp: Number(this.fuelTopUp),
      endFuel: Number(this.endFuel),
      driverId: this.driver ? this.driver.id : 0,
      transportId: this.transport ? this.transport.id : 0,
      weekend: Number(this.weekend),
      bonus: Number(this.bonus),
      operations: this.operations.filter(x => !isNaN(Number(x.fact)) && Number(x.fact) > 0),
      calculations: this.calculations.filter(x => !isNaN(Number(x.sum)) && Number(x.sum) > 0)
    };
  }
}