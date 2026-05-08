import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonIcon, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { MyDataService } from '../services/my-data-service';
import { addIcons } from 'ionicons';
import { heartOutline, heart } from 'ionicons/icons'
import { HttpOptions } from '@capacitor/core';
import { FavouritesService } from '../services/favourites-service';
import { MyHttpService } from '../services/my-http-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonIcon, IonButton, FormsModule, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, CommonModule],
})
export class HomePage {

  studentNum: string = "G00474347";
  keyword: string = "";
  movies:any[] = [];
  favourites:any[] = [];
  
  constructor(private mds: MyDataService, private router: Router, private mhs: MyHttpService, private favService: FavouritesService) {
    addIcons({ heart, heartOutline });
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

  async toggleFavourite(movie:any){
    await this.favService.addRemoveFavourites(movie);
    this.loadFavourites();
  }

  isFavourite(movie:any): boolean{
    return this.favService.isFavourite(movie);
  }

  goToFavourites(){
    this.router.navigate(['/favourites']);
  }

  openMovie(movie: any) {
    this.mds.set("movieId", movie.id);
    console.log("Saved ID: ", movie.id, movie.name);
    this.router.navigate(['/movie-details', movie.id]);
  }
}
