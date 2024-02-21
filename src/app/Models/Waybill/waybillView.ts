import { ITransport } from "../../Interfaces/ITransport";
import { IWaybill } from "../../Interfaces/iWaybill";
import { CalculationView } from "../Calculation/calculationView";
import { OperationView } from "../Operation/operationView";
import { Waybill } from "./waybill";

export class WaybillView extends Waybill{
  public factFuelConsumption: string = ''; 
  public normalFuelConsumption: string = ''; 
  public transport: ITransport | null = null;
  public earnings: string = '';

  public operations: OperationView[] = [];
  public calculations: CalculationView[] = [];

  constructor(waybill?: IWaybill){
    super(waybill);
    if(waybill){
      this.factFuelConsumption = waybill.factFuelConsumption.toString();
      this.normalFuelConsumption = waybill.normalFuelConsumption.toString();
      this.transport = waybill.transport;
      this.earnings = waybill.earnings.toFixed(2);
      this.operations = waybill.operations.map(x => new OperationView(x));
      this.calculations = waybill.calculations.map(x => new CalculationView(x));
    }
    while(this.operations.length < this.operationsCount){
      this.operations.push(new OperationView());
    }

    while(this.calculations.length < this.calculationsCount){
      this.calculations.push(new CalculationView());
    }
  }
}