import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class MyDataService {
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    try {
      await this.storage.create();
    } catch (error) {
      console.log("Storage init error: ", error);
    }
  }

  async set(key: string, value: any) {
    try {
      await this.storage.set(key, value);
    } catch (error) {
      console.log("Storage set error: ", error);
    }
  }

  async get(key: string) {
    try {
      return await this.storage.get(key);
    } catch (error) {
      console.log("Storage get error: ", error);
      return null;
    }
  }
}
