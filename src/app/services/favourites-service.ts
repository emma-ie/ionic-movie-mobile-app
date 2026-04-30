import { Injectable } from '@angular/core';
import { MyDataService } from './my-data-service';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  constructor(private mds:MyDataService){}

  async getFavourites(){
    let favourites = await this.mds.get("favourites");
    
    if (favourites){
      favourites = JSON.parse(favourites);
    } else {
      favourites = [];
    }

    return favourites;
  }

  async addRemoveFavourites(movie:any){
    let favourites = await this.getFavourites();

    let exists = false;

    for (let i = 0; i < favourites.length; i++){
      if (favourites[i].id === movie.id){
        exists = true;
        break;
      }
    }

    if (exists) {
      let newFavourites = [];
      
      for (let i = 0; i < favourites.length; i++){
        if (favourites[i].id !== movie.id){
          newFavourites.push(favourites[i]);
        }
      } 
      favourites = newFavourites;
    } else {
      favourites.push(movie);
    }

    await this.mds.set("favourites", JSON.stringify(favourites));
  }
}
