import { ITransport } from "../../Interfaces/ITransport";
import { IWaybill } from "../../Interfaces/iWaybill";
import { CalculationView } from "../Calculation/calculationView";
import { OperationView } from "../Operation/operationView";
import { Waybill } from "./waybill";

export class WaybillView extends Waybill{
  public transport: ITransport | null;
  public factFuelConsumption: number; 
  public normalFuelConsumption: number;
  public earnings: string;
  public bonus: string;
  public weekend: string;
  public bonusSizeInPercentages: string;
  public weekendEqualsEarnings: boolean;

  public operations: OperationView[] = [];
  public calculations: CalculationView[] = [];

  constructor(waybill: IWaybill){
    super(waybill);
    this.transport = waybill.transport;
    this.factFuelConsumption = waybill.factFuelConsumption;
    this.normalFuelConsumption = waybill.normalFuelConsumption;
    this.earnings = waybill.earnings.toFixed(2);
    this.bonus = waybill.bonus.toFixed(2);
    this.weekend = waybill.weekend.toFixed(2);
    this.bonusSizeInPercentages = (waybill.bonus / waybill.earnings * 100).toFixed();
    this.weekendEqualsEarnings = waybill.earnings === waybill.weekend;
    this.operations = waybill.operations.map(x => new OperationView(x));
    this.calculations = waybill.calculations.map(x => new CalculationView(x));

    while(this.operations.length < this.operationsCount){
      this.operations.push(new OperationView());
    }

    while(this.calculations.length < this.calculationsCount){
      this.calculations.push(new CalculationView());
    }
  }
}