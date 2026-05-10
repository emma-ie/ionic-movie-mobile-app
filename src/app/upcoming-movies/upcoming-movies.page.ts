import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardContent, IonIcon, IonButton, IonCardSubtitle, IonGrid, IonCol, IonRow, IonCardTitle, IonCardHeader, IonCard, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { Movie } from '../models/movie.model';
import { MyHttpService } from '../services/my-http-service';
import { MyDataService } from '../services/my-data-service';
import { Router } from '@angular/router';
import { FavouritesService } from '../services/favourites-service';
import { HttpOptions } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { WatchlistService } from '../services/watchlist-service';

@Component({
  selector: 'app-upcoming-movies',
  templateUrl: './upcoming-movies.page.html',
  styleUrls: ['./upcoming-movies.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCardContent, IonIcon, IonButton, IonCardSubtitle, IonGrid, IonRow, IonCol, IonCardTitle, IonCardHeader, IonCard, IonButtons, IonBackButton]
})
export class UpcomingMoviesPage implements OnInit {

  movies: Movie[] = [];
  favourites: Movie[] = [];
  watchlistMovies: Movie[] = [];

  constructor(private mds: MyDataService, private router: Router, private mhs: MyHttpService, private favService: FavouritesService, private watchlist: WatchlistService) { }

  ngOnInit() {
    this.loadUpcomingMovies()
  }

  async loadUpcomingMovies() {
    console.log("Loading upcoming movies");

    const options: HttpOptions = {
      url: "https://api.themoviedb.org/3/movie/upcoming?api_key=" + environment.apiKey
    }

    let result = await this.mhs.get(options);
    this.movies = result.data.results;
  }
  async loadFavourites() {
    this.favourites = await this.favService.getFavourites();
  }

  async toggleFavourite(movie: Movie) {
    await this.favService.addRemoveFavourites(movie);
    this.loadFavourites();
  }

  isFavourite(movie: Movie): boolean {
    return this.favService.isFavourite(movie);
  }

 async toggleWatchlist(movie: Movie) {
    await this.watchlist.addRemoveWatchlist(movie);
    this.loadWatchlist();
  }

  async loadWatchlist() {
    this.watchlistMovies = await this.watchlist.getWatchlist();
  }

  isInWatchlist(movie: Movie): boolean {
    return this.watchlist.isInWatchlist(movie);
  }

  goToFavourites() {
    this.router.navigate(['/favourites']);
  }

  goHome() {
    this.router.navigate(['/']);
  }

  goWatchlist(){
    this.router.navigate(['/watchlist']);
  }

  openMovie(movie: Movie) {
    this.mds.set("movieId", movie.id);
    console.log("Saved ID: ", movie.id);
    this.router.navigate(['/movie-details', movie.id]);
  }
}
