import { Pipe, PipeTransform } from "@angular/core";
import { IDriver } from "../Interfaces/iDriver";
import { Driver } from "../Models/driver";
  
@Pipe({
  name: "driverFullName",
  standalone: true
})
export class DriverFullNamePipe implements PipeTransform{
  transform(driver: Driver | IDriver){
    return driver ? ''.concat(driver.lastName, ` ${driver.firstName[0]}. `, `${driver.middleName[0]}.`) : '';
  }
}