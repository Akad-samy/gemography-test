import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  page = 1;

  constructor(public datePipe: DatePipe, private http: HttpClient) {}

  // last X days

  lastXdays(x: number) {
    const date = new Date();
    date.setDate(date.getDate() - x);
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  // Pagination

  nextPageNum() {
    return (this.page = this.page + 1);
  }

  previousPageNum() {
    return (this.page = this.page - 1);
  }

  // get Starred Repos from Github Api

  getRepos() {
    return this.http.get(
      environment.github_api +
        this.lastXdays(30) +
        '&sort=stars&order=desc&page=' +
        this.page
    );
  }
}
