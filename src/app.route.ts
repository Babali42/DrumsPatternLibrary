import {TechnoComponent} from "./app/pages/techno/techno.component";
import {MetalComponent} from "./app/pages/metal/metal.component";
import {EbmComponent} from "./app/pages/ebm/ebm.component";
import {GabberComponent} from "./app/pages/gabber/gabber.component";
import {RockComponent} from "./app/pages/rock/rock.component";

export const routes = [{path: 'techno', component: TechnoComponent},
  {path: 'metal', component: MetalComponent},
  {path: 'rock', component: RockComponent},
  {path: 'gabber', component: GabberComponent},
  {path: 'ebm', component: EbmComponent},];
