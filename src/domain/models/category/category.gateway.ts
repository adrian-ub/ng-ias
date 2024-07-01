import { CategoryModel } from './category.model';

import { Observable } from 'rxjs';

export abstract class CategoryGateway {
  abstract getCategories(): Observable<CategoryModel[]>;
}
