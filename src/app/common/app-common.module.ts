import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoaderComponent } from './components/loader/loader.component';
import { ArrayIncludesPipe } from './helpers/pipes/array/inclues/includes.pipe';
import { JoinPipe } from './helpers/pipes/array/join/join.pipe';
import { MergePipe } from './helpers/pipes/array/merge/merge.pipe';
import { EnvPipe } from './helpers/pipes/env/env.pipe';
import { EmailMaskPipe } from './helpers/pipes/text/email-mask.pipe';



@NgModule({
  declarations: [
    LoaderComponent,

    ArrayIncludesPipe,
    EnvPipe,
    JoinPipe,
    EmailMaskPipe,
    MergePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent,
    
    ArrayIncludesPipe,
    EnvPipe,
    JoinPipe,
    EmailMaskPipe,
    MergePipe
  ]
})
export class AppCommonModule { }
