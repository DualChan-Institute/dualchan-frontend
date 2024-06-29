/**
 * Definition des `User`-Typs für die Verwendung im gesamten Projekt.
 * Dieser Typ ist zentral für die Handhabung von Benutzerdaten und wird in verschiedenen
 * Teilen der Anwendung verwendet, um Typsicherheit und Konsistenz zu gewährleisten.
 *
 * Der `User`-Typ ist ein TypeScript `type`, der als Blaupause für Benutzerobjekte dient,
 * die in der Anwendung verarbeitet werden. Er definiert die Struktur dieser Objekte,
 * indem er die erforderlichen Schlüssel und deren Typen spezifiziert. Dieser Ansatz
 * ermöglicht es TypeScript, Entwickler*innen bei der Vermeidung von Typfehlern zu unterstützen,
 * indem es sicherstellt, dass alle Benutzerobjekte den definierten Strukturvorgaben entsprechen.
 *
 * Eigenschaften des `User`-Typs:
 * - `username`: Ein String, der den Benutzernamen des Benutzers darstellt. Der Benutzername ist
 *   ein eindeutiger Identifikator für jeden Benutzer innerhalb der Anwendung. Er wird für verschiedene
 *   Zwecke verwendet, z.B. für die Anmeldung, als Anzeigename und zur Identifizierung in der Benutzeroberfläche.
 *   Der Benutzername ist ein kritischer Teil der Benutzeridentität und wird oft in Interaktionen
 *   innerhalb der Anwendung sichtbar gemacht.
 *
 * - `id`: Ein String, der die eindeutige ID des Benutzers repräsentiert. Diese ID ist ein weiterer
 *   eindeutiger Identifikator für Benutzer, der in der Datenbank und beim Datenaustausch zwischen
 *   Client und Server verwendet wird. Im Gegensatz zum Benutzernamen, der für menschliche Benutzer
 *   gedacht ist und lesbare Informationen enthält, dient die ID hauptsächlich technischen Zwecken,
 *   wie der eindeutigen Identifizierung von Datensätzen in der Datenbank.
 *
 * Der `User`-Typ ist ein fundamentaler Baustein der Benutzerverwaltung in der Anwendung. Er wird
 * verwendet, um die Integrität und Konsistenz von Benutzerdaten zu gewährleisten, indem er eine
 * klare Definition der erwarteten Datenstruktur bietet. Dies erleichtert die Entwicklung und
 * Wartung des Codes, indem es klare Richtlinien für die Arbeit mit Benutzerdaten gibt und hilft,
 * Fehler zu vermeiden, die durch inkonsistente Datenstrukturen verursacht werden könnten.
 */
export type User = {
  username: string; // Der Benutzername des Benutzers als eindeutiger Identifikator.
  id: string; // Die eindeutige ID des Benutzers, verwendet für technische Zwecke wie die Datenbankverwaltung.
};
