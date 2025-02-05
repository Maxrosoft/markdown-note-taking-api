import { Request, Response, NextFunction } from "express";
import axios from "axios";
import "dotenv/config";

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
    async checkGrammar(req: Request, res: Response, next: NextFunction) {
        try {
            const { text } = req.body;

            if (!text || typeof text !== "string") {
                return res
                    .status(400)
                    .json({ error: "Invalid input, 'text' is required." });
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
            next(error);
        }
    }
}

export default NotesController;
