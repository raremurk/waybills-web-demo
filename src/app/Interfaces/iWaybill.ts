import { ICalculation } from "./iCalculation";
import { IDriver } from "./iDriver";
import { IOperation } from "./iOperation";
import { ITransport } from "./ITransport";

export interface IWaybill{
  id: number,
  number: string,
  date: string,
  days: string,
  hours: string,
  startFuel: string,
  fuelTopUp: string,
  endFuel: string,
  factFuelConsumption: number,
  normalFuelConsumption: number,
  driver: IDriver | null,
  transport: ITransport | null,
  earnings: number,
  weekend: number,
  bonus: number,
  operations: IOperation[],
  calculations: ICalculation[]
}