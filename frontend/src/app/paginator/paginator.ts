import { Component } from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import { Input, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  imports: [ MatPaginatorModule],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css',
})
export class PaginatorComponent {
  pageNumber = 0;
  pageSize: number = 10;
  @Input() totalDays: number = 0;

  @Output() pageChange = new EventEmitter<{pageNumber: number; pageSize: number}>();

  onPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.pageChange.emit({pageNumber: this.pageNumber, pageSize: this.pageSize});
  }
}

