import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartState } from "./cart.state";
import { cartFeatureKey } from "./cart.reducer";

export const selectCartState = createFeatureSelector<CartState>(cartFeatureKey);

// 
export const selectCartItems = createSelector(
    selectCartState,
    state => state.items
);

// total del carrito
export const selectCartTotal = createSelector(
    selectCartItems,
    items => items.reduce(
        (total, cartItem) =>
            total + cartItem.item.amount * cartItem.quantity, 0
    )
);

// cantidad de productos en el carrito
export const selectTotalItems = createSelector(
    selectCartItems,
    items => items.reduce((count, cartItem) => count + cartItem.quantity, 0)
)