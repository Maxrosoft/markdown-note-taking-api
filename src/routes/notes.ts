import { Router } from "express";
import NotesController from "../controllers/notesController";

const notesRouter: Router = Router();
const notesController: NotesController = new NotesController();

notesRouter.post("/notes/check-grammar", notesController.checkGrammar);
notesRouter.post("/notes", notesController.saveNote);
notesRouter.get("/notes", notesController.listSavedNotes);
notesRouter.get("/notes/:noteId/render", notesController.renderHtml);

export default notesRouter;
