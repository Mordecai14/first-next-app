import Avatar from "../Avatar"
import useTimeAgo from "../../hooks/useTimeAgo"

export default function Twit({ avatar, username, content, id, createdAt }) {
  const timeAgo = useTimeAgo(createdAt)
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
            <label>{timeAgo}</label>
          </header>
          <p>{content}</p>
        </section>
      </article>
      <style jsx>{`
        article {
          border-bottom: 2px solid #eee;
          display: flex;
          padding: 10px 15px;
        }
        div {
          padding-right: 10px;
        }
        label {
          color: #555;
          font-size: 14px;
        }
        p {
          margin: 0;
        }
      `}</style>
    </>
  )
}
