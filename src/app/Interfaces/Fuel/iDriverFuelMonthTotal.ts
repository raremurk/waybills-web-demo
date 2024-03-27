import { IDriver } from "../iDriver";

export interface IDriverFuelMonthTotal{
  driver: IDriver | null,
  fuelTopUp: number,
  factFuelConsumption: number,
  normalFuelConsumption: number,
  fuelEconomy: number
}