import { render } from '@testing-library/angular';
import { RecipeFormComponent } from '@ui/pages/recipe-form/recipe-form.component';

describe('RecipeFormComponent', () => {
  test('should be a render component', async () => {
    const { container } = await render(RecipeFormComponent);
    expect(container).toBeInTheDocument();
  });
});
