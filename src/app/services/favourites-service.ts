import { Injectable } from '@angular/core';
import { MyDataService } from './my-data-service';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  favourites: any[] = [];

  constructor(private mds: MyDataService) { }

  async getFavourites() {
    let favourites = await this.mds.get("favourites");

    if (favourites) {
      this.favourites = JSON.parse(favourites);
    } else {
      this.favourites = [];
    }

    return this.favourites;
  }

  isFavourite(movie: Movie): boolean {
    if (!movie || !movie.id) {
      return false;
    }

    for (let i = 0; i < this.favourites.length; i++) {
      let fav = this.favourites[i];

      if (fav && fav.id === movie.id) {
        return true;
      }
    }
    return false;
  }

  async addRemoveFavourites(movie: Movie) {
    let exists = this.isFavourite(movie);

    if (exists) {
      let newFavourites = [];

      for (let i = 0; i < this.favourites.length; i++) {
        if (this.favourites[i].id !== movie.id) {
          newFavourites.push(this.favourites[i]);
        }
      }
      this.favourites = newFavourites;
    }
    else {
      this.favourites.push(movie);
    }

    await this.mds.set("favourites", JSON.stringify(this.favourites));
  }
}
