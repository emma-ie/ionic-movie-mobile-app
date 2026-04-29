import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonIcon, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { MyDataService } from '../services/my-data-service';
import { addIcons } from 'ionicons';
import { heartOutline } from 'ionicons/icons'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonIcon, IonButton, FormsModule],
})
export class HomePage {
  studentNum:string = "G00474347";
  keyword:string = "";
  constructor(private mds:MyDataService, private router:Router) {
    addIcons({heartOutline})
  }

  async searchMovies(){
    await this.mds.set("keyword", this.keyword);
    this.router.navigate(['/movies'])
  }
}
