import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data-service';
import { MyHttpService } from '../services/my-http-service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.page.html',
  styleUrls: ['./person-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PersonDetailsPage implements OnInit {

  person: any;
  movies: any[] = [];
  apiKey: string = "71a8936961cc7f72bb39f09894041612";

  constructor(private mds: MyDataService, private mhs: MyHttpService) { }

  ngOnInit() {
    this.loadPerson();
  }

  async loadPerson() {
    let id = await this.mds.get("personId");

    const personOptions = {
      url: "https://api.themoviedb.org/3/person/" + id + "?api_key=" + this.apiKey
    };

    let personRes = await this.mhs.get(personOptions);
    this.person = personRes.data;

    const movieOptions = {
      url: "https://api.themoviedb.org/3/person/" + id + "/movie_credits?api_key=" + this.apiKey
    };

    let movieRes = await this.mhs.get(movieOptions);
    this.movies = movieRes.data.cast;

  }
}
