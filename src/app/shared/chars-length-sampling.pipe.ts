import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'charsLengthSampling',
  standalone: true,
})
export class CharsLengthPipe implements PipeTransform {
  transform(value: string): number {
   return CharsLengthPipe.transform(value);
  }

  public static transform(value: string): number {
    return value.trim().length
  }
}
