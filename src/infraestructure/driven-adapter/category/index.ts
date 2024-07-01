import { Provider } from '@angular/core';
import { CategoryGateway } from '@domain/models/category/category.gateway';
import { CategoryAdapter } from './category.adapter';

export function provideCategory(): Provider {
  return {
    provide: CategoryGateway,
    useClass: CategoryAdapter,
  };
}
