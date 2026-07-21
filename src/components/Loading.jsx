function Loading({ text = "Loading..." }) {
    return (
        <div className="loadingOverlay">
            <div className="loader"></div>
            <p>{text}</p>
        </div>
    );
}

export default Loading;