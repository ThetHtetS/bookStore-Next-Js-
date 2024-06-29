import type { ReduxState } from '@/lib/redux';

// eslint-disable-next-line import/prefer-default-export
export const selectCarts = (state: ReduxState) => state.cart.carts;
