import { useState } from "react"
import AppLayout from "../../../components/AppLayout"
import Button from "../../../components/Button"
import useUser from "../../../hooks/useUser"
import { addTweet } from "../../../firebase/client"
import { useRouter } from "next/router"

const COMPOSE_STATE = {
  USER_NOT_KNOW: 0,
  LOADING: 1,
  SUCCES: 2,
  ERROR: -1,
}

export default function ComposeTweet() {
  const router = useRouter()
  const user = useUser()
  const [status, setStatus] = useState(COMPOSE_STATE.USER_NOT_KNOW)
  const [message, setMessage] = useState("")

  const handleChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus(COMPOSE_STATE.LOADING)
    addTweet({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      username: user.displayName,
    })
      .then(() => {
        router.push("/home")
      })
      .catch((err) => {
        setStatus(COMPOSE_STATE.ERROR)
        console.log(err)
      })
  }
  const isButtonDisabled = !message.length || status === COMPOSE_STATE.LOADING

  return (
    <>
      <AppLayout>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="¿Qué está pasando?"
            value={message}
            onChange={handleChange}
          ></textarea>
          <div>
            <Button disabled={isButtonDisabled}>TweetAM</Button>
          </div>
        </form>
      </AppLayout>
      <style jsx>{`
        div {
          padding: 15px;
        }
        textarea {
          border: 0;
          font-size: 21px;
          min-height: 200px;
          padding: 15px;
          outline: 0;
          resize: none;
          width: 100%;
        }
      `}</style>
    </>
  )
}
