import { IDriver } from "../../Interfaces/iDriver";
import { IWaybill } from "../../Interfaces/iWaybill";

export abstract class Waybill{
  public id: number = 0;
  public number: string = '';
  public date: Date = new Date();
  public days: string = '';
  public hours: string = '';

  public startFuel: string = '';
  public fuelTopUp: string = '';
  public endFuel: string = '';

  public driver: IDriver | null = null;

  public weekend: string = '';
  public bonus: string = '';

  protected operationsCount: number = 12;
  protected calculationsCount: number = 6;

  constructor(waybill?: IWaybill){
    if(waybill){
      this.id = waybill.id;
      this.number = waybill.number.toString();
      this.date = new Date(waybill.date);
      this.days = waybill.days.toString();
      this.hours = waybill.hours.toString();
      this.startFuel = waybill.startFuel.toString();
      this.fuelTopUp = waybill.fuelTopUp.toString();
      this.endFuel = waybill.endFuel.toString();
      this.driver = waybill.driver;
      this.weekend = waybill.weekend.toString();
      this.bonus = waybill.bonus.toString();
    }
  }
}