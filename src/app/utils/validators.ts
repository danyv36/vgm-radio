import {
  ValidatorFn,
  AbstractControl,
  FormGroup,
  FormControl,
} from '@angular/forms';

export function atLeastOneSelected(): ValidatorFn {
  return (fg: FormGroup): { [key: string]: any } | null => {
    const relaxing = fg.get('categories.relaxing') as FormControl;
    const adventurous = fg.get('categories.adventurous') as FormControl;

    if (!!!relaxing.value && !!!adventurous.value) {
      return { categoryRequired: true };
    }
    return null;
  };
}
