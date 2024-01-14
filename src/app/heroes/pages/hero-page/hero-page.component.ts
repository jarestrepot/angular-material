import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit {


  public hero?: Hero;

  constructor(
    private heroesService: HeroService,
    private activatedRoute: ActivatedRoute,
    private router: Router

  ){}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        delay( 100 ),
        // Cambia el string de datos
        switchMap( ({ id }) => this.heroesService.getHeroById( id ) )
      ).subscribe(
        {
          next: ( hero ) => {
            if( !hero ) this.router.navigate( ['/heroes/list'] );
            else this.hero = hero;
          },
          error: ( error ) => console.log( error )
        }
      )
  }


  goBack(): void {
    this.router.navigateByUrl('heroes/list')
  }
}
