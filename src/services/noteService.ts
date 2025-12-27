import axios from "axios";
import type { Note, CreateNote } from "../types/note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

export async function fetchNotes(page: number, searchQuery: string) {
  const response = await axios.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      sortBy: "created",
      search: searchQuery,
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.data;
}

export async function createNote(payload: CreateNote): Promise<Note> {
  const response = await axios.post<Note>("/notes", payload, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  console.log(response.data);
  return response.data;
}

export async function deleteNote(noteId: Note["id"]) {
  const response = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.data;
}
