import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  @Input() inline: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';

  constructor() { }

}
