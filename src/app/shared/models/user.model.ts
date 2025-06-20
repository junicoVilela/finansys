import { BaseResourceModel } from "./base-resource.model";

export class User extends BaseResourceModel {
  constructor(
    public name?: string,
    public email?: string,
    public password?: string,
    public confirmPassword?: string,
    public avatar?: string,
    public isActive?: boolean,
    public createdAt?: string,
    public updatedAt?: string
  ) {
    super();
  }

  static fromJson(jsonData: any): User {
    return Object.assign(new User(), jsonData);
  }

  get initials(): string {
    if (!this.name) return 'US';
    const names = this.name.split(' ');
    if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  }

  get displayName(): string {
    return this.name || this.email || 'Usuário';
  }
} 