import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScratchpadComponent } from './scratchpad/scratchpad.component';
import { BoxComponent } from './box/box.component';
import { StudioComponent } from './studio/studio.component';
import { BoxWizardComponent } from './box-wizard/box-wizard.component';


const routes: Routes = [
  {path: '', redirectTo: 'box/uv', pathMatch: 'full'},
  { path: 'scratchpad', component: ScratchpadComponent},
  { path: 'box/uv', component: BoxComponent},
  { path: 'box/wizard', component: BoxWizardComponent},
  { path: 'studio', component: StudioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing : false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
