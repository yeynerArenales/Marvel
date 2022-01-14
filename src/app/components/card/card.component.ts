import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() name: string = 'IronMan';
  @Input() description: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ornare eleifend nunc, ut rhoncus nisi luctus non. Nam sed molestie mi, eu vehicula ligula. Phasellus lacinia aliquam rutrum. Phasellus at massa vitae purus lobortis vulputate. Sed congue lectus vitae tristique vulputate. Cras posuere nisl nec ultricies luctus.'
  @Input() modified: string = '14/01/2022' 

  constructor() { }

  ngOnInit(): void {
  }

}
