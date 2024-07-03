import { SlicePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';

import { HlmCardDirective, HlmCardContentDirective } from '@components/card';
import { HlmButtonDirective } from '@components/button';

import { RecipeModel } from '@domain/models/recipe/recipe.model';
import { HlmIconComponent, provideIcons } from '@components/icon';
import { heroHeartSolid } from '@ng-icons/heroicons/solid';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-recipe-card',
  templateUrl: 'recipe-card.component.html',
  providers: [provideIcons({ heroHeartSolid })],
  imports: [
    HlmCardDirective,
    HlmCardContentDirective,
    HlmButtonDirective,
    HlmIconComponent,
    SlicePipe,
    RouterLink,
  ],
})
export class RecipeCardComponent {
  recipe = input.required<RecipeModel>();
  markFavorite = output<RecipeModel>();
}
