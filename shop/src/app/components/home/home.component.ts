import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentIndex = signal(0);
  // images = [
  //   'assets/grocery-banner.jpg',
  //   'assets/fresh-vegetables.jpg',
  //   'assets/fruits-banner.jpg'
  // ];
  images: string[] =
    ["https://storagevefe.blob.core.windows.net/angulardeveloper/items/slide-1.jpg",
      "https://storagevefe.blob.core.windows.net/angulardeveloper/items/slide-2.jpg"
    ];

  categories = [
    { name: 'Lácteos y Huevos', icon: 'egg' },
    { name: 'Snacks', icon: 'basket2' },
    { name: 'Panadería', icon: 'bread' },
    { name: 'Comida Instantánea', icon: 'cup-hot' },
    { name: 'Té y Café', icon: 'cup' },
    { name: 'Arroz y Granos', icon: 'bag' }
  ];

  constructor() {
    // Cambiar imagen cada 5 segundos
    setInterval(() => {
      this.currentIndex.update(current => (current + 1) % this.images.length);
    }, 5000);
  }
}
