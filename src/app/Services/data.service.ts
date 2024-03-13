import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ICostPriceReport } from "../Interfaces/iCostPriceReport";
import { IDriver } from "../Interfaces/iDriver";
import { IShortWaybill } from "../Interfaces/iShortWaybill";
import { ITransport } from "../Interfaces/ITransport";
import { IWaybill } from "../Interfaces/iWaybill";
import { IDetailedEntityMonthTotal } from "../Interfaces/MonthTotal/iDetailedEntityMonthTotal";
import { WaybillCreation } from "../Models/Waybill/waybillCreation";
 
@Injectable({ providedIn: 'root' })
export class DataService {    
	url = 'https://localhost:7150/api/';
	driversRoute = 'drivers';
	transportsRoute = 'transports';
	waybillsRoute = 'waybills';
	reportsRoute = 'reports';
	costPriceReportRoute = 'reports/costCode';
	monthTotalRoute = 'reports/monthTotal';

	constructor(private http: HttpClient) { }

	getCostPriceReport = (year: number, month: number, price: number) => 
		this.http.get<ICostPriceReport[]>(this.url + this.costPriceReportRoute + '/' + year + '/' + month + '/' + price);
	getMonthTotals = (year: number, month: number, entity: string) => 
		this.http.get<IDetailedEntityMonthTotal[]>(this.url + this.monthTotalRoute + '/' + year + '/' + month + '/' + entity);
 
	getAllDrivers = () => this.http.get<IDriver[]>(this.url + this.driversRoute);
	getAllTransports = () => this.http.get<ITransport[]>(this.url + this.transportsRoute);
	getAllWaybills = (year: number, month: number, driverId: number) => 
		this.http.get<IShortWaybill[]>(this.url + this.waybillsRoute + '/' + year + '/' + month + '/' + driverId);

	getWaybill = (id: number) => this.http.get<IWaybill>(this.url + this.waybillsRoute + '/' + id);
	createWaybill = (waybill: WaybillCreation) => this.http.post<IWaybill>(this.url + this.waybillsRoute, waybill);
	updateWaybill = (id: number, waybill: WaybillCreation) => this.http.put<IWaybill>(this.url + this.waybillsRoute + '/' + id, waybill);
	deleteWaybill = (id: number) => this.http.delete(this.url + this.waybillsRoute + '/' + id);

	getAll(route: string){
		return this.http.get(this.url + route);
	}
     
	getOne(route: string, id: any){
		return this.http.get(this.url + route + '/' + id);
	}
     
	create(route: string, object: any){
		return this.http.post(this.url + route, object);
	}

	delete(route: string, id: any){
		return this.http.delete(this.url + route + '/' + id);
	}

	update(route: string, id: any, object: any){
		return this.http.put(this.url + route + '/' + id, object);
	}
}
