import Modal from "@material-ui/core/Modal";
import React, { ReactNode } from "react";
import { Button } from ".";
import { DeleteMessageImg, ExcludeRoomImg } from "../assets/images";
import "../styles/modal.scss";

type ModalProps = {
  handleFunction: () => Promise<void>;
  title: string;
  content: string;
  type: "excluir" | "encerrar";
  children: ReactNode;
  openModal: boolean;
  setOpenModal: Function;
};

export function SimpleModal({
  handleFunction,
  title,
  content,
  type,
  children,
  setOpenModal,
  openModal,
}: ModalProps) {
  const handleClose = () => {
    setOpenModal(false);
  };

  const body = (
    <div id="container-modal">
      <main className="content">
        <div>
          <img
            src={type === "excluir" ? DeleteMessageImg : ExcludeRoomImg}
            alt="Excluir sala"
          />
        </div>
        <h1>{title}</h1>
        <p>{content}</p>
        <footer>
          <Button className="button-cancel" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            onClick={() => {
              handleFunction();
              handleClose();
            }}
            className="button-confirm"
          >
            Sim, {type}
          </Button>
        </footer>
      </main>
    </div>
  );

  return (
    <div>
      {children}
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
