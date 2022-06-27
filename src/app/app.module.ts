import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddNotesComponent } from './Components/add-notes/add-notes.component';
import { ViewNotesComponent } from './Pages/view-notes/view-notes.component';
import { AddFlashCardComponent, ViewFlashCardsComponent, ViewFlashCardsDialogComponent } from './Pages/view-flash-cards/view-flash-cards.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HeaderComponent } from './Components/header/header.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { ErrorPageComponent } from './Pages/error-page/error-page.component';
import { BodyComponent } from './Components/body/body.component';
import { TimerComponent } from './Components/timer/timer.component';
import { CreateTimerComponent } from './Components/create-timer/create-timer.component';
import { TimerService } from './timer.service';
import { MaterialModule } from './Modules/material.module';

import { DrawerService } from './Service/drawer.service';
import { SetsComponent } from './Components/sets/sets.component';
import { AddSetComponentDialog, FlashCardSetComponent } from './Pages/flash-card-set/flash-card-set.component';



@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    CreateTimerComponent,
    AddNotesComponent,
    AddFlashCardComponent,
    ViewNotesComponent,
    ViewFlashCardsComponent,
    ViewFlashCardsDialogComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HeaderComponent,
    HomePageComponent,
    ErrorPageComponent,
    BodyComponent,
    SetsComponent,
    FlashCardSetComponent,
    AddSetComponentDialog

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    AppRoutingModule,

  ],
  providers: [
    CookieService,
    TimerService,
    DrawerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
