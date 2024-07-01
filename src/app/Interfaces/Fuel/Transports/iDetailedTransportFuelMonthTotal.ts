import { ITransport } from "../../ITransport";
import { ITransportFuelMonthTotal } from "./iTransportFuelMonthTotal";
import { ITransportFuelSubTotal } from "./iTransportFuelSubTotal";

export interface IDetailedTransportFuelMonthTotal extends ITransportFuelMonthTotal{
    transport: ITransport,
    subTotals: ITransportFuelSubTotal[]
}