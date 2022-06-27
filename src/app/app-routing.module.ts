import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TimerComponent } from './Components/timer/timer.component';
import { LoginComponent } from "./Components/login/login.component";
import { RegisterComponent } from "./Components/register/register.component";
import { ErrorPageComponent } from "./Pages/error-page/error-page.component";
import { HomePageComponent } from "./Pages/home-page/home-page.component";
import { ViewNotesComponent } from './Pages/view-notes/view-notes.component';
import { ViewFlashCardsComponent } from './Pages/view-flash-cards/view-flash-cards.component';
import { FlashCardSetComponent } from './Pages/flash-card-set/flash-card-set.component';
import { AddNotesComponent } from './Components/add-notes/add-notes.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'notes', component: ViewNotesComponent },
  { path: 'flash-cards', component: FlashCardSetComponent },
  { path: 'view-flash-cards/:setId', component: ViewFlashCardsComponent },
  { path: 'register', component: RegisterComponent },
  // test routes
  { path: 'flash-card-test', component: ViewFlashCardsComponent },
  { path: 'addNotetest', component: AddNotesComponent },
  // 
  { path: '**', component: ErrorPageComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
