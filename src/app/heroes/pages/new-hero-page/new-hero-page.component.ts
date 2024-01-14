import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { HeroService } from '../../services/heroes.service';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'heroes-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  styles: [
  ]
})
export class NewHeroPageComponent implements OnInit{

  // ReactiveForm
  public heroForm = new FormGroup({
    id: new FormControl< string >(''),
    superhero: new FormControl< string >('' , { nonNullable: true }),
    publisher: new FormControl< Publisher >( Publisher.DCComics ),
    alter_ego: new FormControl< string >(''),
    first_appearance: new FormControl< string >(''),
    characters: new FormControl< string >(''),
    alt_img: new FormControl< string >(''),
  });


  public publishers = [
    { id: 'DC Comics', value: 'DC - Comics' },
    { id: 'Marvel Comics', value: 'Marvel - Comics' }
  ];

  constructor(
    private heroesService: HeroService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    public dialog: MatDialog,
  ){}


  ngOnInit(): void {

    if( !this.router.url.includes('edit') ) return;

    this.activeRouter.params
      .pipe(
        switchMap( ({ id }) => this.heroesService.getHeroById( id ) )
      ).subscribe( {
        next: (hero) => {
          if( !hero ) return this.router.navigate(['heroes/list']);
          // Agregar los valores del heroe, solo si los valores del FormControl son los mi
          this.heroForm.reset( hero );
          return;
        }
      })
  }

  get currentHero() :Hero {
    return this.heroForm.value as Hero;
  }


  onSubmit(): void {
    if( this.heroForm.invalid ) return;

    if( this.currentHero.id ){
      this.heroesService.updateHero( this.currentHero )
        .subscribe( {
          next: (hero) => {
            this.showSnackBar(`${ hero.superhero } updated!`)
          },
          error: (err) => { this.showSnackBar( err ) }
        });
      return;
    }

    this.heroesService.addHero( this.currentHero )
      .subscribe( {
        next: (hero) => {
          this.showSnackBar(`${ hero.superhero } created!`)
          this.router.navigate(['heroes/edit', hero.id ])
        }
      })
  }

  onDeleteHero(){
    if( !this.currentHero.id ) throw Error('Hero id is required');

    const dialogRef = this.dialog.open( ConfirmDialogComponent, {
      data:this.heroForm.value ,
    });

    // Cambiar la suscripcion por una
    dialogRef.afterClosed()
      .pipe(
        filter( ( result:boolean ) => result ),
        switchMap( () => this.heroesService.deleteHeroById(this.currentHero.id) ),
        filter( (wasDeleted: boolean) => wasDeleted ),
      )
      .subscribe( () => {
        // Solo llega si se cumple la condiciones del RxJS
        this.router.navigate(['/heroes/list']);
      })
  }

  showSnackBar( message: string ):void {
    this.snackbar.open( message, 'done', {
      duration: 2500
    } );
  }
}
