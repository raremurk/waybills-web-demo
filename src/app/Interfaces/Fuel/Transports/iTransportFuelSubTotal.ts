import { IDriver } from "../../iDriver";
import { ITransportFuelMonthTotal } from "./iTransportFuelMonthTotal";

export interface ITransportFuelSubTotal extends ITransportFuelMonthTotal{
    driver: IDriver
}