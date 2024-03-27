import { IDriver } from "../iDriver";
import { ITransport } from "../ITransport";

export interface IFuelWaybill{
  id: number,
  date: string,
  days: number,
  startFuel: number,
  fuelTopUp: number,
  endFuel: number,
  factFuelConsumption: number,
  normalFuelConsumption: number,
  fuelEconomy: number,
  driver: IDriver | null,
  transport: ITransport | null
}