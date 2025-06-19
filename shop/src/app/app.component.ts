import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectTotalItems } from './store/cart.selector';
import { ItemService } from './services/item.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'shop';
  private service = inject(ItemService);
  private store = inject(Store);


  countItems = toSignal(this.store
    .select(selectTotalItems),
    { initialValue: 0 }
  );
}
