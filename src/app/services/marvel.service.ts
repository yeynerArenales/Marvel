import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  constructor(
    private http: HttpClient,
  ) { }

  getMarvel(){
    let url: string = `https://gateway.marvel.com/v1/public/characters?apikey=${environment.apikey}`
    return this.http.get(url); 
  }
}
