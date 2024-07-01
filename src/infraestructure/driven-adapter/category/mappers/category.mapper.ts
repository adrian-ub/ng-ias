import { CategoryModel } from '@domain/models/category/category.model';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CategoryMapper {
  export function transformGetCategoriesToCategories(data: {
    data: CategoryModel[];
  }) {
    return data.data;
  }
}
