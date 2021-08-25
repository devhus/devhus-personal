import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentBase } from './../../../../common/helpers/mixins/component-base';
import { Platform } from './../../../../common/helpers/utilities';
import { KeyValueObject } from './../../../../common/types/key-value-object';
import { Project } from './../../../resume/models/project.interface';
import { ProjectService } from './../../../resume/services/projects/project.service';

@Component({
  selector: 'app-settings-form-projects',
  templateUrl: './settings-form-projects.component.html',
  styleUrls: ['./settings-form-projects.component.scss']
})
export class SettingsFormProjectsComponent extends ComponentBase implements OnInit {

  categories: KeyValueObject;
  loading$: Observable<boolean>;
  projects: Project[] = [];
  activeId: number = -1;

  constructor(
    private projectService: ProjectService,
  ) {
    super();
    this.loading$ = this.projectService.loading$.asObservable();
    this.categories = projectService.categories;
  }

  ngOnInit(): void {
    if (Platform.isBrowser) {
      this.recordSubscription(
        this.projectService.fetch().subscribe(projects => {
          this.projects = projects.map(p => p);
        })
      )
    }
  }

  save() {
    this.recordSubscription(
      this.projectService.update(this.projects).subscribe(projects => {
        this.projects = projects.map(p => p);
      })
    );
  }

  add(project?: Project) {
    this.projects.unshift(project ?? new Project());
  }

  remove(project: Project) {
    this.projects.splice(this.projects.indexOf(project), 1);
  }

}
