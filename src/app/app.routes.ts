import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'movies',
    loadComponent: () => import('./movies/movies.page').then(m => m.MoviesPage)
  },
  {
    path: 'favourites',
    loadComponent: () => import('./favourites/favourites.page').then(m => m.FavouritesPage)
  },
  {
    path: 'movie-details/:id',
    loadComponent: () => import('./movie-details/movie-details.page').then(m => m.MovieDetailsPage)
  },
  {
    path: 'person-details/:id',
    loadComponent: () => import('./person-details/person-details.page').then(m => m.PersonDetailsPage)
  },
];
