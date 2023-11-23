import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule, MatPaginator } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { Title } from "@angular/platform-browser";
import { DataService } from "../../data.service";
import { Driver } from "../../CreationModels/driver";
import { DriversDialogComponent } from "./Dialog/driversDialog.component";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule],
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss'],
  providers: [DataService]
})
export class DriversComponent implements OnInit{ 
  title = 'Водители';
  driversRoute = 'drivers'; 
  driver: Driver = new Driver();
  editableDriver: Driver= new Driver(); 

  displayedFilterColumns: string[] = ['lastNameFilter', 'firstNameFilter', 'middleNameFilter', 'personnelNumberFilter'];
  displayedColumns: string[] = ['lastName', 'firstName', 'middleName', 'personnelNumber', 'operations'];
  
  lastNameFilter = { label: 'Фильтр по фамилии', value: '' , columnDef: 'lastNameFilter'};
  firstNameFilter = { label: 'Фильтр по имени', value: '', columnDef: 'firstNameFilter' };
  middleNameFilter = { label: 'Фильтр по отчеству', value: '' , columnDef: 'middleNameFilter'};
  personnelNumberFilter = { label: 'Фильтр по табельному номеру', value: '', columnDef: 'personnelNumberFilter' };
  filters = [this.lastNameFilter, this.firstNameFilter, this.middleNameFilter, this.personnelNumberFilter];

  dataSource: MatTableDataSource<Driver> = new MatTableDataSource();
  
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator= <MatPaginator>{};

  constructor(public dialog: MatDialog, private titleService: Title, private dataService: DataService){ }
    
  ngOnInit(){  
    this.titleService.setTitle(this.title); 
    this.loadAllDrivers();  
  }
 
  openDialog() {
    this.dialog.open(DriversDialogComponent, { autoFocus: 'dialog', width: '478px' }).afterClosed().subscribe((result: Driver) => {
      if(result.id === 0) {
        this.dataService.create(this.driversRoute, result)
          .subscribe({next:(createdDriver: any) => this.dataSource.data = [...this.dataSource.data, createdDriver]});
      }
    });
  }

  loadAllDrivers() {
    this.dataService.getAll(this.driversRoute).subscribe({next:(data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.initializeTableDataSource();  
      this.applyFilter();    
    }});    
  }

  editDriver(_driver: Driver) {
    this.driver = _driver;
    Object.assign(this.editableDriver, _driver);    
  }

  updateDriver() {
    this.dataService.update(this.driversRoute, this.editableDriver.id, this.editableDriver).subscribe(() => {
      Object.assign(this.driver, this.editableDriver); 
      this.cancel();
    });
  }

  deleteDriver(id: number) {
    this.dataService.delete(this.driversRoute, id).subscribe(() => {
      var index = this.dataSource.data.findIndex(x => x.id == id);
      this.dataSource.data.splice(index, 1);
      this.dataSource.data = [...this.dataSource.data];
    });
  }

  cancel() {
    this.editableDriver.id = 0;
  }

  applyFilter() {
    this.dataSource.filter = [
      this.lastNameFilter.value.trim().toUpperCase(), 
      this.firstNameFilter.value.trim().toUpperCase(),  
      this.middleNameFilter.value.trim().toUpperCase(), 
      this.personnelNumberFilter.value.trim(),
    ].join('$q$');
   
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } 

  clear(filter: { label: string, value : string }) {
    filter.value = '';
    this.applyFilter();
  }

  initializeTableDataSource() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.dataSource.filterPredicate = (data: Driver, filter: string): boolean => {
      let filters: string[] = filter.split('$q$');
      return data.lastName.toUpperCase().includes(filters[0])
        && data.firstName.toUpperCase().includes(filters[1])
        && data.middleName.toUpperCase().includes(filters[2])
        && data.personnelNumber.toString().includes(filters[3]);
    };
  }
} 
