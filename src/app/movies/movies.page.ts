import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardSubtitle, IonGrid, IonCol, IonRow, IonCardContent, IonCard, IonCardHeader, IonCardTitle, IonButton, IonIcon, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data-service';
import { MyHttpService } from '../services/my-http-service';
import { HttpOptions } from '@capacitor/core';
import { FavouritesService } from '../services/favourites-service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie.model';
import { WatchlistService } from '../services/watchlist-service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCardSubtitle, IonGrid, IonCol, IonRow, IonCardContent, IonCard, IonCardHeader, IonCardTitle, IonButton, IonIcon, IonButtons, IonBackButton]
})
export class MoviesPage implements OnInit {

  keyword: string = "";
  movies: Movie[] = [];
  favourites: Movie[] = [];

  constructor(private mds: MyDataService, private mhs: MyHttpService, private favService: FavouritesService, private router: Router, private watchlist: WatchlistService) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getKeyword();
  }

  async getKeyword() {
    this.keyword = await this.mds.get("keyword");

    const options: HttpOptions = {
      url: "https://api.themoviedb.org/3/search/movie?query=" + this.keyword + "&api_key=" + environment.apiKey
    }

    let result = await this.mhs.get(options);
    if (result) {
      this.movies = result.data.results;
    } else {
      this.movies = [];
    }
  }

  async toggleFavourite(movie: Movie) {
    await this.favService.addRemoveFavourites(movie);

  }

  isFavourite(movie: Movie): boolean {
    return this.favService.isFavourite(movie);
  }

  async toggleWatchlist(movie: Movie) {
    await this.watchlist.addRemoveWatchlist(movie);
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

  goNewMovies() {
    this.router.navigate(['/upcoming-movies']);
  }

  goWatchlist() {
    this.router.navigate(['/watchlist']);
  }

  openMovie(movie: Movie) {
    this.mds.set("movieId", movie.id);
    console.log("Saved ID: ", movie.id);
    this.router.navigate(['/movie-details', movie.id]);
  }
}
