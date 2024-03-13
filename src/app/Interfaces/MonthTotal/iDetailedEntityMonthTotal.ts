import { IEntityMonthTotal } from "./iEntityMonthTotal";
import { IMonthTotal } from "./iMonthTotal";

export interface IDetailedEntityMonthTotal extends IMonthTotal{
  entityName: string,
  entityCode: number,
  subTotals: IEntityMonthTotal[]
}