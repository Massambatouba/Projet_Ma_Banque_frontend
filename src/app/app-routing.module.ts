import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompteComponent } from './components/compte/compte.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path:"", component: CompteComponent},
  {path:"compte/:id", component: CompteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
