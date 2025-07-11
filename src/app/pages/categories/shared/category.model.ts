import { BaseResourceModel } from "../../../shared/models/base-resource.model";

export class Category extends BaseResourceModel {
    constructor(
      public name?: string,
      public description?: string,
      public icon?: string,
      public createdAt?: Date
    ){
        super();
    }

    static fromJson(jsonData: any): Category {
        return Object.assign(new Category(), jsonData);
    }
}