import {TechnoComponent} from "./app/pages/techno/techno.component";
import {MetalComponent} from "./app/pages/metal/metal.component";
import {EbmComponent} from "./app/pages/ebm/ebm.component";
import {GabberComponent} from "./app/pages/gabber/gabber.component";

export const routes = [{path: 'techno', component: TechnoComponent},
  {path: 'metal', component: MetalComponent},
  {path: 'gabber', component: GabberComponent},
  {path: 'ebm', component: EbmComponent},];
