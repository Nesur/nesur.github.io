import {Component, OnInit} from '@angular/core';
import {ResumeDataService} from './resume-data.service';
import {ResumeData, SkillData} from './model/resume-data';
import Typed from 'typed.js';
import {NgForOf, NgIf} from '@angular/common';
import _ from 'lodash';
import {PortfolioComponent} from './portfolio/portfolio.component';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    PortfolioComponent

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  resumeData: ResumeData | undefined;


  private typedConfig = {
    strings: ['Software engineer.'],
    typeSpeed: 100,
    backSpeed: 100,
    showCursor: true,
    cursorChar: '|',
    loop: false
  }
  skillsGroupedByCategory: SkillsDataGrouped[] | undefined;

  constructor(private readonly resumeDataService: ResumeDataService) {
  }

  async ngOnInit(): Promise<void> {
    await this.loadResumeData();

    this.prepareSkills();

    // init typed text
    new Typed('.typed-element', this.typedConfig);
  }

  private async loadResumeData(): Promise<void> {
    try {
      this.resumeData = await this.resumeDataService.getResumeData();
    } catch (e) {
      if (e instanceof HttpErrorResponse) {
        const httpErrorResponse = e as HttpErrorResponse;
        console.error(`Could not load resume data. Error: '${httpErrorResponse.message}'`);
      } else {
        console.error(`Could not load resume data with cause ${e}`);
      }
    }
  }

  public createMailToHref(email: string): string {
    return `mailto:${email}`;
  }

  private prepareSkills() {
    const categoryDictionary = _.groupBy(this.resumeData?.skills, 'category');

    const skillsByCategory: SkillsDataGrouped[] = [];
    for (const category in categoryDictionary) {
      skillsByCategory.push({
        category: category,
        skills: _.orderBy(categoryDictionary[category], 'experience', 'desc'),
      })
    }
    this.skillsGroupedByCategory = _.orderBy(skillsByCategory, ['category', 'asc']);
  }
}

interface SkillsDataGrouped {
  category: string;
  skills: SkillData[];
}
