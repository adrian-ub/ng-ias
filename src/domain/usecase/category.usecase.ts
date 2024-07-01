import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { CategoryGateway } from '@domain/models/category/category.gateway';

@Injectable({ providedIn: 'root' })
export class CategoryUsecase {
  private readonly gateway = inject(CategoryGateway);
  getCategories() {
    return lastValueFrom(this.gateway.getCategories());
  }
}
