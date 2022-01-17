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
  public chgName: boolean = false;
  public newName: string | undefined = '';
  public chgDesc: boolean = false;
  public newDesc: string | undefined = '';

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
      } else {
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
      if(this.randomArray.length == 0)
        this.randomArray = [1, 2, 3].map(item => data[Math.floor(Math.random() * data.length)])
    }
  }

  changeInfo() {
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.setMarvel(this.marvelArray)
  }

  changeName() {
    this.chgName = !this.chgName
    this.newName = this.marvel?.name
  }

  changeDesc() {
    this.chgDesc = !this.chgDesc
    this.newDesc = this.marvel?.description
  }
  
  nameChange() {
    this.chgName = !this.chgName
    let index = this.marvelArray.findIndex(x => x.name == this.marvel?.name)
    if (this.newName && this.marvel) {
      this.marvel.name = this.newName;
      this.marvelArray[index] = this.marvel;
      this.marvelSvc.changeMarvelArray(this.marvelArray);
      this.changeModified(index);
    }
  }

  descChange() {
    this.chgDesc = !this.chgDesc
    let index = this.marvelArray.findIndex(x => x.description == this.marvel?.description)
    if (this.newDesc && this.marvel) {
      this.marvel.description = this.newDesc;
      this.marvelArray[index] = this.marvel;
      this.marvelSvc.changeMarvelArray(this.marvelArray);
      this.changeModified(index);
    }
  }

  changeModified(index: number) {
    if (this.marvel) {
      this.marvelArray[index].modified = new Date().toString();
      this.marvelSvc.changeMarvelArray(this.marvelArray);
    }
  }

  ngOnDestroy() {
    this.marvelSubs.unsubscribe();
  }

}
