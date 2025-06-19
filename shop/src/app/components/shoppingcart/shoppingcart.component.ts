import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectCartItems, selectCartTotal } from '../../store/cart.selector';
import { Store } from '@ngrx/store';
import { CartItem } from '../../store/cart.state';
import { removeFromCart, clearCart } from '../../store/cart.actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shoppingcart',
  imports: [],
  templateUrl: './shoppingcart.component.html',
  styleUrl: './shoppingcart.component.css'
})
export class ShoppingcartComponent {
  private toastr = inject(ToastrService);

  private store = inject(Store);
  items = toSignal(this.store.select(selectCartItems),
    { initialValue: [] as CartItem[] }
  );
  total = toSignal(
    this.store.select(selectCartTotal),
    { initialValue: 0 }
  );

  deleteItem(id: number) {
    this.toastr.error('Producto eliminado del carrito!');
    this.store.dispatch(removeFromCart({ idItem: id }));
  }

  clearCart() {
    this.toastr.error('Se limpio el carrito!');
    this.store.dispatch(clearCart());
  }


}
