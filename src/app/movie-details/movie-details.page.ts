import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonLabel, IonList, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { MyDataService } from '../services/my-data-service';
import { MyHttpService } from '../services/my-http-service';
import { FavouritesService } from '../services/favourites-service';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie.model';
import { Person } from '../models/person.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonLabel, IonList, IonButtons, IonBackButton]
})
export class MovieDetailsPage implements OnInit {

  movie?: Movie;
  cast: Person[] = [];
  crew: Person[] = [];
  favourites: Movie[] = [];

  constructor(private router: Router, private mds: MyDataService, private mhs: MyHttpService, private favService: FavouritesService) {
  }

  ngOnInit() {
    console.log("ngOnInit in movie details");
    this.loadMovie();
  }

  ionViewWillEnter() {
  }

  async loadMovie() {
    console.log("loadMovie called");

    let id = await this.mds.get("movieId");

    console.log("Movie ID:", id);

    const movieOptions = {
      url: "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + environment.apiKey
    };

    let movieRes = await this.mhs.get(movieOptions);

    if (movieRes && movieRes.data) {
      this.movie = movieRes.data;
    }

    const creditOptions = {
      url: "https://api.themoviedb.org/3/movie/" + id + "/credits?api_key=" + environment.apiKey
    };

    let creditRes = await this.mhs.get(creditOptions);

    if (creditRes && creditRes.data) {
      this.cast = creditRes.data.cast;
      this.crew = creditRes.data.crew;
    } else {
      this.cast = [];
      this.crew = [];
    }
  }

  openPerson(person: Person) {
    console.log("open person called");
    this.mds.set("personId", person.id);
    this.router.navigateByUrl('/person-details/' + person.id);
    console.log("Person clicked: ", person)
  }

  async loadFavourites() {
    this.favourites = await this.favService.getFavourites();
  }

  async toggleFavourite(movie: Movie) {
    await this.favService.addRemoveFavourites(movie);
    this.favourites = await this.favService.getFavourites();
  }

  isFavourite(movie: Movie): boolean {
    return this.favService.isFavourite(movie);
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

  buttonText(movie: Movie) {
    if (this.isFavourite(movie)) {
      return "Remove from Favourites";
    }
    return "Add to Favourites";
  }
}
