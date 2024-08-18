import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Subject} from "rxjs";
import {Subscribers} from "./shared/subscribers";



interface Backend {
  title: string;
  planned: boolean;
  parachutes: Array<string>;
  id: string;
  readiness: boolean;
}

interface Frontend {
  name: string;
  planning: boolean;
  parachutes: Array<string>;
  id: string;
  ready: boolean;
}


class DesantAdapter {
  public static toFrontend(value: Backend): Frontend {
    return {
      name: value.title,
      planning: value.planned,
      ready: value.readiness,
      ...value
    }
  }

 public static toBackend(value: Frontend): Backend {
    return {
      title:value.name,
      planned:value.planning,
      readiness:value.ready,
      ...value
    }
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{


}
