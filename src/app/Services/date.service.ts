import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DateService{
  readonly years: number[];
  readonly months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  private _year: number;
  private _month: number;
  dateValueChange = new Subject<{year: number, month: number}>();

  constructor(){
    let date = new Date();
    this.years = Array.from({length: date.getFullYear() - 2022}, (_, i) => i + 2023);
    if(date.getDate() < 16)
    {
      date.setDate(0);
    }
    this._year = 2024;
    this._month = 4;
  }

  public get year(){
    return this._year;
  }

  public set year(year: number){
    this._year = year;
    this.dateValueChange.next({year: this._year, month: this._month});
  }

  public get month(){
    return this._month;
  }

  public set month(month: number){
    this._month = month;
    this.dateValueChange.next({year: this._year, month: this._month});
  }
}