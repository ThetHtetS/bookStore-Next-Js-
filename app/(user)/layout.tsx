/* Components */
import { Providers } from '@/lib/providers';
// import { Nav } from './components/Nav'
import { Footer } from 'flowbite-react';
import Link from 'next/link';
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from 'react-icons/bs';
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
            <Footer container className="border border-t-8 border-teal-500">
              <div className="w-full max-w-7xl mx-auto">
                <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                  <div className="mt-5">
                    <Link
                      href="/"
                      className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
                    >
                      <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                        THET
                      </span>
                      BOOKSTORE
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                    <div>
                      <Footer.Title title="About" />
                      <Footer.LinkGroup col>
                        <Footer.Link
                          href="https://www.100jsprojects.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          100 Books
                        </Footer.Link>
                        <Footer.Link
                          href="/about"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          BOOKSTORE
                        </Footer.Link>
                      </Footer.LinkGroup>
                    </div>
                    <div>
                      <Footer.Title title="Follow us" />
                      <Footer.LinkGroup col>
                        <Footer.Link
                          href="https://www.github.com/sahandghavidel"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Github
                        </Footer.Link>
                        <Footer.Link href="#">Discord</Footer.Link>
                      </Footer.LinkGroup>
                    </div>
                    <div>
                      <Footer.Title title="Legal" />
                      <Footer.LinkGroup col>
                        <Footer.Link href="#">Privacy Policy</Footer.Link>
                        <Footer.Link href="#">
                          Terms &amp; Conditions
                        </Footer.Link>
                      </Footer.LinkGroup>
                    </div>
                  </div>
                </div>
                <Footer.Divider />
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                  <Footer.Copyright
                    href="#"
                    by="Thet Htet Soe"
                    year={new Date().getFullYear()}
                  />
                  <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                    <Footer.Icon href="#" icon={BsFacebook} />
                    <Footer.Icon href="#" icon={BsInstagram} />
                    <Footer.Icon href="#" icon={BsTwitter} />
                    <Footer.Icon
                      href="https://github.com/sahandghavidel"
                      icon={BsGithub}
                    />
                    <Footer.Icon href="#" icon={BsDribbble} />
                  </div>
                </div>
              </div>
            </Footer>
          </section>
        </body>
      </html>
    </Providers>
  );
}
