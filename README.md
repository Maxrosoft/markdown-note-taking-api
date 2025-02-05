# Markdown Note Taking API

https://roadmap.sh/projects/markdown-note-taking-app

A simple API to check grammar, save, list, and render Markdown notes as HTML.

## Features
- **Check Grammar**: Validate the grammar of notes.
- **Save Notes**: Store Markdown notes in the system.
- **List Notes**: Retrieve all stored notes.
- **Render Notes**: Convert and serve Markdown notes as HTML.

## Getting Started

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/Maxrosoft/markdown-note-taking-api.git
   ```

2. **Install Dependencies**  
   ```bash
   cd markdown-note-taking-api
   npm install
   ```

3. **Run the Server**  
   ```bash
   npm start
   ```
   The server runs by default on `http://localhost:3000`.

## Endpoints

- **POST** `/api/notes/check-grammar`  
  Checks the grammar of the provided Markdown text.

- **POST** `/api/notes`  
  Saves a new Markdown note.

- **GET** `/api/notes`  
  Lists all saved notes.

- **GET** `/api/notes/{noteId}/render`  
  Returns the HTML version of a specified Markdown note.

## Contributing
Pull requests and issues are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

**License**  
This project is open-sourced under the [MIT License](LICENSE).
