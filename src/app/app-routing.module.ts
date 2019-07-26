import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScratchpadComponent } from './scratchpad/scratchpad.component';
import { StudioComponent } from './studio/studio.component';
import { BoxWizardComponent } from './box-wizard/box-wizard.component';
import { CanSamplesComponent } from './can-samples/can-samples.component';
import { BoxSamplesComponent } from './box-samples/box-samples.component';
import { CanWizardComponent } from './can-wizard/can-wizard.component';


const routes: Routes = [
  {path: '', redirectTo: 'sutdio', pathMatch: 'full'},
  { path: 'scratchpad', component: ScratchpadComponent},
  { path: 'box/samples', component: BoxSamplesComponent},
  { path: 'box/wizard', component: BoxWizardComponent},
  { path: 'can/samples', component: CanSamplesComponent},
  { path: 'can/wizard', component: CanWizardComponent},
  { path: 'studio', component: StudioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing : false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
