import { IDriver } from "../../iDriver";
import { IDriverFuelMonthTotal } from "./iDriverFuelMonthTotal";
import { IDriverFuelSubTotal } from "./iDriverFuelSubTotal";

export interface IDetailedDriverFuelMonthTotal extends IDriverFuelMonthTotal{
    driver: IDriver,
    subTotals: IDriverFuelSubTotal[]
}