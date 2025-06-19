import { Component, inject } from '@angular/core';
import { Item, ItemService } from '../../services/item.service';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError } from 'rxjs';
import { selectTotalItems } from '../../store/cart.selector';
import { addToCart } from '../../store/cart.actions';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-products',
  imports: [CommonModule,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  private service = inject(ItemService);
  private store = inject(Store);
  private toastr = inject(ToastrService);

  items = toSignal(this.service.getItems().pipe(
    catchError((error) => {
      console.error('Error fetching items:', error);
      return [];
    })
  ), { initialValue: [] as Item[] });

  countItems = toSignal(this.store
    .select(selectTotalItems), 
    { initialValue: 0 }
  );

  addToCartItem(item: Item) {
    this.store.dispatch(addToCart({ item }));
    this.toastr.success('Item agregado al carrito!');
    console.log('Item added to cart:', item);
  }

}
