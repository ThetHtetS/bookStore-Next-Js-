/* Components */
import { Providers } from '@/lib/providers';
// import { Nav } from './components/Nav'

/* Instruments */
//import styles from './styles/layout.module.css';
import '../styles/globals.css';
import Nav from '../components/User/Nav';

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <section>
            <Nav />
            {/* <Nav /> */}

            {/* <header className={styles.header}>
              <img src="/logo.svg" className={styles.logo} alt="logo" />
            </header> */}

            <main>{props.children}</main>
            {/*
            <footer className={styles.footer}>
              <span>Learn </span>
              <a
                className={styles.link}
                href="https://reactjs.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                React
              </a>
              <span>, </span>
              <a
                className={styles.link}
                href="https://redux.js.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Redux
              </a>
              <span>, </span>
              <a
                className={styles.link}
                href="https://redux-toolkit.js.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Redux Toolkit
              </a>
              ,<span> and </span>
              <a
                className={styles.link}
                href="https://react-redux.js.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                React Redux
              </a>
            </footer> */}
          </section>
        </body>
      </html>
    </Providers>
  );
}
