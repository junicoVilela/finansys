import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  static emailValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    if (!email) {
      return null;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { invalidEmail: true };
    }
    
    return null;
  }

  static cpfValidator(control: AbstractControl): ValidationErrors | null {
    const cpf = control.value;
    if (!cpf) {
      return null;
    }
    
    // Remove caracteres não numéricos
    const cleanCpf = cpf.replace(/\D/g, '');
    
    if (cleanCpf.length !== 11) {
      return { invalidCpf: true };
    }
    
    // Verifica sequências inválidas
    if (/^(\d)\1{10}$/.test(cleanCpf)) {
      return { invalidCpf: true };
    }
    
    // Validação dos dígitos verificadores
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCpf.charAt(i)) * (10 - i);
    }
    
    let digit = 11 - (sum % 11);
    if (digit === 10 || digit === 11) {
      digit = 0;
    }
    
    if (digit !== parseInt(cleanCpf.charAt(9))) {
      return { invalidCpf: true };
    }
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCpf.charAt(i)) * (11 - i);
    }
    
    digit = 11 - (sum % 11);
    if (digit === 10 || digit === 11) {
      digit = 0;
    }
    
    if (digit !== parseInt(cleanCpf.charAt(10))) {
      return { invalidCpf: true };
    }
    
    return null;
  }

  static minDecimalValue(minValue: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = parseFloat(control.value);
      if (isNaN(value) || value < minValue) {
        return { minDecimalValue: { requiredValue: minValue, actualValue: value } };
      }
      return null;
    };
  }

  static dateNotInFuture(control: AbstractControl): ValidationErrors | null {
    const date = new Date(control.value);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    
    if (date > today) {
      return { futureDate: true };
    }
    
    return null;
  }

  static getErrorMessage(fieldName: string, errors: ValidationErrors): string {
    const fieldLabel = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
    
    if (errors['required']) {
      return `${fieldLabel} é obrigatório.`;
    }
    
    if (errors['email'] || errors['invalidEmail']) {
      return `${fieldLabel} deve ter um formato válido.`;
    }
    
    if (errors['invalidCpf']) {
      return `${fieldLabel} deve ser um CPF válido.`;
    }
    
    if (errors['minlength']) {
      return `${fieldLabel} deve ter pelo menos ${errors['minlength'].requiredLength} caracteres.`;
    }
    
    if (errors['maxlength']) {
      return `${fieldLabel} deve ter no máximo ${errors['maxlength'].requiredLength} caracteres.`;
    }
    
    if (errors['min']) {
      return `${fieldLabel} deve ser maior ou igual a ${errors['min'].min}.`;
    }
    
    if (errors['max']) {
      return `${fieldLabel} deve ser menor ou igual a ${errors['max'].max}.`;
    }
    
    if (errors['minDecimalValue']) {
      return `${fieldLabel} deve ser maior ou igual a ${errors['minDecimalValue'].requiredValue}.`;
    }
    
    if (errors['futureDate']) {
      return `${fieldLabel} não pode ser uma data futura.`;
    }
    
    return `${fieldLabel} possui um valor inválido.`;
  }
} 