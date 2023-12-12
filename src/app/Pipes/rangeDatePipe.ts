import { Pipe, PipeTransform } from "@angular/core";
import { formatDate } from "@angular/common";
import '@angular/common/locales/global/ru';
  
@Pipe({
  name: "rangeDate",
  standalone: true
})
export class RangeDatePipe implements PipeTransform{
  transform = (dateValue: string | Date, daysValue: string | number) => {
    let endOfRange = '';
    let date = new Date(dateValue);
    let days = Number(daysValue);
    if(days > 1){
      let startDay = date.getDate();
      let lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      if(startDay < lastDayOfMonth){
        let endDay = startDay + days - 1;
        endOfRange = endDay > lastDayOfMonth ? `—${lastDayOfMonth}` : `—${endDay}`;
      }
    }
    return formatDate(date, `d${endOfRange} MMMM yyyy`, 'ru');
  }
}