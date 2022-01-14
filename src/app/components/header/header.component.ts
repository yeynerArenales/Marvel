import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MarvelService } from 'src/app/services/marvel.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public marvelLogo: string = `${environment.baseUrl}/assets/images/marvel-logo.png`

  constructor(
    private marvelSvc: MarvelService
  ) { }

  ngOnInit(): void {
    // this.marvelSvc.getMarvel().subscribe( data => {
    //   console.log(data)
    // })
  }

}
