import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { toast } from 'ngx-sonner';
import { HlmToasterComponent } from '@components/sonner';
import { CategoryModel } from '@domain/models/category/category.model';
import { RecipeModel } from '@domain/models/recipe/recipe.model';
import { RecipeUsecase } from '@domain/usecase/recipe.usecase';
import { CategoriesListComponent } from '@ui/shared/organisms/categories-list/categories-list.component';
import { RecipeCardComponent } from '@ui/shared/organisms/recipe-card/recipe-card.component';

@Component({
  standalone: true,
  selector: 'app-recipe-list',
  templateUrl: 'recipe-list.component.html',
  imports: [RecipeCardComponent, CategoriesListComponent, HlmToasterComponent],
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
    return this.recipes().filter((recipe) => {
      if (this.selectedCategory() === null) {
        return true;
      }
      return this.selectedCategory()?.id === recipe.category.id;
    });
  });

  async ngOnInit() {
    const recipes = await this.recipeUseCase.getRecipes();
    this.recipes.set(recipes);
  }

  async markFavorite(recipe: RecipeModel) {
    await this.recipeUseCase.markFavorite(recipe.id);
    const recipes = await this.recipeUseCase.getRecipes();
    this.recipes.set(recipes);
    toast(
      `Receta ${!recipe.isFavorite ? 'marcada' : 'quitada'} como favorita`,
      {
        action: {
          label: 'Deshacer',
          onClick: () =>
            this.markFavorite({ ...recipe, isFavorite: !recipe.isFavorite }),
        },
      }
    );
  }
}
