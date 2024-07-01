import { SlicePipe } from '@angular/common';
import { Component, input } from '@angular/core';

import { HlmCardDirective, HlmCardContentDirective } from '@components/card';
import { HlmButtonDirective } from '@components/button';

import { RecipeModel } from '@domain/models/recipe/recipe.model';
import { HlmIconComponent, provideIcons } from '@components/icon';
import { heroHeartSolid } from '@ng-icons/heroicons/solid';

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
  ],
})
export class RecipeCardComponent {
  recipe = input.required<RecipeModel>();
}
