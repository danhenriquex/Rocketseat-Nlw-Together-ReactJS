import React from "react";
import { Button } from "../components";

import "../styles/modal.scss";

type ModalProps = {
  title: string;
  content: string;
  buttonOption: string;
  icon: string;
};

export function Modal({ title, content, buttonOption, icon }: ModalProps) {
  return (
    <div id="container-modal">
      <main className="content">
        <div>
          <img src={icon} alt="Excluir sala" />
        </div>
        <h1>{title}</h1>
        <p>{content}</p>
        <footer>
          <Button>Cancelar</Button>
          <Button>{buttonOption}</Button>
        </footer>
      </main>
    </div>
  );
}
