import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon, IonItem, IonList, IonLabel, IonImg } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data-service';
import { MyHttpService } from '../services/my-http-service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.page.html',
  styleUrls: ['./person-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon, IonItem, IonList, IonLabel, IonImg]
})
export class PersonDetailsPage implements OnInit {

  person: any;
  movies: Movie[] = [];

  constructor(private mds: MyDataService, private mhs: MyHttpService, private router: Router) {
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loadPerson();
  }

  async loadPerson() {
    let id = await this.mds.get("personId");

    const personOptions = {
      url: "https://api.themoviedb.org/3/person/" + id + "?api_key=" + environment.apiKey
    };

    let personRes = await this.mhs.get(personOptions);
    this.person = personRes.data;

    const movieOptions = {
      url: "https://api.themoviedb.org/3/person/" + id + "/movie_credits?api_key=" + environment.apiKey
    };

    let movieRes = await this.mhs.get(movieOptions);
    this.movies = movieRes.data.cast;

  }

  goToFavourites() {
    this.router.navigate(['/favourites']);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
