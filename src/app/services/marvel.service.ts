import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  constructor(
    private http: HttpClient,
  ) { }

  getMarvel(){
    let url: string = "https://gateway.marvel.com/v1/public/characters?apikey=ebc2c6543ba6eb7b61f67a3b3f9c6b46"
    return this.http.get(url); 
  }
}
