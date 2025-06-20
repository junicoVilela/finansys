import {Component, Injector, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators, ReactiveFormsModule} from "@angular/forms";
import { NgFor, NgClass, JsonPipe } from "@angular/common";
import { BreadCrumbComponent } from "../../../shared/components/bread-crumb/bread-crumb.component";
import { PageHeaderComponent } from "../../../shared/components/page-header/page-header.component";
import { ServerErrorMessagesComponent } from "../../../shared/components/server-error-messages/server-error-messages.component";
import { FormFieldErrorComponent } from "../../../shared/components/form-field-error/form-field-error.component";
import { CalendarModule } from 'primeng/calendar';
import { NgxMaskDirective } from 'ngx-mask';
import { PrimeNGConfig } from 'primeng/api';
import { switchMap } from 'rxjs/operators';

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
    BreadCrumbComponent,
    PageHeaderComponent,
    ServerErrorMessagesComponent,
    FormFieldErrorComponent,
    CalendarModule,
    NgxMaskDirective
  ],
  providers:[CategoryService]
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry> implements OnInit {

  categories!: Array<Category>;

  constructor(
      protected entryService: EntryService,
      protected categoryService: CategoryService,
      protected override injector: Injector,
      private primengConfig: PrimeNGConfig
  ) {
    super(injector, new Entry(), entryService, Entry.fromJson)
  }

  override ngOnInit(): void {
    this.configurePrimeNGLocale();
    this.loadCategories();
    super.ngOnInit();
  }



  private configurePrimeNGLocale(): void {
    this.primengConfig.setTranslation({
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
          'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'Sm'
    });
  }

  /**
   * Sobrescreve o patchValue do formulário para aplicar conversão de data automática
   */
  override buildResourceForm() {
    this.resourceForm = new UntypedFormGroup({
      id: new UntypedFormControl(null),
      name: new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
      description: new UntypedFormControl(''),
      type: new UntypedFormControl('expense', [Validators.required]),
      amount: new UntypedFormControl('', [Validators.required]),
      date: new UntypedFormControl(new Date(), [Validators.required]),
      paid: new UntypedFormControl(true, [Validators.required]),
      categoryId: new UntypedFormControl('', [Validators.required])
    });

    // Intercepta o patchValue para conversão automática de data (carregamento)
    const originalPatchValue = this.resourceForm.patchValue.bind(this.resourceForm);
    this.resourceForm.patchValue = (value: any, options?: any) => {
      if (value && value.date && typeof value.date === 'string') {
        value = {
          ...value,
          date: DateUtils.stringToDate(value.date)
        };
      }
      return originalPatchValue(value, options);
    };

    // Intercepta o value getter para conversão automática na submissão
    const originalValueGetter = Object.getOwnPropertyDescriptor(this.resourceForm, 'value')?.get || 
                               (() => this.resourceForm.getRawValue());
    
    Object.defineProperty(this.resourceForm, 'value', {
      get: () => {
        const formValue = originalValueGetter.call(this.resourceForm);
        if (formValue.date instanceof Date) {
          return {
            ...formValue,
            date: DateUtils.dateToString(formValue.date)
          };
        }
        return formValue;
      },
      configurable: true
    });
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

  protected override creationPageTitle(): string {
    return "Cadastro de Novo Lançamento";
  }

  protected override editionPageTitle(): string {
    const resourceName = this.resource.name || "";
    return "Editando Lançamento: " + resourceName;
  }

}
