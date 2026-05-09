import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardContent, IonIcon, IonButton, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard } from '@ionic/angular/standalone';
import { Movie } from '../models/movie.model';
import { MyHttpService } from '../services/my-http-service';
import { MyDataService } from '../services/my-data-service';
import { Router } from '@angular/router';
import { FavouritesService } from '../services/favourites-service';
import { HttpOptions } from '@capacitor/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upcoming-movies',
  templateUrl: './upcoming-movies.page.html',
  styleUrls: ['./upcoming-movies.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCardContent, IonIcon, IonButton, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard]
})
export class UpcomingMoviesPage implements OnInit {

  movies: Movie[] = [];
  favourites: Movie[] = [];

  constructor(private mds: MyDataService, private router: Router, private mhs: MyHttpService, private favService: FavouritesService) { }

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

  goToFavourites() {
    this.router.navigate(['/favourites']);
  }

  openMovie(movie: Movie) {
    this.mds.set("movieId", movie.id);
    console.log("Saved ID: ", movie.id);
    this.router.navigate(['/movie-details', movie.id]);
  }
}
