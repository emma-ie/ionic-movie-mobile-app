import { Injectable } from '@angular/core';
import { MyDataService } from './my-data-service';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  favourites: any[] = [];
  
  constructor(private mds:MyDataService){}

  // Get favourites from storage
  async getFavourites(){
    let favourites = await this.mds.get("favourites");
    
    // If data exists in favourites (i.e. not empty), convert to array
    if (favourites){
      this.favourites = JSON.parse(favourites);
    } else {
      // If no data exists in favourites, create empty array
      this.favourites = [];
    }

    return this.favourites;
  }

  // Check if a movie is already favourited
  isFavourite(movie:any): boolean {
    for (let i = 0; i < this.favourites.length; i++){
      if (this.favourites[i].id === movie.id){
        return true;
      }
    }
    return false;
  }

  // Add or remove a movie from favourites 
  async addRemoveFavourites(movie:any){
    let exists = this.isFavourite(movie);

    // If the movie is in favourites, remove it
    if (exists) {
      // Create new array to push all other favourite movies to
      let newFavourites = [];
      
      // Loop through array of favourites
      for (let i = 0; i < this.favourites.length; i++){
        // If the movie ID is not the movie ID to remove, push to new array
        if (this.favourites[i].id !== movie.id){
          newFavourites.push(this.favourites[i]);
        }
      } 
      this.favourites = newFavourites;
    } 
    else {
      // Add new movie to favourites
      this.favourites.push(movie);
    }

    // Save updated favourites in storage
    await this.mds.set("favourites", JSON.stringify(this.favourites));
  }
}
