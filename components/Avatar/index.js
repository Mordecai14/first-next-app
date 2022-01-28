export default function Avatar({ alt, src, text, withText }) {
  return (
    <div>
      <img alt={alt} src={src} title={alt} />
      {withText && <strong>{text || alt}</strong>}
      <style jsx>{`
        div {
          align-items: center;
          display: flex;
          gap: 10px;
        }

        img {
          border-radius: 9999px;
          height: 49px;
          width: 49px;
        }
      `}</style>
    </div>
  )
}
