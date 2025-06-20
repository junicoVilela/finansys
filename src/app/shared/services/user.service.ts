import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from './base-resource.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseResourceService<User> {

  constructor(protected override injector: Injector) {
    super("users", injector, User.fromJson);
  }
} 