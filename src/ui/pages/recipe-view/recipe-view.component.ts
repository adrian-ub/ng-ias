import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeModel } from '@domain/models/recipe/recipe.model';
import { RecipeUsecase } from '@domain/usecase/recipe.usecase';
import { TextToHtmlPipe } from '@infraestructure/helpers/text-to-html.pipe';

@Component({
  standalone: true,
  selector: 'app-recipe-view',
  templateUrl: 'recipe-view.component.html',
  imports: [TextToHtmlPipe, AsyncPipe],
})
export class RecipeViewComponent implements OnInit {
  private readonly router = inject(Router);
  recipeId = input<string>('', { alias: 'id' });
  recipeUseCase = inject(RecipeUsecase);
  recipe = signal<RecipeModel | undefined>(undefined);

  async ngOnInit() {
    try {
      const recipe = await this.recipeUseCase.getRecipe(
        Number(this.recipeId())
      );
      this.recipe.set(recipe);
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 404) {
        this.router.navigate(['**'], {
          replaceUrl: false,
          skipLocationChange: true,
        });
      }
    }
  }
}
