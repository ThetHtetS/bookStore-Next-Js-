import type { ReduxState } from '@/lib/redux';

export const selectOrders = (state: ReduxState) => state.order.orders;
