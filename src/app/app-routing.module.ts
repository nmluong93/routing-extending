import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './auth/auth.guard';
import { ComposeMessageComponent } from './compose-message/compose-message.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';

const routes: Routes = [
  { path: '', 
    // redirectTo: '/heroes',
    redirectTo : '/superheroes',
    pathMatch: 'full' 
  },
  /**This is for defining route for secondary - named outlet e.g in this case : name = popup. */
  { path: 'compose', component: ComposeMessageComponent, outlet: 'popup' },
  {
    // for lazily load admin module.
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    // canLoad : [AuthGuard] // only load Admin module when user logged in successfully.
    //Currently, the AdminModule does not preload because CanLoad is blocking it.
  },
  // Lazy loading the Crisis-center module and preloading it
  {
    path: 'crisis-center',
    loadChildren: () => import('./crisis-center/crisis-center.module').then(m => m.CrisisCenterModule),
    data: { preload: true }
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: true, // for debugging purpose only
    preloadingStrategy: 
    // PreloadAllModules // preload all lazy modules.
                          SelectivePreloadingStrategyService // selectively preload instead of PreloadAllModules
    /**
     * This configures the Router preloader to immediately load all lazy loaded routes (routes with a loadChildren property).
      When you visit http://localhost:4200, the /heroes route loads immediately upon launch and the router starts loading the CrisisCenterModule right after the HeroesModule loads.
      Currently, the AdminModule does not preload because CanLoad is blocking it.
     */
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
