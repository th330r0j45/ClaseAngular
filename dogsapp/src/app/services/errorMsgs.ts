import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

export function formErrors(
  form: FormGroup,
  control: string
): boolean | undefined {
  const getControl: AbstractControl<any, any> | undefined = form.controls[control];
  if (!getControl) {
    console.warn(`Control '${control}' no encontrado en el formulario.`);
    return undefined;
  }

  getControl.valueChanges.subscribe(() => {
    getControl.markAsTouched();
  });

  return getControl.invalid && (getControl.dirty || getControl.touched || getControl.errors?.['required']);
}

export function formErrorsGroup(form: FormGroup, formGroupName: string, field: string) {
  let control = form.get(`${formGroupName}.${field}`);
  return !control?.valid && (control?.touched || control?.dirty);
}

export function formErrorsArray(form: FormGroup, formArrayName: string, index: number, field: string) {
  let control = form.get(formArrayName) as FormArray;

  return ((control.controls[index].get(field)?.touched ||
    control.controls[index].get(field)?.dirty)
    &&
    !control.controls[index].get(field)?.valid);
}

export function getErrorMsg(form: FormGroup, field: string): string | null {
  let message: string | null = null;
  const getControl = form.get(field);
  if (getControl) {
    if (getControl.hasError('required')) {
      message = 'Completa este campo';
    }
    if (getControl.hasError('minlength')) {
      message = 'El valor no cuenta con la longitud mínima';
    }
    if (getControl.hasError('maxlength')) {
      message = 'El valor ha excedido su longitud máxima';
    }
    if (getControl.hasError('min')) {
      message = 'El valor esta por debajo del valor mínimo requerido';
    }
    if (getControl.hasError('max')) {
      message = 'El valor esta por encima del valor máximo requerido';
    }
    if (getControl.hasError('pattern')) {
      message = 'El campo no cumple con los criterios válidos';
    }
  }
  return message;
}

export function getErrorMsgGroup(form: FormGroup, formGroupName: string, field: string): string | null {
  let message: string | null = null;
  let group = form.get(`${formGroupName}.${field}`);
  if (group && (group.touched || group.dirty)) {
    if (group.hasError('required'))
      message = '*Este campo es obligatorio';
    else if (group.hasError('pattern'))
      message = '*El email debe tener un formato válido';
    else if (group.hasError('minlength')) {
      let errorContent = group.getError('minlength');
      let nlen: number = errorContent.requiredLength;
      message = `El campo debe de tener mínimo ${nlen} caracteres`;
    }
    else if (group.hasError('maxlength')) {
      let errorContent = group.getError('maxlength');
      let nlen: number = errorContent.requiredLength;
      message = `El campo debe de tener máximo ${nlen} caracteres`;

    }
    else if (group.hasError('email')) {
      message = 'El correo no es correcto';
    }

  }

  return message;
}


export function getErrorMsgArray(form: FormGroup, formArrayName: string, index: number, field: string): string | null {
  let message: string | null = null;
  let array = form.get(formArrayName) as FormArray;
  if (array && (array.touched || array.dirty)) {
    let control = array.controls[index].get(field);
    if (control) {
      if (control.hasError('required'))
        message = '*Este campo es obligatorio';
      else if (control.hasError('pattern'))
        message = '*El email debe tener un formato válido';
      else if (control.hasError('minlength')) {
        let errorContent = control.getError('minlength');
        let nlen: number = errorContent.requiredLength;
        message = `El campo debe de tener minímo ${nlen} carácteres`;
      }
      else if (control.hasError('maxlength')) {
        let errorContent = control.getError('maxlength');
        let nlen: number = errorContent.requiredLength;
        message = `El campo debe de tener máximo ${nlen} carácteres`;

      }
      else if (control.hasError('email')) {
        message = 'El correo no es correcto';
      }

    }
  }

  return message;
}

