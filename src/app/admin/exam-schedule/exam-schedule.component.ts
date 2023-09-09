import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

export const user : UserData[] = [
  {
    "id": "1",
    "name": "Mathematics",
    "progress": "Class 1",
    "fruit": 'dsklhls'
  },
  {
    "id": "2",
    "name": "Mathematics",
    "progress": "Class 1",
    "fruit": 'dsklhls'
  },
  {
    "id": "3",
    "name": "Mathematics",
    "progress": "Class 1",
    "fruit": 'dsklhls'
  },
  {
    "id": "4",
    "name": "Mathematics",
    "progress": "Class 1",
    "fruit": 'dsklhls'
  },
  {
    "id": "1",
    "name": "Mathematics",
    "progress": "Class 1",
    "fruit": 'dsklhls'
  },
  {
    "id": "2",
    "name": "Mathematics",
    "progress": "Class 1",
    "fruit": 'dsklhls'
  },
  {
    "id": "3",
    "name": "Mathematics",
    "progress": "Class 1",
    "fruit": 'dsklhls'
  },
  {
    "id": "4",
    "name": "Mathematics",
    "progress": "Class 1",
    "fruit": 'dsklhls'
  },  {
    "id": "1",
    "name": "Mathematics",
    "progress": "Class 1",
    "fruit": 'dsklhls'
  },
  {
    "id": "2",
    "name": "Mathematics",
    "progress": "Class 1",
    "fruit": 'dsklhls'
  },
  {
    "id": "3",
    "name": "Mathematics",
    "progress": "Class 1",
    "fruit": 'dsklhls'
  },
  {
    "id": "4",
    "name": "Mathematics",
    "progress": "Class 1",
    "fruit": 'dsklhls'
  },  {
    "id": "1",
    "name": "Mathematics",
    "progress": "Class 1",
    "fruit": 'dsklhls'
  },
  {
    "id": "2",
    "name": "Mathematics",
    "progress": "Class 1",
    "fruit": 'dsklhls'
  },
  {
    "id": "3",
    "name": "Mathematics",
    "progress": "Class 1",
    "fruit": 'dsklhls'
  },
  {
    "id": "4",
    "name": "Mathematics",
    "progress": "Class 1",
    "fruit": 'dsklhls'
  },  {
    "id": "1",
    "name": "Mathematics",
    "progress": "Class 1",
    "fruit": 'dsklhls'
  },
  {
    "id": "2",
    "name": "Ahmed",
    "progress": "Class 1",
    "fruit": 'dsklhls'
  },
  {
    "id": "9",
    "name": "Mathematics",
    "progress": "Class 10",
    "fruit": 'dsklhls'
  },
  {
    "id": "4",
    "name": "Mathematics",
    "progress": "Class 1",
    "fruit": 'dsklhls'
  },
  
]

@Component({
  selector: 'app-exam-schedule',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './exam-schedule.component.html',
  styleUrls: ['./exam-schedule.component.scss']
})
export class ExamScheduleComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(user);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}