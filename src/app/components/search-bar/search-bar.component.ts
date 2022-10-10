import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {

  constructor(private search: SearchService) { }

  onSearchPhraseChange(event: Event): void {
    this.search.setQuery({phrase: (event.target as HTMLInputElement).value, page: 1});
  }
}
