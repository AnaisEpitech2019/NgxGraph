import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';

import { StateDiagramComponent } from './state-diagram/state-diagram.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StateDetailsComponent } from './state-details/state-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'stateDiagram', component: StateDiagramComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: StateDetailsComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {

}
