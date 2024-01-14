import { Component } from '@angular/core';
import { HeroService } from '../../services/heroes.service';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { Observable, of } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  constructor( private herosService:HeroService ){}

  public searchInput = new FormControl('');
  public filterHeroes: Observable<Hero[]> = new Observable();
  public selectedHero?: Hero;


  searchHero(){
    const value: string = this.searchInput.value || '';
    if( value.length > 0 ){
      this.filterHeroes = this.herosService.getSuggestions( value )
    }else {
      this.filterHeroes = of([]);
    }
  }

  onSelectedOption( { option }:MatAutocompleteSelectedEvent ) :void {
    console.log( option )
    if( !option.value ){
      this.selectedHero = undefined;
    }else{
      this.selectedHero = option.value;
    }

    this.inputValue( this.selectedHero );
  }

  inputValue( nameHero: Hero | undefined ){
    nameHero ? this.searchInput.setValue( nameHero.superhero ) : this.searchInput.setValue( '' );
  }


}
