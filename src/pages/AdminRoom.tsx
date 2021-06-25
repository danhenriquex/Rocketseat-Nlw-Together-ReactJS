import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { LogoImg, DeleteImg } from "../assets/images";
import { Button, MemoQuestion, RoomCode } from "../components";
import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";
import "../styles/room.scss";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  // const { user } = useAuth();
  const params = useParams<RoomParams>();
  const history = useHistory();

  const roomId = params.id;

  const { title, questions } = useRoom(roomId);

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Você tem certeza que deseja excluir essa pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={LogoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
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
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={DeleteImg} alt="Remover perguntar" />
                </button>
              </MemoQuestion>
            );
          })}
        </div>
      </main>
    </div>
  );
}
