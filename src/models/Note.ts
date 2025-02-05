import mongoose, { Schema } from "mongoose";

const noteSchema: Schema = new Schema(
    {
        title: { type: String, required: true, maxLength: 100 },
        content: { type: String, required: true },
    },
    { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
