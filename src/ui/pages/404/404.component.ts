import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmButtonDirective } from '@components/button';

@Component({
  standalone: true,
  selector: 'app-404',
  imports: [HlmButtonDirective, RouterLink],
  template: `<div
    class="flex-1 flex flex-col items-center justify-center gap-4 h-[90vh]"
  >
    <div
      class="flex flex-col items-center justify-center space-y-2 text-center"
    >
      <h1 class="text-4xl font-extrabold tracking-tighter sm:text-6xl">
        Página no encontrada
      </h1>
      <p
        class="max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400"
      >
        Lo sentimos, no pudimos encontrar la página que estás buscando.
      </p>
    </div>
    <a routerLink="/" hlmBtn variant="secondary"> Go to the homepage </a>
  </div>`,
})
export class Error404Component {}
