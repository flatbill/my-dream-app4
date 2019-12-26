// view.repos.component.ts has a confusing name.
// Is it really a view component?
//
// I mean,  view-repos is the parent of repo-list
// and repo-list has the html.
// view-repos here sucks in the github data
// and passes github data to the repo-list 
// repo-list is a dumb component.
// let's call it the presentation component.
// component structure:::::::
// app.component  contains html <app-repo-list>
//   view-repos   contains html <app-view-repos>
//      repo-list contains html   {{item data}}

import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-view-repos',
  templateUrl: './view-repos.component.html',
  styleUrls: ['./view-repos.component.scss']
})
export class ViewReposComponent implements OnInit {
  repoList: Observable<any[]>;
  constructor(http: HttpClient) {
    const repoPath = 'https://api.github.com/search/repositories?q=angular' ;
    this.repoList = http.get<{items: any[]}>(repoPath)
      .pipe(
         map(x => x.items)
      )
  }
// github api gives us JSON that has:
// "items": [ nice array of items ]
// so the magic above transforms json items into
// repoList

  ngOnInit() {
      // alert(JSON.stringify(this.repoList)) weird json for the http request

  }

}
