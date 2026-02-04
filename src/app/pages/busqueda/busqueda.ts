import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { SearchApi, SearchFilters } from '../../services/search';
import { SiteItem } from '../../data/site-index';

@Component({
  selector: 'app-busqueda',
  imports: [RouterModule, FormsModule, NgFor, NgIf, AsyncPipe],
  templateUrl: './busqueda.html',
  styleUrl: './busqueda.css',
})
export class Busqueda {

  query: string = '';

  filters: SearchFilters = {
    type: 'todos',
    section: 'todas'
  };

  sections: string[] = [];

  results$!: Observable<SiteItem[]>;

  constructor(private route: ActivatedRoute, private api: SearchApi) {

    this.sections = this.api.getSeccions();

    this.route.queryParamMap.subscribe(params => {
      const q = params.get('q') ?? '';
      this.query = q;
      this.doSearch();
    });
  }

  doSearch() {
    this.results$ = this.api.search(this.query, this.filters);
  }

  clear(): void {
    this.query = '';
    this.filters = {
      type: 'todos',
      section: 'todas'
    };
    this.doSearch();
  }
}
