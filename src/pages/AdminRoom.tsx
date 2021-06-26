import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AnswerImg, CheckImg, DeleteImg, LogoImg } from "../assets/images";
import { Button, MemoQuestion, RoomCode, SimpleModal } from "../components";
import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";
import "../styles/room.scss";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  // const { user } = useAuth();
  const [openModalMessage, setOpenModalMessage] = useState(false);
  const [openRoomMessage, setOpenRoomMessage] = useState(false);
  const params = useParams<RoomParams>();
  const history = useHistory();

  const roomId = params.id;

  const { title, questions } = useRoom(roomId);

  async function handleDeleteQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={LogoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />

            <SimpleModal
              openModal={openRoomMessage}
              setOpenModal={setOpenRoomMessage}
              title="Encerrar sala"
              content="Tem certeza que você deseja encerrar esta sala?"
              type="encerrar"
              handleFunction={() => handleEndRoom()}
            >
              <Button isOutlined onClick={() => setOpenRoomMessage(true)}>
                Encerrar sala
              </Button>
            </SimpleModal>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} Perguntas</span>}
        </div>

        <div className="question-list">
          {questions.map((question) => {
            return (
              <MemoQuestion
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img
                        src={CheckImg}
                        alt="Marcar pergunta como respondida"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={AnswerImg} alt="Dar destaque à pergunta" />
                    </button>
                    <SimpleModal
                      openModal={openModalMessage}
                      setOpenModal={setOpenModalMessage}
                      title="Excluir pergunta"
                      content="Tem certeza que você deseja excluir esta pergunta?"
                      type="excluir"
                      handleFunction={() => handleDeleteQuestion(question.id)}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setOpenModalMessage(true);
                        }}
                      >
                        <img src={DeleteImg} alt="Remover perguntar" />
                      </button>
                    </SimpleModal>
                  </>
                )}
              </MemoQuestion>
            );
          })}
        </div>
      </main>
    </div>
  );
}
