import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MovieDetailsComponent} from './components/movie-details/movie-details.component';
import {HomeComponent} from './components/home/home.component';
import {LoandingComponent} from './components/utils/loanding/loanding.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'spiner', component: LoandingComponent},
  {path: 'movie-details/:id', component: MovieDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
