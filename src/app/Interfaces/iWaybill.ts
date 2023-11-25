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
  factFuelConsumption: string,
  normalFuelConsumption: string,
  driver: IDriver | null,
  transport: ITransport | null,
  earnings: string,
  weekend: string,
  bonus: string,
  operations: IOperation[],
  calculations: ICalculation[]
}