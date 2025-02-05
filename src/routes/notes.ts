import { Router } from "express";
import NotesController from "../controllers/notesController";

const notesRouter: Router = Router();
const notesController: NotesController = new NotesController();

notesRouter.post("/notes/check-grammar", notesController.checkGrammar);

export default notesRouter;
