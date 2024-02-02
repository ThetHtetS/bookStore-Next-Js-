import type { ReduxState } from '@/lib/redux';

export const selectCarts = (state: ReduxState) => state.cart.carts;
