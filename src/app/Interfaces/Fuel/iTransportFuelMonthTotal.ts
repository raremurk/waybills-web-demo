import { ITransport } from "../ITransport";

export interface ITransportFuelMonthTotal{
  transport: ITransport | null,
  startFuel: number,
  fuelTopUp: number,
  factFuelConsumption: number,
  endFuel: number,
  deviation: number
}