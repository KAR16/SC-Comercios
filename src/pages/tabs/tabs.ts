import { Component } from '@angular/core';
/*import { NavController } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';*/

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { UserPage } from '../user/user';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = UserPage;

  constructor() {}
}
