import "./NoticeModal.scss";
import _ from "lodash";

type NoticeModalProps = {
  message: string;
  close: () => void;
};

function NoticeModal({ message, close }: NoticeModalProps) {
  return (
    <div className="notice-modal" onClick={close}>
      <div className="message">{message}</div>
    </div>
  );
}

export default NoticeModal;
