import type { ReduxState } from '@/lib/redux';

export const selectOrder_items = (state: ReduxState) => state.order_item.order_items;
