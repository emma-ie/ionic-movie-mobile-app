import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';

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
}
