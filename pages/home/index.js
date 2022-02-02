import { useEffect, useState } from "react"
import Twit from "../../components/Tweet"
import useUser from "../../hooks/useUser"
import { fetchLatestDevits } from "../../firebase/client"
import { colors } from "../../styles/theme"
import Create from "../../components/Icons/Create"
import Home from "../../components/Icons/Home"
import Search from "../../components/Icons/Search"
import Link from "next/link"
import Head from "next/head"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()
  useEffect(() => {
    user &&
      // fetch("http://localhost:3000/api/home_timeline")
      //   .then((res) => res.json())
      //   .then(setTimeline)
      fetchLatestDevits().then(setTimeline)
  }, [user])

  return (
    <>
      <Head>
        <title>Inicio / Tweet-IT</title>
      </Head>
      <header>
        <h2>Inicio</h2>
      </header>
      <section>
        {timeline.map(
          ({ createdAt, img, id, username, avatar, content, userId }) => {
            return (
              <Twit
                avatar={avatar}
                createdAt={createdAt}
                id={id}
                img={img}
                key={id}
                content={content}
                username={username}
                userId={userId}
              />
            )
          }
        )}
      </section>
      <nav>
        <Link href="/home">
          <a>
            <Home height={21} width={21} stroke="#09f" />
          </a>
        </Link>
        <Link href="/search">
          <a>
            <Search height={21} width={21} stroke="#09f" />
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a>
            <Create height={21} width={21} stroke="#09f" />
          </a>
        </Link>
      </nav>
      <style jsx>{`
        header {
          align-items: center;
          background: #ffffffee;
          backdrop-filter: blur(5px);
          border-bottom: 1px solid #eee;
          display: flex;
          height: 49px;
          position: sticky;
          top: 0;
          width: 100%;
        }
        h2 {
          font-weight: 800;
          font-size: 20px;
          padding-left: 15px;
        }

        section {
          flex: 1 1 auto;
        }
        nav {
          background: #fff;
          bottom: 0;
          border-top: 1px solid #eee;
          display: flex;
          height: 49px;
          position: sticky;
          width: 100%;
        }
        nav a {
          align-items: center;
          display: flex;
          flex: 1 1 auto;
          height: 100%;
          justify-content: center;
        }
        nav a:hover {
          background: radial-gradient(#0099ff22 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }
        nav a:hover > :global(svg) {
          stroke: ${colors.secondBlue};
        }
      `}</style>
    </>
  )
}
