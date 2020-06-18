import { Component, OnInit, Input } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  backButtonText = '';
  
  constructor(
    private platform: Platform
  ) { }

  ngOnInit() {
    if (this.platform.is('ios')) {
      this.backButtonText = 'Volver';
    }
  }

}
