import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardSubtitle, IonCardContent, IonCard, IonCardHeader } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data-service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCardSubtitle, IonCardContent, IonCard, IonCardHeader]
})
export class MoviesPage implements OnInit {

  constructor(private mds:MyDataService) { }
  keyword:string = "";

  ngOnInit() {
    this.getKeyword();
  }

  async getKeyword(){
    this.keyword = await this.mds.get("keyword");
  }

}
