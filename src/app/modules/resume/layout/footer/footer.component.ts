import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  startYear = 2019;
  currentYear = new Date().getFullYear();

  constructor(

  ) { }


}
