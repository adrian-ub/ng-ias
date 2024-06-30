import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmButtonDirective } from '@components/button';
import { HlmIconComponent } from '@components/icon';
import { ToggleThemeComponent } from '@components/toggle-theme';
import { NavLinkDirective } from './nav-link.directive';
import { LogoComponent } from './logo.component';
import { HeaderMobileNavComponent } from './header-mobile-nav.component';

@Component({
  standalone: true,
  selector: 'app-header',
  host: {
    class:
      'block sticky w-full top-0 z-40 bg-background/95 bg-blur-lg p-2 sm:px-4 border-b border-border',
  },
  imports: [
    HlmButtonDirective,
    HlmIconComponent,
    ToggleThemeComponent,
    NavLinkDirective,
    HeaderMobileNavComponent,
    LogoComponent,
  ],
  template: ` <div
    class="flex items-center justify-between w-full mx-auto max-w-screen-xl"
  >
    <nav class="flex items-center">
      <a
        hlmBtn
        variant="ghost"
        class="mr-3 hidden p-1.5 sm:flex"
        routerLink="/"
      >
        <app-logo class="w-10" />
        <span class="sr-only">UB</span>
      </a>

      <app-mobile-nav class="sm:hidden" />

      <div class="hidden sm:flex sm:space-x-2">
        <a appNavLink="/">Recetas</a>
        <a appNavLink="/recipe-form">Agregar receta</a>
      </div>
    </nav>

    <div class="flex space-x-2">
      <app-toogle-theme />
    </div>
  </div>`,
})
export class HeaderComponent {}
