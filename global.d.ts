type Messages = typeof import("./messages/en.json");
type FrMessages = typeof import("./messages/fr.json");

declare interface IntMessages extends Messages, FrMessages {}
