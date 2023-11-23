import {IDriver} from "../Interfaces/iDriver";

export class Driver{
  public id: number = 0;
  public firstName: string = '';
  public middleName: string = '';
  public lastName: string = '';
  public personnelNumber: number = 0;

  constructor(driver?: IDriver){
    if(driver){
      this.id = driver.id;
      this.firstName = driver.firstName;
      this.middleName = driver.middleName;
      this.lastName = driver.lastName;
      this.personnelNumber = driver.personnelNumber;
    }
  }

  get shortFullName(){
    let firstNameInitial = this.firstName ? ` ${this.firstName[0]}. ` : '';
    let middleNameInitial = this.middleName ? `${this.middleName[0]}.` : '';
    return ''.concat(this.lastName, firstNameInitial, middleNameInitial);
  }
}
