import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Entry } from "../shared/entry.model";
import { EntryService } from "../shared/entry.service";

import { switchMap } from "rxjs/operators";

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {

  currentAction!: string;
  pageTitle!: string;
  serverErrorMessages: any = null;
  submittingForm: boolean = false;
  entry: Entry = new Entry();
  entryForm!: FormGroup;


  constructor(
      private entryService: EntryService,
      private toastrService: ToastrService,
      private route: ActivatedRoute,
      private router: Router
  ) { }

  get f(){
    return this.entryForm.controls;
  }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadEntry();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if(this.currentAction == "new") {
      this.createEntry();
    } else {
      this.updateEntry();
    }
  }

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path == 'new') {
      this.currentAction = "new";
    } else {
      this.currentAction = "edit";
    }
  }

  private buildEntryForm() {
    this.entryForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl(''),
      type: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      paid: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required])
    });
  }

  private loadEntry() {
    if (this.currentAction == 'edit') {

      this.route.paramMap.pipe(
        switchMap(params => this.entryService.getById(+params.get("id")!))
      ).subscribe(
          (entry) => {
            this.entry = entry;
            this.entryForm.patchValue(entry)
          },
          (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
      )
    }
  }

  private setPageTitle() {
    if (this.currentAction == 'new') {
      this.pageTitle = "Cadastro de Novo Lançamento";
    } else {
      const entryName = this.entry.name || "";
      this.pageTitle = "Editando Lançamento: " + entryName;
    }
  }

  private createEntry() {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);

    this.entryService.create(entry)
        .subscribe(
            entry => this.actionsForSuccess(entry),
            error => this.actionsForError(error)
        )
  }

  private updateEntry() {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);

    this.entryService.update(entry).subscribe(
        entry => this.actionsForSuccess(entry),
        error => this.actionsForError(error)
    )
  }

  private actionsForSuccess(entry: Entry) {
    this.toastrService.success("Solicitação processada com sucesso!");

    this.router.navigateByUrl("entries", {skipLocationChange: true}).then(
        () => this.router.navigate(["entries", entry.id, "edit"])
    )
  }

  private actionsForError(error: any) {
    this.toastrService.error("Ocorreu um erro ao processar a sua solicitação!");

    this.submittingForm = false;

    if(error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, tente novamente mais tarde"];
    }
  }

}
