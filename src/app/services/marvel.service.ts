import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { MarvelObject } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  private marvelArray = new BehaviorSubject<MarvelObject[]>([]);

  constructor(
    private http: HttpClient,
  ) { }

  getMarvel(){
    let url: string = `https://gateway.marvel.com/v1/public/characters?apikey=${environment.apikey}`
    return this.http.get(url); 
  }

  getMarvelArray(): Observable<MarvelObject[]> {
    return this.marvelArray.asObservable();
  }

  changeMarvelArray(array: MarvelObject[] | null) {
    if (array) {
      this.marvelArray.next(array);
    }
  }

  changeModified(modified: string): string {
    let date = new Date(Date.parse(modified))
    return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
  }

  detructuringObject(object: any): MarvelObject {
    let { id, name, description, modified, thumbnail } = object
    return {
      id,
      name,
      description,
      modified,
      thumbnail
    }
  }
}
