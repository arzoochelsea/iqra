export class QuranDataError extends Error {
  constructor(message: string, public readonly code: "network" | "invalid-response" | "mismatch") { super(message); this.name = "QuranDataError"; }
}
