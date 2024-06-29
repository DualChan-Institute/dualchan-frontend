/**
 * Definition des `Cookies`-Typs, der die Struktur der Cookies repräsentiert, die in der Anwendung verwendet werden.
 * Dieser Typ ist zentral für die Handhabung von Cookie-bezogenen Daten und wird in verschiedenen Teilen der
 * Anwendung verwendet, um Typsicherheit und Konsistenz zu gewährleisten. Cookies sind ein wesentlicher Bestandteil
 * moderner Webanwendungen und werden für verschiedene Zwecke verwendet, wie z.B. die Authentifizierung von Benutzern,
 * das Speichern von Benutzereinstellungen und das Tracking des Benutzerzustands während der Navigation in der Anwendung.
 *
 * Eigenschaften des `Cookies`-Typs:
 * - `error?`: Ein optionaler String, der einen Fehlerzustand beschreibt. Dieses Feld kann verwendet werden, um
 *   Fehlermeldungen zu speichern, die sich auf die Verarbeitung von Cookies beziehen, z.B. wenn ein Cookie nicht
 *   erfolgreich gesetzt oder gelesen werden kann. Die Optionale Natur dieses Feldes reflektiert, dass Fehlerzustände
 *   nicht immer vorhanden sind; in vielen Fällen wird die Interaktion mit Cookies fehlerfrei sein.
 *
 * - `session`: Ein Objekt vom Typ `Session`, das die Daten der Benutzersitzung enthält. Die Session ist ein
 *   kritischer Teil der Benutzerauthentifizierung und -verwaltung in Webanwendungen. Sie speichert Informationen
 *   über den aktuellen Benutzer und dessen Authentifizierungsstatus. Die Verwendung eines dedizierten Typs für
 *   die Session hilft, die Struktur und die erwarteten Daten klar zu definieren, was die Sicherheit und die
 *   Wartbarkeit des Codes verbessert.
 */
export type Cookies = {
  error?: string;
  session: Session;
};

/**
 * Definition des `Session`-Typs, der die Struktur der Benutzersitzungsdaten repräsentiert.
 * Die Session spielt eine zentrale Rolle in der Authentifizierungslogik der Anwendung, indem sie
 * kritische Informationen über den authentifizierten Benutzer speichert. Diese Informationen werden
 * verwendet, um den Zugriff auf geschützte Ressourcen zu kontrollieren und den Benutzer über verschiedene
 * Anfragen hinweg zu identifizieren.
 *
 * Eigenschaften des `Session`-Typs:
 * - `token`: Ein String, der das Authentifizierungstoken des Benutzers darstellt. Dieses Token ist ein
 *   wesentlicher Bestandteil der Sicherheitsmechanismen der Anwendung. Es wird verwendet, um die Identität
 *   des Benutzers bei jeder Anfrage zu überprüfen und sicherzustellen, dass der Benutzer die erforderlichen
 *   Berechtigungen für den Zugriff auf bestimmte Ressourcen hat.
 *
 * - `decodedToken`: Ein Objekt, das die entschlüsselten Daten des Authentifizierungstokens enthält. Dies
 *   umfasst die Benutzer-ID, E-Mail-Adresse, den Benutzernamen sowie Zeitstempel für die Ausstellung und das
 *   Ablaufdatum des Tokens. Die Verfügbarkeit dieser Informationen in entschlüsselter Form ermöglicht es der
 *   Anwendung, schnell auf kritische Benutzerdaten zuzugreifen, ohne das Token bei jeder Anfrage neu entschlüsseln
 *   zu müssen.
 */
export type Session = {
  token: string;
  decodedToken: {
    id: string;
    email: string;
    username: string;
    iat: number; // Der Zeitpunkt der Ausstellung des Tokens, dargestellt als Unix-Zeitstempel.
    exp: number; // Das Ablaufdatum des Tokens, ebenfalls als Unix-Zeitstempel.
  };
};
