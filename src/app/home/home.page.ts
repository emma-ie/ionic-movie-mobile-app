import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonIcon, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButtons } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { MyDataService } from '../services/my-data-service';
import { HttpOptions } from '@capacitor/core';
import { FavouritesService } from '../services/favourites-service';
import { MyHttpService } from '../services/my-http-service';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie.model';
import { WatchlistService } from '../services/watchlist-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonIcon, IonButton, FormsModule, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, CommonModule, IonButtons],
})
export class HomePage {

  studentNum: string = "G00474347";
  keyword: string = "";
  movies: Movie[] = [];
  favourites: Movie[] = [];
  
  constructor(private mds: MyDataService, private router: Router, private mhs: MyHttpService, private favService: FavouritesService, private watchlist: WatchlistService) {
  }

  ngOnInit(){
  }

  ionViewWillEnter(){
    this.loadTrendingMovies();
  }

  async loadTrendingMovies(){
    console.log("Loading trending movies");

    const options: HttpOptions = {
      url: "https://api.themoviedb.org/3/trending/movie/day?api_key=" + environment.apiKey
    }

    let result = await this.mhs.get(options);
    this.movies = result.data.results;
  }

  async searchMovies() {
    if (!this.keyword){
      return;
    }

    await this.mds.set("keyword", this.keyword);
    this.router.navigate(['/movies']);
  }

  async loadFavourites(){
    this.favourites = await this.favService.getFavourites();
  }

  async toggleFavourite(movie: Movie){
    await this.favService.addRemoveFavourites(movie);
    this.loadFavourites();
  }

  isFavourite(movie: Movie): boolean{
    return this.favService.isFavourite(movie);
  }

  async toggleWatchlist(movie: Movie){
    await this.watchlist.addRemoveWatchlist(movie);
  }

  isInWatchlist(movie: Movie): boolean{
    return this.watchlist.isInWatchlist(movie);
  }

  goToFavourites(){
    this.router.navigate(['/favourites']);
  }

  goNewMovies(){
    this.router.navigate(['/upcoming-movies']);
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
