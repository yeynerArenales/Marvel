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
  public search: string = '';

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
      }
      return
    });
  }

  getList() {
    this.marvelSvc.getMarvel().subscribe((res: any) => {
      let { results } = res.data;
      this.marvelList = results.map((item: any) => {
        return this.marvelSvc.detructuringObject(item);
      })
      this.newArray = results.map((item: any) => {
        return this.marvelSvc.detructuringObject(item);
      })
      this.marvelSvc.changeMarvelArray(this.marvelList)
    })
  }

  debounce(func: any, timeout = 500) {
    let timer: any;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  processSearch = this.debounce(() => this.searchData());

  searchData() {
    if (this.search == '') {
      this.marvelList = this.newArray
    } else {
      this.marvelList = this.marvelList.filter(item => item.name.toLowerCase().includes(this.search.toLowerCase()))
    }
  }

}
