
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  //nueva propiedad
  private apiUrl: string = 'https://restcountries.com/v3.1'
  // cacheStore: any;

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [ ]},
    byCountries: { term: '', countries: [ ]},
    byRegion: { region: '', countries: [ ]}

  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveTolocalStorage() {
    localStorage.setItem( 'cacheStore', JSON.stringify( this.cacheStore ));
  }

  private loadFromLocalStorage() {
    if ( !localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse( localStorage.getItem('cacheStore')! );

  }

  private getCountriesRequest( url: string ): Observable<Country[]> {
    return this.http.get<Country[]>( url )
    .pipe(
      catchError( erorr => of([]) ),
      // delay( 2000 ),
    );
  }

  searchCountryByAlphaCode( code: string ): Observable<Country | null> {

    const url = `${ this.apiUrl }/alpha/${ code }`;

    return this.http.get<Country[]>( url )
      .pipe(
        map( countries => countries.length > 0 ? countries[0]: null ),
        catchError( () => of(null) )
      );
  }


  //nuevo método
   //hay que suscribirse para que haga la petición
   //pipe es un método para especificar los operadores rxjs
  searchCapital( term: string ): Observable<Country[]> {
    const url= `${ this.apiUrl }/capital/${ term }`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( ( countries => this.cacheStore.byCapital = { term, countries })),
        tap( () => this.saveTolocalStorage()),

      );
  }
  searchCountry( term: string ): Observable<Country[]> {
    const url= `${ this.apiUrl }/name/${ term }`
    return this.http.get<Country[]>( url)
      .pipe(
        tap( ( countries => this.cacheStore.byCountries = { term, countries })),
        tap( () => this.saveTolocalStorage()),
      );

  }
  searchRegion( region: Region ): Observable<Country[]> {

    const url = `${ this.apiUrl }/region/${ region }`;
    return this.http.get<Country[]>( url )
    .pipe(
      tap( ( countries => this.cacheStore.byRegion = { region, countries })),
      tap( () => this.saveTolocalStorage()),
    );

  }

}
