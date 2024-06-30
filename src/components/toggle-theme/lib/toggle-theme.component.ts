import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { HlmButtonDirective } from '@components/button';
import { HlmIconComponent, provideIcons } from '@components/icon';
import { HlmMenuComponent, HlmMenuImports } from '@components/menu';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';

import { DarkMode, ToggleThemeService } from './toggle-theme.service';
import { lucideMoon, lucideSunMoon } from '@ng-icons/lucide';

@Component({
  standalone: true,
  selector: 'app-toogle-theme',
  imports: [
    BrnMenuTriggerDirective,
    HlmMenuImports,
    HlmButtonDirective,
    HlmIconComponent,
    AsyncPipe,
    HlmMenuComponent,
  ],
  providers: [provideIcons({ lucideMoon, lucideSunMoon })],
  template: `
    <button
      size="sm"
      variant="ghost"
      align="end"
      [brnMenuTriggerFor]="theme"
      hlmBtn
    >
      @if((theme$ | async) === 'light') {
      <hlm-icon name="lucideSunMoon" size="sm" />
      } @else {
      <hlm-icon name="lucideMoon" size="sm" />
      }
      <span class="sr-only">Open menu to change theme</span>
    </button>
    <ng-template #theme>
      <hlm-menu class="w-40">
        <button
          hlmMenuItemCheckbox
          [checked]="(theme$ | async) === 'light'"
          (click)="setTheme('light')"
        >
          <hlm-menu-item-check />
          Light
        </button>
        <button
          hlmMenuItemCheckbox
          [checked]="(theme$ | async) === 'dark'"
          (click)="setTheme('dark')"
        >
          <hlm-menu-item-check />
          Dark
        </button>
        <button
          hlmMenuItemCheckbox
          [checked]="(theme$ | async) === 'system'"
          (click)="setTheme('system')"
        >
          <hlm-menu-item-check />
          System
        </button>
      </hlm-menu>
    </ng-template>
  `,
})
export class ToggleThemeComponent {
  private _themeService = inject(ToggleThemeService);
  theme$ = this._themeService.darkMode$;
  public setTheme(theme: DarkMode) {
    this._themeService.setDarkMode(theme);
  }
}