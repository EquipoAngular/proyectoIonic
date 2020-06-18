import { Component, OnInit, Input } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  backButtonText = '';

  constructor(
    private platform: Platform,
    private securityService: SecurityService
  ) { }

  ngOnInit() {
    if (this.platform.is('ios')) {
      this.backButtonText = 'Volver';
    }
  }

  logoff() {
    this.securityService.Logoff();
  }

}
