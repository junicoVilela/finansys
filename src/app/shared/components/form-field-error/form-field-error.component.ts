import { Component, OnInit, Input } from '@angular/core';
import {AbstractControl, UntypedFormControl, FormGroup} from '@angular/forms'


@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
      {{errorMessage}}
    </p>
  `,
  styleUrls: ['./form-field-error.component.scss']
})
export class FormFieldErrorComponent implements OnInit {

  @Input("form-control") formControl:  UntypedFormControl;

  constructor() { }

  ngOnInit(): void {
  }

  public get errorMessage(): string | null {
    if (this.mustShowErrorMessage()) {
      return this.getErrorMessage();
    }
    return null
  }

  private mustShowErrorMessage(): boolean | undefined {
    return this.formControl.touched && this.formControl.invalid;
  }

  private getErrorMessage(): string | null {
    if (!(this.formControl.errors) || this.formControl.errors['required']) {
      return "Campo obrigatório!";
    }

    if (!(this.formControl.errors) || this.formControl.errors['email']) {
      return "Formato de email inválido!";
    }

    if (!(this.formControl.errors) || this.formControl.errors['minlength']) {
      const requiredLength = this.formControl.errors['minlength']?.['requiredLength']
      return `Deve conter no mínimo ${requiredLength} caracteres` ;
    }

    if (!(this.formControl.errors) || this.formControl.errors['maxlength']) {
      const requiredLength = this.formControl.errors['maxlength']?.['requiredLength']
      return `Deve conter no máximo ${requiredLength} caracteres` ;
    }

    return null;
  }

}
