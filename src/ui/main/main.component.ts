import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ToggleThemeComponent } from '@components/toggle-theme';
import { HeaderComponent } from '@ui/shared/organisms/header/header.component';

@Component({
  standalone: true,
  imports: [RouterOutlet, ToggleThemeComponent, HeaderComponent],
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  title = 'ub';
}
