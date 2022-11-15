export function ChatItemSkeleton() {
  return (
    <div className="chat-item skeleton">
      <div className="nickname-container gray"></div>
      <div className="contents-container">
        <div className="up">
          <div className="text gray"></div>
        </div>
        <div className="location">
          <div className="text gray" />
        </div>
        <div className="down">
          <div className="text gray" />
          <div className="text gray" />
        </div>
      </div>
    </div>
  );
}
