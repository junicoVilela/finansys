import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from "../../../shared/services/base-resource.service";
import { Category } from "./category.model";

@Injectable({
  providedIn: 'any'
})
export class CategoryService extends BaseResourceService<Category>{

  constructor(protected override injector: Injector) {
    super("api/categories", injector, Category.fromJson)
  }

}
