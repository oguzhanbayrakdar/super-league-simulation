import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoDataComponent } from './components/no-data/no-data.component';
import { MessagesModule } from 'primeng/messages';
import { provideAnimations } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
		NoDataComponent
	],
  imports: [
    CommonModule,
		MessagesModule
  ],
	exports: [
		NoDataComponent
	],
	providers:[
		provideAnimations()
	]
})
export class SharedModule { }
