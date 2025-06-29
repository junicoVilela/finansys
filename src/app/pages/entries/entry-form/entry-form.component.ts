import {Component, Injector, OnInit, ChangeDetectorRef} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators, ReactiveFormsModule} from "@angular/forms";
import { NgFor, NgClass, NgIf, CommonModule, CurrencyPipe, DatePipe } from "@angular/common";
import { RouterModule } from "@angular/router";
import { BreadCrumbComponent } from "../../../shared/components/bread-crumb/bread-crumb.component";
import { PageHeaderComponent } from "../../../shared/components/page-header/page-header.component";
import { ServerErrorMessagesComponent } from "../../../shared/components/server-error-messages/server-error-messages.component";
import { FormFieldErrorComponent } from "../../../shared/components/form-field-error/form-field-error.component";
import { NgxMaskDirective } from 'ngx-mask';

import { Entry } from "../shared/entry.model";
import { EntryService } from "../shared/entry.service";
import { BaseResourceFormComponent } from "../../../shared/components/base-resource-form/base-resource-form.component";
import { Category } from "../../categories/shared/category.model";
import { CategoryService } from "../../categories/shared/category.service";
import { DateUtils } from "../../../shared/utils/date.utils";

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    NgClass,
    NgIf,
    CommonModule,
    CurrencyPipe,
    DatePipe,
    RouterModule,
    BreadCrumbComponent,
    PageHeaderComponent,
    ServerErrorMessagesComponent,
    FormFieldErrorComponent,
    NgxMaskDirective
  ],
  providers:[CategoryService]
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry> implements OnInit {

  categories!: Array<Category>;
  private cd: ChangeDetectorRef;

  get isEditMode(): boolean {
    return this.resource.id !== null && this.resource.id !== undefined;
  }

  get pageSubtitle(): string {
    return this.isEditMode 
      ? 'Edite as informações do lançamento' 
      : 'Registre uma nova receita ou despesa';
  }

  constructor(
      protected entryService: EntryService,
      protected categoryService: CategoryService,
      protected override injector: Injector
  ) {
    super(injector, new Entry(), entryService, Entry.fromJson)
    this.cd = injector.get(ChangeDetectorRef);
  }

  override ngOnInit(): void {
    this.loadCategories();
    super.ngOnInit();
    
    this.setPageTitle();
    
    this.cd.detectChanges();
  }

  override buildResourceForm() {
    this.resourceForm = new UntypedFormGroup({
      id: new UntypedFormControl(null),
      name: new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
      description: new UntypedFormControl(''),
      type: new UntypedFormControl('expense', [Validators.required]),
      amount: new UntypedFormControl('', [Validators.required]),
      date: new UntypedFormControl(DateUtils.dateToInputString(new Date()), [Validators.required]),
      paid: new UntypedFormControl(true, [Validators.required]),
      categoryId: new UntypedFormControl('', [Validators.required])
    });

    const originalPatchValue = this.resourceForm.patchValue.bind(this.resourceForm);
    this.resourceForm.patchValue = (value: any, options?: any) => {
      if (value && value.date && typeof value.date === 'string') {
        value = {
          ...value,
          date: DateUtils.dateToInputString(value.date)
        };
      }
      return originalPatchValue(value, options);
    };
  }

  private loadCategories() {
    this.categoryService.getAll().subscribe(
        categories => this.categories = categories
    );
  }

  setPaidStatus(isPaid: boolean) {
    this.resourceForm.get('paid')?.setValue(isPaid);
    this.resourceForm.get('paid')?.markAsTouched();
  }

  setType(type: string) {
    this.resourceForm.get('type')?.setValue(type);
    this.resourceForm.get('type')?.markAsTouched();
  }

  override submitForm() {
    if (this.resourceForm.valid) {
      const formValue = this.resourceForm.getRawValue();
      if (formValue.date) {
        const convertedValue = {
          ...formValue,
          date: DateUtils.inputStringToDateString(formValue.date)
        };
        this.resourceForm.patchValue(convertedValue);
      }
      
      super.submitForm();
    } else {
      Object.keys(this.resourceForm.controls).forEach(key => {
        const control = this.resourceForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }

  protected override creationPageTitle(): string {
    return "Cadastro de Novo Lançamento";
  }

  protected override editionPageTitle(): string {
    const resourceName = this.resource.name || "";
    return "Editando Lançamento: " + resourceName;
  }

}
