export default function Button ({ children, onClick }) {

    return(
        <>
            <button onClick={onClick}>
                {children}
            </button>
            <style jsx>{`
                button {
                    background: #000000;
                    border: 0;
                    border-radius: 9999px;
                    color: #fff;
                    cursor: pointer;
                    font-weight: 800;
                    padding: 8px 24px;
                }
                button:hover {
                    background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%);
                }
            `}</style>
        </>
    )
}