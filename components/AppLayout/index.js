import App from "next/app"
import styles, { globalStyles } from "./styles"

const AppLayout = ({ children }) => {
  return (
    <>
      <div>
        <main>{children}</main>
      </div>
      <style jsx>{styles}</style>
      <style jsx global>
        {globalStyles}
      </style>
    </>
  )
}

export default AppLayout
