import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardSubtitle, IonCardContent, IonCard, IonCardHeader } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data-service';
import { MyHttpService } from '../services/my-http-service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCardSubtitle, IonCardContent, IonCard, IonCardHeader]
})
export class MoviesPage implements OnInit {

  constructor(private mds:MyDataService, private mhs:MyHttpService) { }
  keyword:string = "";
  apiKey:string = "dbe32932";
  options: HttpOptions = {
    url: "http://www.omdbapi.com/?apikey=" + this.apiKey + "&s=" + this.keyword
  }

  ngOnInit() {
    this.getKeyword();
  }

  async getKeyword(){
    this.keyword = await this.mds.get("keyword");
    this.mhs.get(this.options);
  }

}
