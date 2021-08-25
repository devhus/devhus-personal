import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentBase } from './../../../../common/helpers/mixins/component-base';
import { KeyValueObject } from './../../../../common/types/key-value-object';
import { Project } from './../../models/project.interface';
import { ProjectService } from './../../services/projects/project.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent extends ComponentBase implements OnInit {

  loading$: Observable<boolean>;
  projects$: Observable<Project[]>;

  categories: KeyValueObject;
  activeCategory: string = 'all';

  constructor(
    private projectService: ProjectService,
  ) {
    super();
    this.loading$ = this.projectService.loading$.asObservable();
    this.projects$ = this.projectService.projects$.asObservable();
    this.categories = projectService.categories;
  }

  ngOnInit(): void {
    if (this.projectService.fected$.value === false) {
      this.recordSubscription(
        this.projectService.fetch().subscribe()
      );
    }
  }

  switchCategory(category: string) {
    this.activeCategory = category
    //this.pps.switchCategory(category);
  }
}