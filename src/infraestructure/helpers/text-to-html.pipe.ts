import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MarkdownService } from 'ngx-markdown';

@Pipe({
  standalone: true,
  name: 'textToHtml',
})
export class TextToHtmlPipe implements PipeTransform {
  private readonly markdownService = inject(MarkdownService);
  private readonly sanitizer = inject(DomSanitizer);
  async transform(value: string) {
    const html = await this.markdownService.parse(value);
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
