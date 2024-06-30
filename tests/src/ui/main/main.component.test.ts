import { render } from '@testing-library/angular';

import { MainComponent } from '@ui/main/main.component';

describe('MainComponent', () => {
  test('should render component', async () => {
    const component = await render(MainComponent);
    expect(component).toBeTruthy();
  });
});
