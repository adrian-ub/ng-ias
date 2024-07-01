import { IngredientModel } from './ingredient.model';

import { Observable } from 'rxjs';

export abstract class IngredientGateway {
  abstract getIngredients(): Observable<IngredientModel[]>;
}
