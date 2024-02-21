import { ICalculation } from "./iCalculation";
import { IDriver } from "./iDriver";
import { IOperation } from "./iOperation";
import { ITransport } from "./ITransport";

export interface IWaybill{
  id: number,
  number: number,
  date: string,
  days: number,
  hours: number,
  startFuel: number,
  fuelTopUp: number,
  endFuel: number,
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