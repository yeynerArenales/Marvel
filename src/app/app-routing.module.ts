import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardListComponent } from './components/card-list/card-list.component';
import { ViewDetailsComponent } from './components/view-details/view-details.component';

const routes: Routes = [
  {
    path: '',
    component: CardListComponent,
  },
  {
    path: 'view-details/:id',
    component: ViewDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
