import type { ReduxState } from '@/lib/redux';

export const selectOrders = (state: ReduxState) => state.order.orders;
export const selectMonthlyOrders = (state: ReduxState) =>
  state.order.monthlyOrder;
