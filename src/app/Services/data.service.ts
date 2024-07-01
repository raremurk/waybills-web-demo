import { formatDate } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IDetailedDriverFuelMonthTotal } from "../Interfaces/Fuel/Drivers/iDetailedDriverFuelMonthTotal";
import { IDetailedTransportFuelMonthTotal } from "../Interfaces/Fuel/Transports/iDetailedTransportFuelMonthTotal";
import { IFuelWaybill } from "../Interfaces/Fuel/iFuelWaybill";
import { IOmnicommFuel } from "../Interfaces/IOmnicommFuel";
import { ITransport } from "../Interfaces/ITransport";
import { IDetailedEntityMonthTotal } from "../Interfaces/MonthTotal/iDetailedEntityMonthTotal";
import { ICostPriceReport } from "../Interfaces/iCostPriceReport";
import { IDriver } from "../Interfaces/iDriver";
import { IShortWaybill } from "../Interfaces/iShortWaybill";
import { IWaybill } from "../Interfaces/iWaybill";
import { WaybillCreation } from "../Models/Waybill/waybillCreation";
import { Driver } from "../Models/driver";
import { Transport } from "../Models/transport";

@Injectable({ providedIn: 'root' })
export class DataService {
	url = 'https://localhost:7150/api';

	waybillsRoute = `${this.url}/waybills`;	
	reportsRoute = `${this.url}/reports`;
	driversRoute = `${this.url}/drivers`;
	transportsRoute = `${this.url}/transports`;
	excelRoute = `${this.url}/excel`;

	constructor(private http: HttpClient) { }

	getFuelWaybills = (year: number, month: number, driverId: number, transportId: number) => 
		this.http.get<IFuelWaybill[]>(`${this.waybillsRoute}/fuelOnly/${year}/${month}/${driverId}/${transportId}`);
	getAllWaybills = (year: number, month: number, driverId: number) =>
		this.http.get<IShortWaybill[]>(`${this.waybillsRoute}/${year}/${month}/${driverId}`);
	createWaybill = (waybill: WaybillCreation) =>
		this.http.post<IWaybill>(this.waybillsRoute, waybill);
	getWaybill = (id: number) =>
		this.http.get<IWaybill>(`${this.waybillsRoute}/${id}`);
	updateWaybill = (id: number, waybill: WaybillCreation) =>
		this.http.put<IWaybill>(`${this.waybillsRoute}/${id}`, waybill);
	deleteWaybill = (id: number) =>
		this.http.delete(`${this.waybillsRoute}/${id}`);

	getAllDrivers = () =>
		this.http.get<IDriver[]>(this.driversRoute);
	createDriver = (driver: Driver) =>
		this.http.post<IDriver>(this.driversRoute, driver);
	getDriver = (id: number) =>
		this.http.get<IDriver>(`${this.driversRoute}/${id}`);
	updateDriver = (id: number, driver: Driver) =>
		this.http.put<IDriver>(`${this.driversRoute}/${id}`, driver);
	deleteDriver = (id: number) =>
		this.http.delete(`${this.driversRoute}/${id}`);

	getAllTransports = () =>
		this.http.get<ITransport[]>(this.transportsRoute);
	createTransport = (transport: Transport) =>
		this.http.post<ITransport>(this.transportsRoute, transport);
	getTransport = (id: number) =>
		this.http.get<ITransport>(`${this.transportsRoute}/${id}`);
	updateTransport = (id: number, transport: Transport) =>
		this.http.put<ITransport>(`${this.transportsRoute}/${id}`, transport);
	deleteTransport = (id: number) =>
		this.http.delete(`${this.transportsRoute}/${id}`);


	getMonthTotals = (year: number, month: number, entity: string) => 
		this.http.get<IDetailedEntityMonthTotal[]>(`${this.reportsRoute}/monthTotal/${year}/${month}/${entity}`);
	getCostPriceReport = (year: number, month: number, price: number) => 
		this.http.get<ICostPriceReport[]>(`${this.reportsRoute}/costCode/${year}/${month}/${price}`);
	getDriversFuelMonthTotal = (year: number, month: number) => 
		this.http.get<IDetailedDriverFuelMonthTotal[]>(`${this.reportsRoute}/driversFuelMonthTotal/${year}/${month}`);
	getTransportsFuelMonthTotal = (year: number, month: number) => 
		this.http.get<IDetailedTransportFuelMonthTotal[]>(`${this.reportsRoute}/transportsFuelMonthTotal/${year}/${month}`);
	getOmnicommFuel = (date: Date, omnicommId: number) => 
		this.http.get<IOmnicommFuel>(`${this.reportsRoute}/omnicommFuel/${formatDate(date, 'yyyy-MM-dd', 'en-US')}/${omnicommId}`);


	getShortWaybillsExcelLink = (year: number, month: number) =>
		`${this.excelRoute}/waybills/short/${year}/${month}`;
	getDetailedWaybillsExcelLink = (year: number, month: number, driverId: number) =>
		`${this.excelRoute}/waybills/detailed/${year}/${month}/${driverId}`;
	getMonthTotalExcelLink = (year: number, month: number) =>
		`${this.excelRoute}/monthTotal/${year}/${month}`;
	getCostPriceReportExcelLink = (year: number, month: number, price: number) =>
		`${this.excelRoute}/costCode/${year}/${month}/${price}`;
}
