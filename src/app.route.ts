import {TechnoComponent} from "./app/pages/techno/techno.component";
import {MetalComponent} from "./app/pages/metal/metal.component";
import {EbmComponent} from "./app/pages/ebm/ebm.component";
import {GabberComponent} from "./app/pages/gabber/gabber.component";
import {RockComponent} from "./app/pages/rock/rock.component";
import {RockVariationComponent} from "./app/pages/rock-variation/rock-variation.component";
import {HalfTimeGrooveComponent} from "./app/pages/half-time-groove/half-time-groove.component";
import {DrumNBassComponent} from "./app/pages/drum-n-bass/drum-n-bass/drum-n-bass.component";

export const routes = [{path: 'techno', component: TechnoComponent},
  {path: 'metal', component: MetalComponent},
  {path: 'rock', component: RockComponent},
  {path: 'rock-variation', component: RockVariationComponent},
  {path: 'half-time-groove', component: HalfTimeGrooveComponent},
  {path: 'drum-n-bass', component: DrumNBassComponent},
  {path: 'gabber', component: GabberComponent},
  {path: 'ebm', component: EbmComponent},];
