import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { 
    console.log("Servicio listo");
  }

  getQuery (query:string){
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQAHFogzT2K4N3DUnqTX4PX_TEQ4tQOargIQUE3IWI4frT4CutUi4yTJg9ABBZENr5cXAsSQtrF1RX2ff9A'
    });

    return this.http.get(url, {headers});
  }

  getNewReleases(){
   /*  return this.http.get('browse/new-releases?limit=20', {headers})
                    .pipe( map( data => data['albums'].items) ); */
    return this.getQuery('browse/new-releases?limit=20')
        .pipe( map( data => data['albums'].items));
  }

  getArtistas(termino:string){/* 
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQAHmTupz5UWsDpytT-Kg3viCmknT2Socp2yMR5jOqM2AzB5ZcHj2LZIAaz2G5ivI-OzEd8QjegUgP-XRVI'
    }); */

    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
    .pipe( map( data => data['artists'].items));

    /* return this.http.get(`https://api.spotify.com/v1/search?q=${termino}&type=artist&limit=15`, {headers})
                    .pipe( map( data => data['artists'].items)); */
  }

  getArtista(id:string){

    return this.getQuery(`artists/${ id }`);
    //.pipe( map( data => data['artists'].items));

  }

  getTopTracks(id:string){

    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
              .pipe( map( data => data['tracks']));

  }
}
