import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AlertButtonComponent} from './alert-button/alert-button.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'alert'},
  {path: 'alert', component: AlertButtonComponent},
  {path: '**', component: AlertButtonComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
