import { ITransportMonthTotal } from "./iTransportMonthTotal";

export interface IDriverMonthTotal{
  driverFullName: string,
  driverPersonnelNumber: number,
  transportTotals: ITransportMonthTotal[]
}