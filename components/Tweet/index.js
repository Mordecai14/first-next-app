import Avatar from "../Avatar"
import useTimeAgo from "../../hooks/useTimeAgo"
import useDateTimeFormat from "../../hooks/useDateTimeFormat"

const Twit = ({ avatar, username, content, id, img, createdAt }) => {
  const timeAgo = useTimeAgo(createdAt)
  const createdAtFormated = useDateTimeFormat(createdAt)

  return (
    <>
      <article>
        <div>
          <Avatar alt={username} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{username}</strong>
            <span> ~ </span>
            <time title={createdAtFormated}>{timeAgo}</time>
          </header>
          <p>{content}</p>
          {img && <img src={img} />}
        </section>
      </article>
      <style jsx>{`
        article {
          border-bottom: 2px solid #eee;
          display: flex;
          padding: 10px 15px;
        }
        img {
          width: 100%;
          height: auto;
          border-radius: 10px;
          margin-top: 10px;
        }
        div {
          padding-right: 10px;
        }
        time {
          color: #555;
          font-size: 13px;
        }
        p {
          margin: 0;
        }
      `}</style>
    </>
  )
}

export default Twit
