import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public loading = false;
  public setLoading(isVisible: boolean) {}
}
