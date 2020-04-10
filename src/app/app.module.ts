import {ModuleWithProviders, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {QuizService} from './services/quiz.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {IonicStorageModule} from '@ionic/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {TokenInterceptor} from './interceptors/token.interceptor';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase) as ModuleWithProviders<AngularFireModule>,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        IonicStorageModule.forRoot()
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        QuizService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
