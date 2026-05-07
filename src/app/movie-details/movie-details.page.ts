import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { heart, heartOutline, homeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonIcon]
})
export class MovieDetailsPage implements OnInit {
  
  constructor(private router: Router) {
    addIcons({ heart, heartOutline, homeOutline });
  }
  
  ngOnInit() {
  }
  
  goToFavourites(){
    this.router.navigate(['/favourites']);
  }

  goHome(){
    this.router.navigate(['/']);
  }

}
