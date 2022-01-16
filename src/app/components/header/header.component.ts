import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public marvelLogo: string = `${environment.baseUrl}/assets/images/marvel-logo.png`

  constructor() { }

  ngOnInit(): void {
  }

}
