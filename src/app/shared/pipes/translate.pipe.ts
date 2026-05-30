import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';


@Pipe({
  name: 'translate',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  constructor(
    private languageService: LanguageService
  ) {}

  transform(path: string): string {
    return this.languageService.t(path);
  }
}