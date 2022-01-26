import { useState, useEffect } from 'react';
import Head from 'next/head'
import AppLayout from '../components/AppLayout'
import Button from '../components/Button'
import { colors } from '../styles/theme'
import { loginWithGitHub, onAuthStateChange } from '../firebase/client'

export default function Home() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    onAuthStateChange(setUser);
  }, [])

  const handleClick = () => {
    loginWithGitHub().then(user => {
      const { avatar, displayName, url } = user
      setUser(user)
      console.log("user em index", user)
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      <Head>
        <title>TwittAM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <section>
          <img src="/mordecai.png" alt="logo" />
          <h1>TwittAM</h1>
          <h2>My first app with Next.JS</h2>
          <div>
            {
              user === null &&
              <Button onClick={handleClick}
              >
                LogIn with GitHub
              </Button>
            }
            {
              user && user.avatar &&
              <div>
                <img src={user.avatar} />
                <strong>{user.displayName}</strong>
              </div>
            }
          </div>
        </section>
      </AppLayout>

      <style jsx>
        {`
        img {
          width: 120px;
        }
        div {
          margin-top: 16px;
        }
        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }
        h1 {
          color: ${colors.primary};
          font-weight: 800;
          margin-bottom: 10px;
        }
        h2 {
          color: ${colors.secondary};
          font-size: 21px
          margin-bottom: 0px;
        }
        `}
      </style>
    </>
  )
}
