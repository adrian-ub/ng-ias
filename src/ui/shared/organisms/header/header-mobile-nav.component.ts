import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideMenu, lucideX } from '@ng-icons/lucide';

import {
  BrnSheetContentDirective,
  BrnSheetTriggerDirective,
} from '@spartan-ng/ui-sheet-brain';

import { LogoComponent } from './logo.component';
import { HlmSheetImports } from '@components/sheet';
import { HlmButtonDirective } from '@components/button';
import { HlmIconComponent } from '@components/icon';
import { HlmScrollAreaComponent } from '@components/scrollarea';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  imports: [
    BrnSheetTriggerDirective,
    BrnSheetContentDirective,
    HlmSheetImports,
    HlmButtonDirective,
    HlmIconComponent,
    HlmScrollAreaComponent,
    LogoComponent,
    RouterLink,
  ],
  providers: [provideIcons({ lucideMenu, lucideX })],
  template: `
    <hlm-sheet side="left" closeDelay="100">
      <button
        size="sm"
        id="menu-trigger"
        variant="ghost"
        brnSheetTrigger
        hlmBtn
      >
        <hlm-icon name="lucideMenu" size="sm" />
        <span class="sr-only">Open menu</span>
      </button>
      <hlm-sheet-content class="pb-0 pr-0" *brnSheetContent="let ctx">
        <button hlmSheetClose>
          <span class="sr-only">Close</span>
          <hlm-icon class="flex w-4 h-4" name="lucideX" />
        </button>
        <div class="flex items-center pb-2">
          <a
            (click)="ctx.close()"
            hlmBtn
            variant="ghost"
            class="mr-4 p-1.5"
            routerLink="/"
          >
            <app-logo class="w-12 text-primary" />
          </a>
          <span class="sr-only">UB</span>
        </div>
        <hlm-scroll-area class="h-[calc(100vh-8rem)]">
          <div class="flex flex-col p-2 pb-4 space-y-1">
            <a
              (click)="ctx.close()"
              class="px-2 py-1 text-foreground hover:underline"
              routerLink="/"
            >
              Recetas
            </a>
            <a
              (click)="ctx.close()"
              class="px-2 py-1 text-foreground hover:underline"
              routerLink="/recipe-form"
            >
              Agregar receta
            </a>
          </div>
        </hlm-scroll-area>
      </hlm-sheet-content>
    </hlm-sheet>
  `,
})
export class HeaderMobileNavComponent {}
