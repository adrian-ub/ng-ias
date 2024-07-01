import { Component, OnInit, computed, inject, signal } from '@angular/core';

import { CategoryModel } from '@domain/models/category/category.model';
import { RecipeModel } from '@domain/models/recipe/recipe.model';
import { RecipeUsecase } from '@domain/usecase/recipe.usecase';
import { CategoriesListComponent } from '@ui/shared/organisms/categories-list/categories-list.component';
import { RecipeCardComponent } from '@ui/shared/organisms/recipe-card/recipe-card.component';

@Component({
  standalone: true,
  selector: 'app-recipe-list',
  templateUrl: 'recipe-list.component.html',
  imports: [RecipeCardComponent, CategoriesListComponent],
})
export class RecipeListComponent implements OnInit {
  private readonly recipeUseCase = inject(RecipeUsecase);
  recipes = signal<RecipeModel[]>([]);
  categories = computed(() => {
    const uniqueCategories = new Map<string, RecipeModel>();
    this.recipes().forEach((recipe) => {
      if (!uniqueCategories.has(recipe.category.id.toString())) {
        uniqueCategories.set(recipe.category.id.toString(), recipe);
      }
    });
    return Array.from(uniqueCategories.values()).map(
      (recipe) => recipe.category
    );
  });

  selectedCategory = signal<CategoryModel | null>(null);
  selectedRecipes = computed(() => {
    if (!this.selectedCategory()) {
      return this.recipes();
    }
    return this.recipes().filter(
      (recipe) => recipe.category.id === this.selectedCategory()?.id
    );
  });

  async ngOnInit() {
    const recipes = await this.recipeUseCase.getRecipes();
    this.recipes.set(recipes);
  }
}
