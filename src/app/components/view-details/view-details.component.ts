import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarvelService } from 'src/app/services/marvel.service';
import { Observable } from 'rxjs';
import { MarvelObject } from 'src/app/models/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit, OnDestroy {

  public id: number | null = 0;
  private marvelData$: Observable<MarvelObject[]>;
  public marvel: MarvelObject | undefined = {
    id: 0,
    name: '',
    description: '',
    modified: '',
    thumbnail: {
      path: '',
      extension: ''
    }
  };
  public imageUrl: string = '';
  public randomArray: MarvelObject[] = [];
  private marvelSubs: Subscription = new Subscription;
  public marvelArray: MarvelObject[] = [];

  constructor(
    private route: ActivatedRoute,
    private marvelSvc: MarvelService,
    private router: Router
  ) {
    this.marvelData$ = this.marvelSvc.getMarvelArray()
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.getInfo();
  }

  getInfo() {
    this.marvelSubs = this.marvelData$.subscribe(data => {
      if (data == undefined || data.length == 0) {
        this.router.navigate([''])
      }else{
        this.marvelArray = data;
        this.setMarvel(data)
      }
    })
  }

  setMarvel(data: MarvelObject[]) {
    this.marvel = data.find(item => item.id == this.id)
    if (this.marvel != undefined) {
      this.imageUrl = `${this.marvel.thumbnail.path}.${this.marvel.thumbnail.extension}`
      this.marvel.modified = this.marvelSvc.changeModified(this.marvel.modified)
      this.randomArray = [1, 2, 3].map(item => data[Math.floor(Math.random() * data.length)])
    }
  }

  changeInfo() {
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.setMarvel(this.marvelArray)
  }

  ngOnDestroy() {
    this.marvelSubs.unsubscribe();
  }

}
