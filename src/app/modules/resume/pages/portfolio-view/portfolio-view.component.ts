import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComponentBase } from './../../../../common/helpers/mixins/component-base';
import { KeyValueObject } from './../../../../common/types/key-value-object';
import { Project } from './../../models/project.interface';
import { ProjectService } from './../../services/projects/project.service';

@Component({
  selector: 'app-portfolio-view',
  templateUrl: './portfolio-view.component.html',
  styleUrls: ['./portfolio-view.component.scss']
})
export class PortfolioViewComponent extends ComponentBase implements OnInit {

  loading$: Observable<boolean>;
  project$?: Observable<Project | undefined>;
  nextProject$?: Observable<Project | undefined>;
  previousProject$?: Observable<Project | undefined>;

  categories: KeyValueObject;
  activeCategory: string = 'all';

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
  ) {
    super();
    this.loading$ = this.projectService.loading$.asObservable();
    //this.project$ = this.projectService.find('');
    this.categories = projectService.categories;
  }

  ngOnInit(): void {
    this.recordSubscription(
      this.route.params.pipe(map(ps => ps['slug'])).subscribe(slug => {
        this.project$ = this.projectService.findBySlug(slug);
        this.recordSubscription(
          this.project$.subscribe(p => {
            if (p) {
              this.nextProject$ = this.projectService.findByIndex(this.projectService.getIndex(p) - 1)
              this.previousProject$ = this.projectService.findByIndex(this.projectService.getIndex(p) + 1)
            }
          })
        )
      })
    )
    if (this.projectService.fected$.value === false) {
      this.recordSubscription(
        this.projectService.fetch().subscribe()
      );
    }
  }

}
