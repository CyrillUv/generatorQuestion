import { RexExp } from './rex-exp';

export class PasswordComplexity {
  public static determinantPasswordComplexity(
    password: string,
  ): 'strong' | 'medium' | 'weak' | null {
    if (password) {
      if (password.length < 6) {
        return 'weak';
      }
      if (RexExp.strongPasswordPattern(password)) {
        return 'strong';
      } else if (RexExp.mediumPasswordPattern(password)) {
        return 'medium';
      } else {
        return 'weak';
      }
    } else {
      return null;
    }
  }
}
