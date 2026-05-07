import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { FavouritesService } from '../services/favourites-service';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons'

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon]
})
export class FavouritesPage implements OnInit {

  favourites: any[] = [];

  constructor(private favService: FavouritesService) {
    addIcons({ heart, heartOutline });
   }

  ngOnInit() {
    this.loadFavourites();
  }

  async loadFavourites(){
    await this.favService.getFavourites();

    this.favourites = this.favService.favourites;
  }

  async toggleFavourite(movie:any){
    await this.favService.addRemoveFavourites(movie);
    this.loadFavourites();
  }

}
