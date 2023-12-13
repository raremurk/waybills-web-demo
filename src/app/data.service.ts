import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Waybill } from "./CreationModels/waybill";
import { ICostPriceReport } from "./Interfaces/iCostPriceReport";
import { IDriver } from "./Interfaces/iDriver";
import { IShortWaybill } from "./Interfaces/iShortWaybill";
import { IWaybill } from "./Interfaces/iWaybill";
 
@Injectable()
export class DataService {    
	url = 'https://localhost:7150/api/';
	driversRoute = 'drivers';
	waybillsRoute = 'waybills';
	reportsRoute = 'reports';
	costPriceReportRoute = 'reports/costCode';

	constructor(private http: HttpClient) { }

	getCostPriceReport = (year: number, month: number) => 
		this.http.get<ICostPriceReport[]>(this.url + this.costPriceReportRoute + '/' + year + '/' + month);
 
	getAllDrivers = () => this.http.get<IDriver[]>(this.url + this.driversRoute);

	getWaybills = (year: number, month: number, driverId: number) => 
		this.http.get<IShortWaybill[]>(this.url + this.waybillsRoute + '/' + year + '/' + month + '/' + driverId);
	getWaybill = (id: number) => this.http.get<IWaybill>(this.url + this.waybillsRoute + '/' + id);
	createWaybill = (waybill: Waybill) => this.http.post(this.url + this.waybillsRoute, waybill);
	updateWaybill = (id: number, waybill: Waybill) => this.http.put(this.url + this.waybillsRoute + '/' + id, waybill);
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
