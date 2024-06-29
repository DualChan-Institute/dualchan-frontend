/**
 * Definition des `Comment`-Typs, der die Struktur eines Kommentars innerhalb der Anwendung repräsentiert.
 * Dieser Typ ist entscheidend für die Handhabung von Kommentaren, die von Benutzern erstellt werden, und
 * wird in verschiedenen Teilen der Anwendung verwendet, um Typsicherheit und Konsistenz zu gewährleisten.
 * Kommentare sind ein wesentlicher Bestandteil vieler Anwendungen, die Benutzerinteraktionen ermöglichen,
 * wie z.B. soziale Netzwerke, Blogs oder Diskussionsforen. Sie ermöglichen es Benutzern, Feedback zu geben,
 * Diskussionen zu führen und Inhalte zu teilen.
 *
 * Eigenschaften des `Comment`-Typs:
 * - `text`: Ein String, der den eigentlichen Text des Kommentars darstellt. Dies ist der Hauptinhalt des
 *   Kommentars, in dem der Benutzer seine Gedanken, Feedback oder Antworten ausdrückt. Der Text eines Kommentars
 *   ist das zentrale Element, das von anderen Benutzern gelesen und darauf reagiert wird. Es ist wichtig, dass
 *   dieser Text klar und verständlich ist, um effektive Kommunikation und Interaktion zwischen den Benutzern zu
 *   fördern.
 *
 * - `userId`: Ein String, der die eindeutige ID des Benutzers repräsentiert, der den Kommentar erstellt hat.
 *   Diese ID verbindet den Kommentar mit seinem Ersteller und ist entscheidend für Funktionen wie die
 *   Authentifizierung und Autorisierung. Sie ermöglicht es der Anwendung, zu überprüfen, ob der Benutzer
 *   berechtigt ist, bestimmte Aktionen mit dem Kommentar durchzuführen, wie z.B. ihn zu bearbeiten oder zu löschen.
 *
 * - `title`: Ein String, der den Titel des Kommentars darstellt. Obwohl nicht alle Kommentarsysteme einen Titel
 *   für Kommentare verwenden, kann dieser nützlich sein, um einen Überblick über den Inhalt oder den Zweck des
 *   Kommentars zu geben, besonders in Diskussionen, die komplexe Themen behandeln oder wo Kommentare als eigenständige
 *   Beiträge fungieren können.
 *
 * - `parentId`: Ein String, der die ID des übergeordneten Kommentars oder Inhalts repräsentiert, zu dem dieser
 *   Kommentar gehört. Dieses Feld ist entscheidend für die Implementierung von verschachtelten Kommentaren oder
 *   Antworten, da es die hierarchische Struktur der Diskussion definiert. Durch die Verwendung der `parentId` kann
 *   die Anwendung die Beziehung zwischen Kommentaren abbilden und Benutzern ermöglichen, Antworten in einem
 *   kontextuellen Rahmen zu lesen und zu verstehen.
 *
 * - `id`: Ein String, der die eindeutige ID des Kommentars repräsentiert. Diese ID ist entscheidend für die
 *   Verwaltung von Kommentaren in der Datenbank und die Referenzierung von spezifischen Kommentaren in der
 *   Benutzeroberfläche und der Anwendungslogik. Sie ermöglicht es der Anwendung, spezifische Kommentare zu
 *   identifizieren, zu aktualisieren oder zu löschen und ist ein Schlüsselelement für die Datenintegrität und
 *   das Datenmanagement.
 *
 * Der `Comment`-Typ ist ein fundamentaler Baustein für die Implementierung eines interaktiven und dynamischen
 * Kommentarsystems. Durch die klare Definition der erwarteten Datenstruktur hilft er, die Entwicklung und
 * Wartung des Codes zu vereinfachen und unterstützt die Erstellung einer benutzerfreundlichen und engagierenden
 * Plattform für Benutzerinteraktionen.
 */
export type Comment = {
  text: string;
  userId: string;
  title: string;
  parentId: string;
  id: string;
};
