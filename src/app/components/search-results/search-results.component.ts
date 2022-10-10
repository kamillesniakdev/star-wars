import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent {

  page = this.search.getPage();
  results$ = this.search.results$;
  avaliableItems$ = this.search.getTotalResults();
  isLoading$ = this.search.getIsLoading();

  constructor(private search: SearchService, private cdr: ChangeDetectorRef) { }

  onPageChange(pageNumber: number) {
    this.search.setPage(pageNumber)
  }
}
