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
  marvelSubs: Subscription  = new Subscription;

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
      }
      this.marvel = data.find(item => item.id == this.id)
      if (this.marvel != undefined) {
        this.imageUrl = `${this.marvel.thumbnail.path}.${this.marvel.thumbnail.extension}`
        console.log(this.marvel.modified)
        this.marvel.modified = this.marvelSvc.changeModified(this.marvel.modified)
      }
      this.randomArray = [1, 2, 3].map(item => data[Math.floor(Math.random() * data.length)])
    })
  }

  ngOnDestroy() {
    this.marvelSubs.unsubscribe();
  }

}
