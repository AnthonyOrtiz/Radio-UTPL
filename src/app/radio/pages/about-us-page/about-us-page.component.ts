import { Component } from '@angular/core';
import { MediaElement } from '../../interfaces/media-element.interface';

@Component({
    selector: 'radio-about-us-page',
    templateUrl: './about-us-page.component.html',
    styleUrl: './about-us-page.component.css',
    standalone: false
})
export class AboutUsPageComponent {
  public mediaTeamMediaLab:MediaElement[] = [
    {id: '01',title:'Directora del departamento de Ciencias de la Comunicación de UTPL', description: 'Ana María Beltrán', imgSrc: 'https://firebasestorage.googleapis.com/v0/b/radioutpl.appspot.com/o/media%2Fana_beltran.png?alt=media&token=e2170a5e-ab3a-471a-8c85-1d6ae3c60f3e'},
    {id: '02',title:'Técnico de Radio UTPL', description: 'Lourdes Quezada Loaiza', imgSrc: 'https://firebasestorage.googleapis.com/v0/b/radioutpl.appspot.com/o/media%2Flourdes_quezada.png?alt=media&token=d8c792c1-04b7-435f-862b-eb791c6cce58'},
  ]
}
