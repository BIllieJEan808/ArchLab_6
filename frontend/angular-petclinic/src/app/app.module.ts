import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { OwnerListComponent } from './components/owner/owner-list/owner-list.component';
import { HttpClientModule } from '@angular/common/http'
import { OwnerService } from './services/owner.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import {Routes, RouterModule} from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { OwnerDetailComponent } from './components/owner/owner-detail/owner-detail.component';
import { OwnerAddComponent } from './components/owner/owner-add/owner-add.component';
import { OwnerEditComponent } from './components/owner/owner-edit/owner-edit.component';
import { PetListComponent } from './components/pet/pet-list/pet-list.component';
import { PetEditComponent } from './components/pet/pet-edit/pet-edit.component';
import { PetAddComponent } from './components/pet/pet-add/pet-add.component';
import { VisitAddComponent } from './components/visit/visit-add/visit-add.component';
import { VisitListComponent } from './components/visit/visit-list/visit-list.component';
import { VetListComponent } from './components/vet/vet-list/vet-list.component';
const routes: Routes = [
  {path: 'vets', component: VetListComponent},
  {path: 'pets/:id/edit', component: PetEditComponent},
  {path: 'pets/:id/visits/add', component: VisitAddComponent},
  {path: 'owners/add', component: OwnerAddComponent},
  {path: 'owners/:id', component: OwnerDetailComponent},
  {path: 'owners/:id/edit', component: OwnerEditComponent},
  {path: 'owners/:id/pets/add', component: PetAddComponent},
  {path: 'owners', component: OwnerListComponent},
  {path: '', component: WelcomeComponent},
  {path: '**', component: PageNotFoundComponent, pathMatch: 'full'},
];


@NgModule({
  declarations: [
    AppComponent,
    OwnerListComponent,
    PageNotFoundComponent,
    WelcomeComponent,
    OwnerDetailComponent,
    OwnerAddComponent,
    OwnerEditComponent,
    PetListComponent,
    PetEditComponent,
    PetAddComponent,
    VisitAddComponent,
    VisitListComponent,
    VetListComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [OwnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
