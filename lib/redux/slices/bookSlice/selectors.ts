import type { ReduxState } from '@/lib/redux';

export const selectBooks = (state: ReduxState) => state.book.books;
export const selectTopFive = (state: ReduxState) => state.book.topFive;
export const selectBestSeller = (state: ReduxState) => state.book.bestSeller;
