export class RexExp {
  //метод определяющий пароль сложным
  public static strongPasswordPattern(password: string): boolean {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password,
    );
  }

  //метод определяющий пароль средним по сложности
  public static mediumPasswordPattern(password: string): boolean {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
  }
}
