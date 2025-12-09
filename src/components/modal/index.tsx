import "./index.css";

import { FaRegCircleXmark } from "react-icons/fa6";

function Modal({
  children,
  setCloseModal,
}: {
  children: React.ReactElement;
  setCloseModal: (value: boolean) => void;
}) {
  return (
    <div className="overlay">
      <div className="container">
        <div className="header">
          <FaRegCircleXmark
            className="icon"
            onClick={() => setCloseModal(false)}
          />
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default Modal;