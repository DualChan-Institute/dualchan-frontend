// Importiert notwendige Hooks und Typen aus React und Next.js sowie Hilfsfunktionen und Komponenten
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { Board } from "@/types/board";
import type { Comment as CommentType } from "@/types/comment";
import { Cookies } from "@/types/cookie";
import cookie from "cookie";
import Comment from "./Comment";

// Definiert die Hauptkomponente CommentList, die für die Anzeige und Verwaltung von Kommentaren zuständig ist
export default function CommentList() {
  // Nutzt den useRouter Hook von Next.js, um auf die Router-Instanz zuzugreifen
  const router = useRouter();
  // Zustandsvariablen für die Verwaltung des Zustands der Komponente
  const [board, setBoard] = useState<Board | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [cookies, setCookies] = useState<Cookies | null>(null);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [selectedCommentTitle, setSelectedCommentTitle] = useState<string>("");

  // useEffect Hook, um Cookies beim Initialisieren der Komponente zu verarbeiten
  useEffect(() => {
    const cookies = cookie.parse(document.cookie);

    if (!cookies.session) {
      return;
    }

    setCookies({ session: JSON.parse(cookies.session) });
  }, []);

  // useEffect Hook, um Board- und Kommentardaten asynchron zu laden, wenn sich der Slug ändert
  useEffect(() => {
    const fetchBoardAndComments = async () => {
      const slug = router.query.slug;
      if (typeof slug === "string") {
        const res = await fetch(
          `http://localhost:3002/api/boards?slug=${slug}`
        );
        const boards: Board[] = await res.json();
        const board = boards[0];
        setBoard(board);

        const res2 = await fetch(
          `http://localhost:3002/api/comments?parentId=${board.id}`
        );
        const comments: CommentType[] = await res2.json();
        setComments(comments);
      }
    };

    fetchBoardAndComments();
  }, [router.query.slug]);

  // Behandelt das Absenden eines neuen Kommentars
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!board) return;

    const parentId = replyTo || board.id;
    const userId = cookies?.session.decodedToken.id || "-1";
    //@ts-ignore
    const title = (e.target as HTMLFormElement).title.value;
    const text = (e.target as HTMLFormElement).text.value;

    setIsSubmitting(true);

    const response = await fetch("http://localhost:3002/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies?.session.token}`,
      },
      body: JSON.stringify({
        parentId: parentId,
        userId: userId,
        title: title,
        text: text,
      }),
    });

    if (response.ok) {
      setReplyTo(null); // Setzt replyTo zurück, nachdem der Kommentar abgesendet wurde
      setSelectedCommentTitle(""); // Setzt den ausgewählten Kommentartitel zurück
      router.reload();
    } else {
      alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
    }

    setIsSubmitting(false);
  };

  // Behandelt das Klicken auf den Antworten-Button eines Kommentars
  const handleReplyClick = (commentId: string, commentTitle: string) => {
    setReplyTo(commentId);
    setSelectedCommentTitle(commentTitle); // Setzt den Titel des ausgewählten Kommentars
  };

  // Funktion, um ein Kommentar zu löschen
  const onDeletedComment = async (commentId: string) => {
    const response = await fetch(
      `http://localhost:3002/api/comment/${commentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${cookies?.session.token}`,
        },
      }
    );

    if (response.ok) {
      // Kommentar erfolgreich gelöscht
      setComments(comments.filter((comment) => comment.id !== commentId));
    } else {
      alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
    }
  };

  // Rendert rekursiv Kommentare und deren Antworten
  const renderComments = (comments: CommentType[], parentId: string) => {
    return comments
      .filter((comment) => comment.parentId === parentId)
      .map((comment) => (
        <li key={comment.id} className="pb-4">
          <Comment
            comment={comment}
            onReplyClick={() => handleReplyClick(comment.id, comment.title)}
            onDeleteComment={() => onDeletedComment(comment.id)}
          />
          {renderComments(comments, comment.id)}
        </li>
      ));
  };

  // Zeigt eine Ladeanzeige, wenn das Board noch nicht geladen ist
  if (!board) return <div className="text-center">Lädt...</div>;

  // Rendert das Kommentarformular und die Kommentarliste
  return (
    <div className="relative min-h-screen pb-16">
      <div className="bg-white p-4 border-t">
        {selectedCommentTitle && (
          <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
            <span>Antwort auf: {selectedCommentTitle}</span>
            <button
              onClick={() => {
                setReplyTo(null);
                setSelectedCommentTitle("");
              }}
              className="text-blue-500 hover:underline"
            >
              Antwort abbrechen
            </button>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Titel"
            id="title"
            className="w-full border rounded px-2 py-1"
          />
          <textarea
            placeholder="Text"
            id="text"
            className="w-full border rounded px-2 py-1"
          ></textarea>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white rounded px-4 py-2 disabled:bg-blue-300"
          >
            {isSubmitting ? "Sendet..." : "Senden"}
          </button>
        </form>
      </div>
      <ul>{renderComments(comments, board.id)}</ul>
    </div>
  );
}
