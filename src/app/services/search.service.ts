import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, map, tap } from 'rxjs';
import { Person, PersonSearchData, QueryParams } from '../interfaces/person-search-data.interface';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private query$ = new BehaviorSubject<QueryParams>({phrase: '', page: 1});
  private page$ = this.query$.pipe(map((query) => query.page));
  private totalResults$ = new BehaviorSubject<number>(0);
  private isLoading$ = new BehaviorSubject<boolean>(false);

  results$: Observable<Person[]> = this.query$.pipe(
    tap(() => this.isLoading$.next(true)),
    switchMap((queryParams: QueryParams) => this.getResults(queryParams)
      .pipe(
        tap((response) => this.totalResults$.next(response.count)),
        map((response: PersonSearchData) => response.results),
        tap(() => this.isLoading$.next(false)),
      )),
    );

  constructor(private http: HttpClient) { this.isLoading$.pipe(tap(console.log)).subscribe()}

  getResults({phrase: query, page}: QueryParams) {
    return this.http.get<PersonSearchData>(`https://swapi.dev/api/people/?search=${query}&page=${page}`)
  }

  setPage(page: number): void {
    this.query$.next({...this.query$.value, page});
  }

  setQuery(queryParams: QueryParams): void {
    this.query$.next(queryParams);
  }

  getPage(): Observable<number> {
    return this.page$;
  }

  getQuery(): Observable<QueryParams> {
    return this.query$;
  }

  getTotalResults(): Observable<number> {
    return this.totalResults$.asObservable();
  }

  getIsLoading(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }
}
