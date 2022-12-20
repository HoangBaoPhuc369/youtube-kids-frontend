export default function Message({ picture, name, text, scrollRef }) {
  return (
    <>
      <div className="message-group">
        <img src={picture} className="message-img" alt="" />

        <div className="message-content">
          {" "}
          <span className="message-user-name">{name}</span>
          {text}
        </div>
        <div className="chatBox-scroll" ref={scrollRef}></div>
      </div>
    </>
  );
}
