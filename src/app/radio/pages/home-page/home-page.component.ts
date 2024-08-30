import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firebase.service';
import { MediaElement } from '../../interfaces/media-element.interface';
import { Podcasts } from '../../../shared/interfaces/podcasts.interfaces';



@Component({
  selector: 'radio-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{

  podcasts: Podcasts[] = [];
  lenguas: Podcasts = {
    id: '',
    title: '',
    date: '',
    category: '',
    image: '',
    content: '',
  };

  public mediaElementCarousel:MediaElement[] = [
    {id: '01', title: 'First Image', imgSrc: 'https://wallpapers.com/images/featured/minimalist-7xpryajznty61ra3.jpg'},
    {id: '02', title: 'Second Image', imgSrc: 'https://images.alphacoders.com/133/1330482.png'},
    {id: '03', title: 'Tree Image', imgSrc: 'https://wallpaperbat.com/img/192020-minimal-forest-wallpaper-top-free-minimal-forest-background.jpg'}
  ]

  constructor(private firestore: FirestoreService,){

  }

  ngOnInit(): void {
    this.getPodcasts()
  }

  getPodcasts(){
    this.firestore.getCollection<Podcasts>('podcast').subscribe( res => {
      this.podcasts = res;
      console.log('hola',this.podcasts)
    });
  }
}
