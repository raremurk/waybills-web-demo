import { IMonthTotal } from "./iMonthTotal";
import { ITransportMonthTotal } from "./iTransportMonthTotal";

export interface IDriverMonthTotal extends IMonthTotal{
  driverFullName: string,
  driverPersonnelNumber: number,
  transportTotals: ITransportMonthTotal[]
}