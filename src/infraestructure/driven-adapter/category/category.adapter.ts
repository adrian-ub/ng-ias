import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { CategoryGateway } from '@domain/models/category/category.gateway';
import { CategoryModel } from '@domain/models/category/category.model';
import { CategoryMapper } from './mappers/category.mapper';

@Injectable({ providedIn: 'root' })
export class CategoryAdapter implements CategoryGateway {
  private readonly http = inject(HttpClient);
  getCategories(): Observable<CategoryModel[]> {
    return this.http
      .get<{ data: CategoryModel[] }>('/categories')
      .pipe(map(CategoryMapper.transformGetCategoriesToCategories));
  }
}
