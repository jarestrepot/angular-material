import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './shared/pages/not-found-page/not-found-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { LoginGuard } from './auth/guards/login.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( module => module.AuthModule ),
    // canActivate: [ LoginGuard ],
  },
  {
    path: 'heroes',
    canActivate: [ AuthGuard ],
    canMatch: [ AuthGuard ],
    loadChildren: () => import('./heroes/heroes.module').then(module => module.HeroesModule )
  },
  {
    path: '404',
    component: NotFoundPageComponent
  },
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
