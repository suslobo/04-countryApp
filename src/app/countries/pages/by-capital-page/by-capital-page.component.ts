import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];

  //inyectamos el servicio countriesService
  constructor(private countriesService: CountriesService) {}
  //hay que suscribirse al Observable para recibir las notificaciones
  searchByCapital( term: string ):void {
    this.countriesService.searchCapital(  term )
    .subscribe( countries => {
      this.countries = countries;

    })



  }

}
