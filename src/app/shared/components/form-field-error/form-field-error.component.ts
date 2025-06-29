import { Component, OnInit, Input } from '@angular/core';
import {AbstractControl} from '@angular/forms'

@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
      {{errorMessage}}
    </p>
  `,
  styleUrls: ['./form-field-error.component.scss'],
  standalone: true,
  imports: []
})
export class FormFieldErrorComponent implements OnInit {

  @Input("form-control") formControl: AbstractControl | null;

  constructor() { }

  ngOnInit(): void {
  }

  public get errorMessage(): string | null {
    if (!this.formControl?.touched || !this.formControl?.invalid) {
      return null;
    }

    const errors = this.formControl.errors;
    if (!errors) return null;

    if (errors['required']) {
      return "Campo obrigatório!";
    }

    if (errors['email']) {
      return "Formato de email inválido!";
    }

    if (errors['minlength']) {
      const requiredLength = errors['minlength']['requiredLength'];
      return `Deve conter no mínimo ${requiredLength} caracteres`;
    }

    if (errors['maxlength']) {
      const requiredLength = errors['maxlength']['requiredLength'];
      return `Deve conter no máximo ${requiredLength} caracteres`;
    }

    return null;
  }
}
