import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScratchpadComponent } from './scratchpad/scratchpad.component';
import { BoxComponent } from './box/box.component';
import { StudioComponent } from './studio/studio.component';


const routes: Routes = [
  {path: '', redirectTo: 'scratchpad', pathMatch: 'full'},
  { path: 'scratchpad', component: ScratchpadComponent},
  { path: 'uv/box', component: BoxComponent},
  { path: 'studio', component: StudioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing : false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
