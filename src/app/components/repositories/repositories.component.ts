import { RepositoryService } from '../../services/repository.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.css']
})
export class RepositoriesComponent implements OnInit {

  repos: any[];
  loader: boolean = true;

  constructor(private service: RepositoryService, public datePipe: DatePipe) {}

  ngOnInit() {
    this.getData();
  }

  // Pagination

  nextPage() {
    this.service.nextPageNum();
    this.getData();
  }

  previousPage() {
    this.service.previousPageNum();
    this.getData();
  }

  // get Data from Api

  getData() {
    this.loader = true;
    window.scrollTo(0, 0);
    this.repos = [];
    this.service.getRepos().subscribe((data: any[]) => {
      this.repos = data['items'];
      this.loader = false;
    });
  }
}
