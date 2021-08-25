import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppCommonModule } from './../../common/app-common.module';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { PortfolioViewComponent } from './pages/portfolio-view/portfolio-view.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { ResumeComponent } from './pages/resume/resume.component';
import { ResumeRoutingModule } from './resume-routing.module';



@NgModule({
  declarations: [
    HomeComponent,
    PortfolioComponent,
    PortfolioViewComponent,
    ResumeComponent,
    ContactComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    ResumeRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AppCommonModule
  ]
})
export class ResumeModule { }
