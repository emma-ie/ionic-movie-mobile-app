import { Injectable } from '@angular/core';
import { MyDataService } from './my-data-service';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  watchlist: Movie[] = [];

  constructor(private mds: MyDataService) { }

  async getWatchlist() {
    try {
      console.log("Loading watchlist");

      let watchlist = await this.mds.get("watchlist");

      if (watchlist) {
        this.watchlist = JSON.parse(watchlist);
      } else {
        this.watchlist = [];
      }

      return this.watchlist;
    } catch (error) {
      console.log("Error loading watchlist: ", error);
      this.watchlist = [];
      return [];
    }
  }

  isInWatchlist(movie: Movie): boolean {
    if (!movie || !movie.id) {
      return false;
    }

    for (let i = 0; i < this.watchlist.length; i++) {
      let item = this.watchlist[i];

      if (item && item.id === movie.id) {
        return true;
      }
    }
    return false;
  }

  async addRemoveWatchlist(movie: Movie) {
    try {
      let exists = this.isInWatchlist(movie);

      if (exists) {
        let newWatchlist: Movie[] = [];

        for (let i = 0; i < this.watchlist.length; i++) {
          if (this.watchlist[i].id !== movie.id) {
            newWatchlist.push(this.watchlist[i]);
          }
        }
        this.watchlist = newWatchlist;
      }
      else {
        this.watchlist.push(movie);
      }

      await this.mds.set("watchlist", JSON.stringify(this.watchlist));
    } catch (error) {
      console.log("Error updating watchlist: ", error);
    }
  }
}
