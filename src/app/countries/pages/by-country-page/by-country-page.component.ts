import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {
    public countries: Country[] = [];

  //inyectamos el servicio countriesService
  constructor(private countriesService: CountriesService) {}
  //hay que suscribirse al Observable para recibir las notificaciones
  searchByCountry( term: string ):void {
    this.countriesService.searchCountry(  term )
    .subscribe( countries => {
      this.countries = countries;

    })



  }

}
