import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { heart, heartOutline, homeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { MyDataService } from '../services/my-data-service';
import { MyHttpService } from '../services/my-http-service';
import { FavouritesService } from '../services/favourites-service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent]
})
export class MovieDetailsPage implements OnInit {

  movie: any;
  cast: any[] = [];
  crew: any[] = [];
  favourites: any[] = [];
  apiKey: string = "71a8936961cc7f72bb39f09894041612";

  constructor(private router: Router, private mds: MyDataService, private mhs: MyHttpService, private favService: FavouritesService) {
    addIcons({ heart, heartOutline, homeOutline });
  }

  ngOnInit() {
    console.log("ngOnInit in movie details");
    this.loadMovie(this.movie);
  }

  async loadMovie(movie: any) {
    console.log("loadMovie called");

    let id = await this.mds.get("movieId");

    console.log("Movie ID:", id);

    let movieOptions = {
      url: "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + this.apiKey
    };

    let movieRes = await this.mhs.get(movieOptions);
    this.movie = movieRes.data;

    let creditOptions = {
      url: "https://api.themoviedb.org/3/movie/" + id + "/credits?api_key=" + this.apiKey
    };

    let creditRes = await this.mhs.get(creditOptions);

    this.cast = creditRes.data.cast;
    this.crew = creditRes.data.crew;
  }

  async loadFavourites() {
    this.favourites = await this.favService.getFavourites();
  }

  async toggleFavourite(movie: any) {
    await this.favService.addRemoveFavourites(movie);
    this.loadFavourites();
  }

  isFavourite(movie: any): boolean {
    return this.favService.isFavourite(movie);
  }

  goToFavourites() {
    this.router.navigate(['/favourites']);
  }

  goHome() {
    this.router.navigate(['/']);
  }

}
