
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  //nueva propiedad
  private apiUrl: string = 'https://restcountries.com/v3.1'

  constructor(private http: HttpClient) { }

  //nuevo método
  searchCapital( term: string ): Observable<Country[]> {
    const url= `${ this.apiUrl }/capital/${ term }`
    return this.http.get<Country[]>( url);
    //hay que suscribirse para que haga la petición



  }

}
