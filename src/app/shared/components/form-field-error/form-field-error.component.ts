import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms'


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

  @Input("form-group") formGroup: FormGroup;

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
    return this.formGroup.touched && this.formGroup.invalid;
  }

  private getErrorMessage(): string | null {
    if (this.formGroup.get('required')) {
      return "Campo obrigatório";
    }

    return null;
  }

}
