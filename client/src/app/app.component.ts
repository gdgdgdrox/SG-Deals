import { Component, OnInit, Renderer2 } from '@angular/core';
import { environment } from './environments/environment.secret';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private renderer: Renderer2){}
  ngOnInit(): void {
    this.loadGoogleMapsScript();
  }

  private loadGoogleMapsScript() {
    const apiKey = environment.googleMapsApiKey;
    const script = this.renderer.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.defer = true;
    this.renderer.appendChild(document.head, script);
  }

  title = 'Good Deals';
}
