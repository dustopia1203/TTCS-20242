import { Toast, ToastContainer } from "react-bootstrap";

function ToastComp({ log }) {
  return (
    <>
      <ToastContainer className="p-3" position="top-end">
        <Toast show={log.show}>
          <Toast.Header className={log.textType}>
            <strong className="me-auto">{log.type}</strong>
          </Toast.Header>
          <Toast.Body>{log.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default ToastComp;
