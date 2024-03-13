import { IMonthTotal } from "./iMonthTotal";

export interface IEntityMonthTotal extends IMonthTotal{
  entityName: string,
  entityCode: number
}