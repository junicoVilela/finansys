import {Component, Inject, Injector, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators, ReactiveFormsModule} from "@angular/forms";
import { NgFor, NgClass, JsonPipe } from "@angular/common";

// Imports de componentes standalone
import { BreadCrumbComponent } from "../../../shared/components/bread-crumb/bread-crumb.component";
import { PageHeaderComponent } from "../../../shared/components/page-header/page-header.component";
import { ServerErrorMessagesComponent } from "../../../shared/components/server-error-messages/server-error-messages.component";
import { FormFieldErrorComponent } from "../../../shared/components/form-field-error/form-field-error.component";

// Imports do PrimeNG
import { CalendarModule } from 'primeng/calendar';

// Imports do IMask
import { IMaskModule } from 'angular-imask';

import { Entry } from "../shared/entry.model";
import { EntryService } from "../shared/entry.service";
import { BaseResourceFormComponent } from "../../../shared/components/base-resource-form/base-resource-form.component";
import { Category } from "../../categories/shared/category.model";
import { CategoryService } from "../../categories/shared/category.service";

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    NgClass,
    JsonPipe,
    BreadCrumbComponent,
    PageHeaderComponent,
    ServerErrorMessagesComponent,
    FormFieldErrorComponent,
    CalendarModule,
    IMaskModule
  ],
  providers:[CategoryService]
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry> implements OnInit {

  categories!: Array<Category>;

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };

  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  };

  constructor(
      protected entryService: EntryService,
      protected categoryService: CategoryService,
      protected override injector: Injector
  ) {
    super(injector, new Entry(), entryService, Entry.fromJson)
  }

  override ngOnInit(): void {
    this.loadCategories();
    super.ngOnInit();
  }

  protected buildResourceForm() {
    this.resourceForm = new UntypedFormGroup({
      id: new UntypedFormControl(null),
      name: new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
      description: new UntypedFormControl(''),
      type: new UntypedFormControl('expense', [Validators.required]),
      amount: new UntypedFormControl('', [Validators.required]),
      date: new UntypedFormControl('', [Validators.required]),
      paid: new UntypedFormControl(true, [Validators.required]),
      categoryId: new UntypedFormControl('', [Validators.required])
    });
  }

  private loadCategories() {
    this.categoryService.getAll().subscribe(
        categories => this.categories = categories
    );
  }

  protected override creationPageTitle(): string {
    return "Cadastro de Novo Lançamento";
  }

  protected override updateResource() {
    super.updateResource();
    const resourceName = this.resource.name || "";
    return "Editando Lançamento: " + resourceName;
  }

}
