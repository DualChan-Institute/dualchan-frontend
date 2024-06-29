/**
 * comment.tsx
 *
 * Dies ist eine React-Komponente, die für die Darstellung eines einzelnen Kommentars zuständig ist.
 * Sie unterstützt Funktionen wie das Anzeigen des Benutzernamens, das Löschen von Kommentaren und das Antworten auf Kommentare.
 * Zusätzlich kann sie verschachtelte Kommentare (Antworten auf einen Kommentar) anzeigen.
 *
 * Props:
 * - comment: Das Kommentarobjekt, das angezeigt werden soll.
 * - onReplyClick: Eine Funktion, die aufgerufen wird, wenn der Benutzer auf den Antworten-Button klickt.
 * - onDeleteComment: Eine Funktion, die aufgerufen wird, wenn der Benutzer einen Kommentar löschen möchte.
 * - isTopLevel: Ein optionaler Boolean-Wert, der angibt, ob der Kommentar ein Top-Level-Kommentar ist. Standardmäßig ist dieser Wert true.
 */

import React, { useEffect, useState } from "react";
import type { Comment } from "@/types/comment"; // Importiert den Typ für ein Kommentarobjekt.
import type { User } from "@/types/user"; // Importiert den Typ für ein Benutzerobjekt.
import { Cookies } from "@/types/cookie"; // Importiert den Typ für Cookies.
import cookie from "cookie"; // Importiert die Bibliothek zum Parsen von Cookies.

interface CommentProps {
  comment: Comment;
  onReplyClick: (commentId: string) => void;
  onDeleteComment: (commentId: string) => void;
  isTopLevel?: boolean;
}

const CommentComponent: React.FC<CommentProps> = ({
  comment,
  onReplyClick,
  onDeleteComment,
  isTopLevel = true,
}) => {
  const [username, setUsername] = useState("Lädt...");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [cookies, setCookies] = useState<Cookies | null>(null);
  const [nestedComments, setNestedComments] = useState<Comment[]>([]);

  useEffect(() => {
    const cookies = cookie.parse(document.cookie);

    if (!cookies.session) {
      return;
    }

    setCookies({ session: JSON.parse(cookies.session) });
  }, []);

  useEffect(() => {
    const fetchUserName = async () => {
      if (!comment || !comment?.userId) return;

      if (comment?.userId === "-1") {
        setUsername("Anonym");
      } else {
        const res = await fetch(
          `http://localhost:3002/api/user/${comment?.userId}`
        );
        const user: User = await res.json();
        setUsername(user.username);
      }
    };

    fetchUserName();
  }, [comment, comment?.userId]);

  useEffect(() => {
    const fetchNestedComments = async () => {
      const res = await fetch(
        `http://localhost:3002/api/comments?parentId=${comment?.id}`
      );
      const comments: Comment[] = await res.json();
      setNestedComments(comments);
    };

    fetchNestedComments();
  }, [comment?.id]);

  const handleDeleteComment = async () => {
    if (!cookies?.session.token) {
      // Benutzer ist nicht authentifiziert, sollte nicht passieren, da das Löschen nur angeboten wird, wenn eingeloggt
      return;
    }

    const userId = cookies?.session.decodedToken.id;
    if (comment?.userId === userId) {
      // Nur löschen, wenn der eingeloggte Benutzer der Autor des Kommentars ist
      const response = await fetch(
        `http://localhost:3002/api/comment/${comment?.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${cookies?.session.token}`,
          },
        }
      );

      if (response.ok) {
        // Erfolgreich gelöscht, aktualisieren Sie die Kommentarliste
        onDeleteComment(comment?.id);
      } else {
        alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
      }
    } else {
      // Benutzer ist nicht der Autor des Kommentars
      alert("Sie sind nicht berechtigt, diesen Kommentar zu löschen.");
    }
  };

  return (
    <div className="bg-white shadow-md p-4 mb-4 border">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Geschrieben von: <span className="text-gray-900">{username}</span>
        </p>
        {cookies?.session.token && (
          <div className="relative">
            <button
              onClick={() => setIsDropdownVisible(!isDropdownVisible)}
              className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
            >
              •••
            </button>
            {isDropdownVisible && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20 border border-gray-200">
                <button
                  onClick={handleDeleteComment}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Kommentar löschen
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <h2 className="text-lg font-semibold">{comment?.title}</h2>
      <p className="text-gray-700">{comment?.text}</p>
      {isTopLevel && (
        <button
          onClick={() => onReplyClick(comment?.id)}
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none"
        >
          Antworten
        </button>
      )}
      <div className="ml-6 mt-4">
        {nestedComments.map((nestedComment) => (
          <CommentComponent
            key={nestedComment?.id}
            comment={nestedComment}
            onReplyClick={onReplyClick}
            onDeleteComment={onDeleteComment}
            isTopLevel={false}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentComponent;
