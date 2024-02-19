import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCustomdirective]'
})
export class CustomdirectiveDirective {
  constructor(private control: NgControl) { }

  @HostListener('input', ['$event']) onInput(event: any) {
    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;
    const value = this.control.value;

    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1).replace(/\s+/g, ' ');
    this.control.control?.setValue(capitalizedValue, { emitEvent: false });
    event.target.setSelectionRange(start, end);
  }

}
