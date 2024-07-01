import { Component, input } from '@angular/core';
import { CategoryModel } from '@domain/models/category/category.model';

import {
  HlmCarouselComponent,
  HlmCarouselContentComponent,
  HlmCarouselItemComponent,
} from '@components/carousel';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-categories-list',
  imports: [
    HlmCarouselComponent,
    HlmCarouselContentComponent,
    HlmCarouselItemComponent,
    RouterLink,
  ],
  template: ` <div class="flex items-center justify-center w-full py-4">
    <hlm-carousel class="w-full">
      <hlm-carousel-content>
        <hlm-carousel-item class="basis-1/6">
          <button class="relative max-w-xl mx-auto" [routerLink]="['/']">
            <img
              class="h-64 w-full object-cover rounded-md"
              src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Todas"
            />
            <div
              class="absolute inset-0 bg-gray-700 opacity-60 rounded-md"
            ></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <h2 class="text-white text-3xl font-bold text-center">Todas</h2>
            </div>
          </button>
        </hlm-carousel-item>
        @for (category of categories(); track $index) {
        <hlm-carousel-item class="basis-1/6">
          <button
            class="relative max-w-xl mx-auto"
            [routerLink]="['/']"
            [queryParams]="{ c: category.id }"
          >
            <img
              class="h-64 w-full object-cover rounded-md"
              [src]="category.photoUrl"
              [alt]="category.name"
            />
            <div
              class="absolute inset-0 bg-gray-700 opacity-60 rounded-md"
            ></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <h2 class="text-white text-3xl font-bold text-center">
                {{ category.name }}
              </h2>
            </div>
          </button>
        </hlm-carousel-item>
        }
      </hlm-carousel-content>
    </hlm-carousel>
  </div>`,
})
export class CategoriesListComponent {
  categories = input.required<CategoryModel[]>();
}
