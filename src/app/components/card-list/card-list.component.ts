import { Component, OnInit } from '@angular/core';
import { MarvelService } from 'src/app/services/marvel.service';
import { MarvelObject } from 'src/app/models/models';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  public marvelList: MarvelObject[] = [];
  public newArray: MarvelObject[] = [];

  constructor(
    private marvelSvc: MarvelService
  ) { }

  ngOnInit(): void {
    this.getList()

    window.addEventListener('scroll', () => {
      if (
        window.scrollY + window.innerHeight >= document.body.offsetHeight - 300
      ) {
        this.newArray.forEach(item => this.marvelList.push(item))
        console.log(document.body.offsetHeight)
      }
      return
    });
  }

  getList() {
    this.marvelSvc.getMarvel().subscribe((res: any) => {
      let { results } = res.data;
      this.marvelList = results.map((item: any) => {
        return this.detructuringObject(item);
      })
      console.log(this.marvelList)
      this.newArray = results.map((item: any) => {
        return this.detructuringObject(item);
      })
    })
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
