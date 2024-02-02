// 'use client'

// /* Core */
// import { Provider } from 'react-redux'

// /* Instruments */
// import { reduxStore } from '@/lib/redux'
// import {injectStore} from "@/app/setting/our_axios";
// console.log('ReduxStore ',reduxStore);
// injectStore(reduxStore);

// export const Providers = (props: React.PropsWithChildren) => {
//   return <Provider store={reduxStore}>{props.children}</Provider>
// }

'use client';

/* Core */
import { Provider } from 'react-redux';

/* Instruments */
import { reduxStore } from '@/lib/redux';

console.log('ReduxStore ', reduxStore);
// import {injectStore} from "@/app/setting/our_axios";
// injectStore(reduxStore);
export function Providers(props: React.PropsWithChildren) {
  return <Provider store={reduxStore}>{props.children}</Provider>;
}
