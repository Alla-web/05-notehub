import axios from "axios";
import type { Note, FetchNotesResponse, CreateNote } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

export async function fetchNotes(page: number, searhQuery: string) {
  const response = await axios.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      sortBy: "created",
      search: searhQuery,
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.data;
}

export async function createNote(payload: CreateNote): Promise<Note> {
  const response = await axios.post("/notes", payload, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  console.log(response.data);
  return response.data;
}

export async function deleteNote(noteId: Note["id"]) {
  await axios.delete(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
}
