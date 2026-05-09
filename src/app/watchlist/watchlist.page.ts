import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon, IonText, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
import { Movie } from '../models/movie.model';
import { WatchlistService } from '../services/watchlist-service';
import { Router } from '@angular/router';
import { MyDataService } from '../services/my-data-service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.page.html',
  styleUrls: ['./watchlist.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonButton, IonIcon, IonText, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent]
})
export class WatchlistPage implements OnInit {

  movies: Movie[] = [];

  constructor(private watchlist: WatchlistService, private router: Router, private mds: MyDataService) { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.movies = await this.watchlist.getWatchlist();
  }

  openMovie(movie: Movie) {
    this.mds.set("movieId", movie.id);
    console.log("Saved ID: ", movie.id);
    this.router.navigate(['/movie-details', movie.id]);
  }

  async toggleWatchlist(movie: Movie){
    await this.watchlist.addRemoveWatchlist(movie);
    this.movies = await this.watchlist.getWatchlist();
  }

  goHome(){
    this.router.navigate(['/']);
  }

  goNewMovies(){
    this.router.navigate(['/upcoming-movies']);
  }

  goToFavourites() {
    this.router.navigate(['/favourites']);
  }
}
