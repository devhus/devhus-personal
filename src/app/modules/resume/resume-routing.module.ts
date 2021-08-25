import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppConfig } from 'src/app/app-config';
import { TypingSEO } from './../../common/services/meta-builder/meta-management.interfaces';
import { LayoutComponent } from './layout/layout/layout.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { PortfolioViewComponent } from './pages/portfolio-view/portfolio-view.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { ResumeComponent } from './pages/resume/resume.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        data: {
          meta: <TypingSEO>{
            titleSuffix: AppConfig.meta.default.titleSuffix
          }
        }
      },
      {
        path: 'about',
        component: AboutComponent,
        data: {
          meta: <TypingSEO>{
            titleSuffix: 'About Me',
            description: 'I am a software engineer and here where you can learn more about me. View my personal details, skills and more.'
          }
        }
      },
      {
        path: 'portfolio',
        children: [
          {
            path: '',
            component: PortfolioComponent,
            data: {
              meta: <TypingSEO>{
                titleSuffix: 'Portfolio',
                description: 'My portfolio filled with projects for you. Visit and see some of my work on multiple platforms Web, Windows Desktop, and more.'
              }
            }
          },
          {
            path: 'view/:slug',
            component: PortfolioViewComponent
          }
        ]
      },
      {
        path: 'resume',
        component: ResumeComponent,
        data: {
          meta: <TypingSEO>{
            titleSuffix: 'Resume',
            description: "Take a quick tour around the few years I've spent programming, read more about the gained experience while doing it."
          }
        }
      },
      {
        path: 'contact',
        component: ContactComponent,
        data: {
          meta: <TypingSEO>{
            titleSuffix: 'Contact Me',
            description: "Do you have an idea that you want it to become true? So, let's talk business."
          }
        }
      },
      {
        path: 'p/:slug',
        redirectTo: '/portfolio/view/:slug'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResumeRoutingModule { }
