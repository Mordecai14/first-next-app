import { useEffect, useState } from "react"
import AppLayout from "../../components/AppLayout"
import Twit from "../../components/Tweet"
import useUser from "../../hooks/useUser"
import { fetchLatestDevits } from "../../firebase/client"

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
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map(
            ({ createdAt, id, username, avatar, content, userId }) => {
              return (
                <Twit
                  avatar={avatar}
                  createdAt={createdAt}
                  id={id}
                  key={id}
                  content={content}
                  username={username}
                  userId={userId}
                />
              )
            }
          )}
        </section>
        <nav></nav>
      </AppLayout>
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
        }
        nav {
          background: #fff;
          bottom: 0;
          border-top: 1px solid #eee;
          height: 49px;
          position: sticky;
          width: 100%;
        }
      `}</style>
    </>
  )
}
