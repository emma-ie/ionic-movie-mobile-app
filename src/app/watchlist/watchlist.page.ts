import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonCol, IonRow, IonButtons, IonBackButton, IonButton, IonIcon, IonText, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
import { Movie } from '../models/movie.model';
import { WatchlistService } from '../services/watchlist-service';
import { Router } from '@angular/router';
import { MyDataService } from '../services/my-data-service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.page.html',
  styleUrls: ['./watchlist.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid, IonRow, IonCol, IonButtons, IonBackButton, IonButton, IonIcon, IonText, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent]
})
export class WatchlistPage {

  movies: Movie[] = [];

  constructor(private watchlist: WatchlistService, private router: Router, private mds: MyDataService) {}

  async ionViewWillEnter() {
    try {
      this.movies = await this.watchlist.getWatchlist();
    }
    catch (error) {
      console.log("Error loading watchlist: ", error);
      this.movies = [];
    }
  }

  openMovie(movie: Movie) {
    this.mds.set("movieId", movie.id);
    console.log("Saved ID: ", movie.id);
    this.router.navigate(['/movie-details', movie.id]);
  }

  async toggleWatchlist(movie: Movie) {
    try {
      await this.watchlist.addRemoveWatchlist(movie);
      this.movies = await this.watchlist.getWatchlist();
    }
    catch (error) {
      console.log("Error updating watchlist: ", error);
    }
  }

  goHome() {
    this.router.navigate(['/']);
  }

  goNewMovies() {
    this.router.navigate(['/upcoming-movies']);
  }

  goToFavourites() {
    this.router.navigate(['/favourites']);
  }
}
