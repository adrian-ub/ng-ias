import { AbstractControl } from '@angular/forms';

const regExp = new RegExp(
  '^((http|https)://)[-a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)$'
);

export function ValidateUrl(control: AbstractControl) {
  if (!!control.value && !regExp.test(control.value)) {
    return { invalidUrl: true };
  }
  return null;
}
