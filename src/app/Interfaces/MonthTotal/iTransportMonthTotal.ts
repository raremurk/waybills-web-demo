import { IMonthTotal } from "./iMonthTotal";

export interface ITransportMonthTotal extends IMonthTotal{
  transportName: string,
  transportCode: number
}