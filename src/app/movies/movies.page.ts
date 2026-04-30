import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardSubtitle, IonCardContent, IonCard, IonCardHeader, IonCardTitle, IonButton, IonIcon } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data-service';
import { MyHttpService } from '../services/my-http-service';
import { HttpOptions } from '@capacitor/core';
import { FavouritesService } from '../services/favourites-service';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCardSubtitle, IonCardContent, IonCard, IonCardHeader, IonCardTitle, IonButton, IonIcon]
})
export class MoviesPage implements OnInit {

  keyword:string = "";
  movies:any[] = [];
  favourites:any[] = [];
  apiKey:string = "71a8936961cc7f72bb39f09894041612";

  constructor(private mds:MyDataService, private mhs:MyHttpService, private favService:FavouritesService) { 
    addIcons({ heart, heartOutline});
  }
  
  ngOnInit() {
    this.getKeyword();
    this.loadFavourites();
  }
  
  async getKeyword(){
    this.keyword = await this.mds.get("keyword");

    const options: HttpOptions = {
      url: "https://api.themoviedb.org/3/search/movie?query=" + this.keyword + "&api_key=" + this.apiKey
    }

    let result = await this.mhs.get(options);
    this.movies = result.data.results;
    console.log(this.movies);
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
}
