import { ITransport } from "../../ITransport";
import { IDriverFuelMonthTotal } from "./iDriverFuelMonthTotal";

export interface IDriverFuelSubTotal extends IDriverFuelMonthTotal{
    transport: ITransport
}