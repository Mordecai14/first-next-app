import { useEffect, useState } from "react"
import Button from "../../../components/Button"
import useUser from "../../../hooks/useUser"
import Avatar from "../../../components/Avatar/index"
import { addTweet, downloadIMAGE, upLoadImage } from "../../../firebase/client"
import { useRouter } from "next/router"
import Head from "next/head"
import { ref, getDownloadURL } from "firebase/storage"

const COMPOSE_STATE = {
  USER_NOT_KNOW: 0,
  LOADING: 1,
  SUCCES: 2,
  ERROR: -1,
}

const DRAG_IMAGE_STATE = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

export default function ComposeTweet() {
  const router = useRouter()
  const user = useUser()
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATE.USER_NOT_KNOW)

  const [drag, setDrag] = useState(DRAG_IMAGE_STATE.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  useEffect(() => {
    if (task) {
      let onProgress = () => {
        // console.log("Task OnProgress:", task)
      }
      let onError = () => {
        // console.log("Task ERROR:", task)
      }
      let onComplete = () => {
        console.log("Task complete:", task)
        getDownloadURL(task.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL)
          setImgURL(downloadURL)
        })
      }

      task.on("state_changed", onProgress, onError, onComplete)
    }
    // console.log("task:", task)
  }, [task])

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
      img: imgURL,
    })
      .then(() => {
        router.push("/home")
      })
      .catch((err) => {
        setStatus(COMPOSE_STATE.ERROR)
        console.log(err)
      })
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATE.DRAG_OVER)
  }
  const handleDragLEave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATE.NONE)
  }
  const handleDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATE.NONE)
    console.log(e.dataTransfer.files[0])
    const file = e.dataTransfer.files[0]
    const task = upLoadImage(file)
    setTask(task)
  }
  const isButtonDisabled = !message.length || status === COMPOSE_STATE.LOADING

  return (
    <>
      <Head>
        <title>Crear un Tweet / Tweet-IT</title>
      </Head>
      <section className="form-container">
        <section className="avatar-container">
          {user && <Avatar src={user.avatar} />}
        </section>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="¿Qué está pasando?"
            value={message}
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLEave}
            onDrop={handleDrop}
          ></textarea>
          {imgURL && (
            <section className="remove-img">
              <button onClick={() => setImgURL(null)}>x</button>
              <img src={imgURL} />
            </section>
          )}
          <div className="button-tweet">
            <Button disabled={isButtonDisabled}>Tweet-IT</Button>
          </div>
        </form>
      </section>

      <style jsx>{`
        div {
          padding: 15px;
        }
        .button-tweet {
          margin-left: -50px;
        }
        .avatar-container {
          padding-top: 20px;
          padding-left: 10px;
        }
        button {
          position: absolute;
          top: 15px;
          left: 15px;
          border: 0;
          background: rgba(0, 0, 0, 0.3);
          color: #fff;
          border-radius: 999px;
          width: 35px;
          height: 35px;
          cursor: pointer;
        }
        .form-container {
          align-items: flex-start;
          display: flex;
        }
        .remove-img {
          position: relative;
        }
        form {
          margin: 10px;
        }
        textarea {
          border: ${drag === DRAG_IMAGE_STATE.DRAG_OVER
            ? "3px dashed #09f"
            : "3px solid transparent"};
          border-radius: 10px;
          font-size: 21px;
          min-height: 200px;
          padding: 15px;
          outline: 0;
          resize: none;
          width: 100%;
        }
        img {
          height: auto;
          width: 100%;
          object-fit: cover;
        }
      `}</style>
    </>
  )
}
