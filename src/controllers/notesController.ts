import { Request, Response } from "express";
import axios from "axios";
import "dotenv/config";
import { Converter } from "showdown";
import Note from "../models/Note";

const converter: Converter = new Converter();

function applyCorrections(text: string, corrections: any[]): string {
    let correctedText = text;
    let offsetAdjustment = 0;

    corrections.forEach(({ offset, length, suggestion }) => {
        if (suggestion) {
            const start = offset + offsetAdjustment;
            const end = start + length;
            correctedText =
                correctedText.substring(0, start) +
                suggestion.split(", ")[0] +
                correctedText.substring(end);
            offsetAdjustment += suggestion.split(", ")[0].length - length;
        }
    });

    return correctedText;
}

class NotesController {
    async checkGrammar(req: Request, res: Response, next) {
        try {
            res.setHeader("Content-Type", "application/json");
            const { text } = req.body;

            if (!text || typeof text !== "string") {
                return res
                    .status(400)
                    .json({ error: "Invalid input, 'text' is required" });
            }

            const response: any = await axios.post(
                "https://api.languagetool.org/v2/check",
                new URLSearchParams({ text, language: "en-US" }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            const { matches } = response.data;

            const corrections = matches.map((match: any) => ({
                error: match.message,
                suggestion: match.replacements
                    .map((r: any) => r.value)
                    .join(", "),
                offset: match.offset,
                length: match.length,
            }));

            res.status(200).json({
                original_text: text,
                corrected_text: applyCorrections(text, corrections),
                errors: corrections,
            });
        } catch (error) {
            return next(error);
        }
    }

    async saveNote(req: Request, res: Response, next) {
        try {
            res.setHeader("Content-Type", "application/json");
            const { title, content } = req.body;

            if (!title || typeof title !== "string") {
                return res
                    .status(400)
                    .json({ error: "Invalid input, 'title' is required" });
            }

            if (!content || typeof content !== "string") {
                return res
                    .status(400)
                    .json({ error: "Invalid input, 'content' is required" });
            }

            const createdNote = await Note.create({ title, content });

            if (createdNote) {
                res.send({
                    message: "Note saved successfully",
                    note_id: createdNote._id,
                });
            }
        } catch (error) {
            return next(error);
        }
    }

    async listSavedNotes(req: Request, res: Response, next) {
        try {
            res.setHeader("Content-Type", "application/json");
            const notes: any[] = await Note.find().exec();

            res.send(
                notes.map((note) => {
                    return {
                        id: note._id,
                        title: note.title,
                        createdAt: note.createdAt,
                    };
                })
            );
        } catch (error) {
            next(error);
        }
    }

    async renderHtml(req: Request, res: Response, next) {
        try {
            res.setHeader("Content-Type", "application/json");
            const { noteId } = req.params;

            const noteToRender = await Note.findById(noteId);

            if (!noteToRender) {
                return res.status(404).json({ error: "Note not found" });
            }

            const rendered: string = converter.makeHtml(
                noteToRender.content as string
            );

            res.send({
                id: noteToRender._id,
                html: rendered,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default NotesController;
