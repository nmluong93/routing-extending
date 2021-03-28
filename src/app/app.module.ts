import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeroesModule } from './heroes/heroes.module';

import { ComposeMessageComponent } from './compose-message/compose-message.component';
// import { CrisisCenterModule } from './crisis-center/crisis-center.module';
// import { AdminModule } from './admin/admin.module';
import { LoginComponent } from './auth/login/login.component';
import { AuthModule } from './auth/auth.module';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';
import { Router } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ComposeMessageComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HeroesModule,
    // CrisisCenterModule, lazy loading.s
    BrowserAnimationsModule,
    // AdminModule, for lazy loading
    AuthModule,
    AppRoutingModule,
  ],
  providers: [SelectivePreloadingStrategyService],
  bootstrap: [AppComponent]
})
export class AppModule {
  
  constructor(router : Router) {
    // Use a custom replacer to display function names in the route configs
    const replacer = (key :any, value : any) => (typeof value === 'function') ? value.name! : value;

    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}
