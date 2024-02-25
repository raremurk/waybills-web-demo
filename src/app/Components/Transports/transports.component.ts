import { CommonModule } from "@angular/common";
import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSortModule, MatSort } from "@angular/material/sort";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { Title } from "@angular/platform-browser";
import { ITransport } from "../../Interfaces/ITransport";
import { Transport } from "../../Models/transport";
import { DataService } from "../../Services/data.service";
import { ConfirmationDialogComponent } from "../ConfirmationDialog/confirmationDialog.component";
import { TransportsDialogComponent } from "./Dialog/transportsDialog.component";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSortModule,
    MatTableModule],
  templateUrl: './transports.component.html',
  styleUrls: ['./transports.component.scss']
})
export class TransportsComponent implements OnInit, AfterViewInit{
  title = 'Транспорт';     
  transportsRoute = 'transports';
  transport = new Transport();
  editableTransport = new Transport();
  dataSource = new MatTableDataSource<ITransport>();
  displayedColumns = ['name', 'code', 'coefficient', 'operations'];
  @ViewChild(MatSort) sort = new MatSort();

  constructor(private dialog: MatDialog, private titleService: Title, private dataService: DataService){ }
    
  ngOnInit(){
    this.titleService.setTitle(this.title);
    this.loadAllTransports();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }

  openDialog(){
    this.dialog.open(TransportsDialogComponent, { autoFocus: 'dialog', width: '428px'})
    .afterClosed().subscribe((result: Transport) => {
      if(result.id === 0){
        this.dataService.create(this.transportsRoute, result)
        .subscribe({next:(createdTransport: any) => this.dataSource.data = [...this.dataSource.data, createdTransport]});
      }
    });
  }

  openDeleteDialog(transport: Transport){
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, 
      { width: "400px", 
        data: { 
          action: 'Удаление транспорта',
          objectName: transport.name,
          objectCode: transport.code }
    });
    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if(confirm === true){
        this.deleteTransport(transport.id);
      }
    });
  }
    
  loadAllTransports(){
    this.dataService.getAllTransports().subscribe({next:(data: ITransport[]) => this.dataSource.data = data});    
  }

  editTransport(_transport: Transport){
    this.transport = _transport;
    this.editableTransport = { ..._transport}; 
  }

  updateTransport(){
    this.dataService.update(this.transportsRoute, this.editableTransport.id, this.editableTransport).subscribe(() => {
      Object.assign(this.transport, this.editableTransport); 
      this.cancel();
    });
  }  

  deleteTransport(id: number){
    this.dataService.delete(this.transportsRoute, id).subscribe(() => {
      var index = this.dataSource.data.findIndex(x => x.id === id);
      this.dataSource.data.splice(index, 1);
      this.dataSource.data = [...this.dataSource.data];
    });
  }

  cancel(){    
    this.editableTransport.id = 0;
  }
} 
