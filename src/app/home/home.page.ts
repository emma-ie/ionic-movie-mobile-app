import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonIcon, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { MyDataService } from '../services/my-data-service';
import { addIcons } from 'ionicons';
import { heartOutline, heart } from 'ionicons/icons'
import { HttpOptions } from '@capacitor/core';
import { MyHttpService } from '../services/my-http-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonIcon, IonButton, FormsModule, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, CommonModule],
})
export class HomePage {

  studentNum: string = "G00474347";
  keyword: string = "";
  apiKey:string = "71a8936961cc7f72bb39f09894041612";
  movies:any[] = [];
  
  constructor(private mds: MyDataService, private router: Router, private mhs: MyHttpService) {
    addIcons({ heartOutline })
  }

  ngOnInit(){
    console.log("This is oninit");
    this.loadTrendingMovies();
  }

  async loadTrendingMovies(){
    console.log("Loading trending");
    const options: HttpOptions = {
      url: "https://api.themoviedb.org/3/trending/movie/day?api_key=" + this.apiKey
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
}
