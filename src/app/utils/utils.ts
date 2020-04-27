import { MatSnackBar } from '@angular/material/snack-bar';

export class AppUtils {
  static openSnackbar(snackbar: MatSnackBar, message: string) {
    snackbar.open(message, 'Dismiss', {
      duration: 3000,
    });
  }
}
