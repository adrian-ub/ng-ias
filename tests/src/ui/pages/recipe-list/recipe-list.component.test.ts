import { render } from '@testing-library/angular';
import { RecipeListComponent } from '@ui/pages/recipe-list/recipe-list.component';

describe('RecipeListComponent', () => {
  test('should be a render component', async () => {
    const { container } = await render(RecipeListComponent);
    expect(container).toBeInTheDocument();
  });
});
