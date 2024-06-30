import { render } from '@testing-library/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from '@app/app.component';
import { NxWelcomeComponent } from '@app/nx-welcome.component';

describe('AppComponent', () => {
  test('should render title', async () => {
    const component = await render(AppComponent, {
      imports: [RouterTestingModule, NxWelcomeComponent],
    });
    const { getByText } = component;
    expect(getByText(/Welcome ub/i)).toBeTruthy();
  });

  test(`should have as title 'ub'`, async () => {
    const component = await render(AppComponent, {
      imports: [RouterTestingModule, NxWelcomeComponent],
    });
    const { componentInstance } = component.fixture;
    expect(componentInstance.title).toEqual('ub');
  });
});
