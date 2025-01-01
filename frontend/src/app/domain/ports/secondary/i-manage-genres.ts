import {Genre} from "../../genre";
import {InjectionToken} from "@angular/core";

export default interface IManageGenres {
  getGenres(): Promise<Genre[]>
}

export const IManageGenresToken = new InjectionToken<IManageGenres>('IManageGenres');
