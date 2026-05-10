import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MyHttpService {

  async get(options: HttpOptions) {
    try {
      return await CapacitorHttp.get(options);
    } catch (error) {
      console.log("HTTP GET error: ", error);
      return null;
    }
  }

  async getRandomPopularMovie() {
    // Code for randomness from: https://www.w3schools.com/js/js_random.asp
    const randomPage = Math.floor(Math.random() * 25);

    const options = {
      url: 'https://api.themoviedb.org/3/movie/popular?api_key=' + environment.apiKey + '&page=' + randomPage
    };

    const result = await this.get(options);
    const movies = result?.data.results;

    if (movies.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * movies.length);

    return movies[randomIndex];
  }
}
