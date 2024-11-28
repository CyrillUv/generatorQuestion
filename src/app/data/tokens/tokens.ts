import {BehaviorSubject} from "rxjs";
import {InjectionToken} from "@angular/core";

export const AUTHORIZATION_TOKEN
  = new InjectionToken<BehaviorSubject<boolean>>('AUTHORIZATION_TOKEN')
