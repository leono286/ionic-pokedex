import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Plugins } from '@capacitor/core';


const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      setTimeout(() => {
        SplashScreen.hide();
      }, 900);
    });

    if (this.platform.is('android') && window.hasOwnProperty('NavigationBar')) {
      const navigationBarColor = '#000000';
      const ligthNavigationBar = true;
      window['NavigationBar'].backgroundColorByHexString(navigationBarColor, ligthNavigationBar);
    }

  }
}
