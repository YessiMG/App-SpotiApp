import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SpotifyService } from 'src/app/services/spotify.service';
import { createNgModule } from '@angular/compiler/src/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /* 
  Ejercicio: 

  paises: any[] = [];

  constructor( private http: HttpClient) { 
    this.http.get('https://restcountries.eu/rest/v2/lang/es')
        .subscribe((resp: any) => {
          this.paises =resp;
          console.log(this.paises);
        });
  } */

  nuevasCanciones:any[] =[];
  loading:boolean;
  error:boolean = false;
  mensajeError: string;

  constructor(private spotify: SpotifyService){
    
    this.loading = true;

    this.spotify.getNewReleases()
        .subscribe((data:any) =>{
          console.log(data);
          this.nuevasCanciones = data;
          this.loading = false;
        }, (errorServicio)=>{
          this.error=true;
          this.loading = false;
          this.mensajeError = errorServicio.error.error.message;
          
        });
  }

  ngOnInit(): void {
  }

}
