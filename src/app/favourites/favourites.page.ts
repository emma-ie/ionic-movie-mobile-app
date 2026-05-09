import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon, IonText } from '@ionic/angular/standalone';
import { FavouritesService } from '../services/favourites-service';
import { Router } from '@angular/router';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon, IonText]
})
export class FavouritesPage implements OnInit {

  favourites: Movie[] = [];

  constructor(private favService: FavouritesService, private router: Router) {
   }

  ngOnInit() {
    this.loadFavourites();
  }

  async loadFavourites(){
    await this.favService.getFavourites();

    this.favourites = this.favService.favourites;
  }

  async toggleFavourite(movie: Movie){
    await this.favService.addRemoveFavourites(movie);
    this.loadFavourites();
  }

  goHome(){
    this.router.navigate(['/']);
  }

  openMovie(movie: Movie){
    this.router.navigate(['/movie-details', movie.id]);
  }

  goNewMovies(){
    this.router.navigate(['/upcoming-movies']);
  }
}
