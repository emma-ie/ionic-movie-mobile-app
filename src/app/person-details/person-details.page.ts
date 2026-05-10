import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon, IonItem, IonList, IonLabel, IonImg, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data-service';
import { MyHttpService } from '../services/my-http-service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie.model';
import { Person } from '../models/person.model';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.page.html',
  styleUrls: ['./person-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon, IonItem, IonList, IonLabel, IonImg, IonButtons, IonBackButton]
})
export class PersonDetailsPage {

  person?: Person;
  movies: Movie[] = [];

  constructor(private mds: MyDataService, private mhs: MyHttpService, private router: Router) {
  }

  ionViewDidEnter() {
    this.loadPerson();
  }

  async loadPerson() {
    try {
      let id = await this.mds.get("personId");

      if (!id) {
        console.log("No person ID found");
        this.person = undefined;
        this.movies = [];
        return;
      }

      const personOptions = {
        url: "https://api.themoviedb.org/3/person/" + id + "?api_key=" + environment.apiKey
      };

      let personRes = await this.mhs.get(personOptions);
      this.person = personRes?.data;

      const movieOptions = {
        url: "https://api.themoviedb.org/3/person/" + id + "/movie_credits?api_key=" + environment.apiKey
      };

      let movieRes = await this.mhs.get(movieOptions);
      this.movies = movieRes?.data?.cast || [];
    } catch (error) {
      console.log("Error loading person details: ", error);
      this.person = undefined;
      this.movies = [];
    }
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
