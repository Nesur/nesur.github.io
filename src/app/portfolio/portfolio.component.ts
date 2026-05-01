import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {PortfolioCategory, PortfolioData} from '../model/resume-data';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit {

  @Input() portfolioList!: PortfolioData[];

  portfolioListFiltered: PortfolioData[] = [];

  readonly categories: PortfolioCategory[] = [];

  private selectedCategory: PortfolioCategory | undefined;

  public ngOnInit(): void {
    this.initCategories();
    this.onCategorySelected(PortfolioCategory.All);
  }

  private initCategories() {
    const categories = this.portfolioList.map(value => value.category);

    const distinctCategories: PortfolioCategory[] = [];
    distinctCategories.push(PortfolioCategory.All)

    for (const category of categories) {
      let categoryExists = distinctCategories.indexOf(category) !== -1;
      if (!categoryExists) {
        distinctCategories.push(category);
      }
    }

    console.log(`Found categories: ${distinctCategories}`);
    this.categories.push(...distinctCategories);
  }

  public onCategorySelected(category: PortfolioCategory) {
    if (this.selectedCategory == category) {
      return;
    }
    this.selectedCategory = category;
    this.filterPortfolioItemsByCategory(category);
  }


  private filterPortfolioItemsByCategory(category: PortfolioCategory) {
    this.portfolioListFiltered.length = 0;
    setTimeout(() => {
      for (const portfolioElement of this.portfolioList) {
        const shouldAddElement = category === PortfolioCategory.All || portfolioElement.category === category;
        if (shouldAddElement) {
          this.portfolioListFiltered.push(portfolioElement);
        }
      }
    }, 1);
  }

  public isSelectedCategory(category: PortfolioCategory): boolean {
    return category === this.selectedCategory;
  }

  protected readonly Range = Range;
}
