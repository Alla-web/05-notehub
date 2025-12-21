import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import css from "./App.module.css";

import type { FetchNotesResponse } from "../../types/note";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";

export default function App() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, search),
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox search={search} setSearch={setSearch} />

        {data?.notes?.length && (
          <Pagination
            totalPages={data?.totalPages ?? 0}
            page={page}
            setPage={setPage}
          />
        )}

        <button onClick={() => setIsModalOpen(true)} className={css.button}>
          Create note +
        </button>
      </header>
      <div>
        {isLoading && <strong className={css.loading}>Loading notes...</strong>}
        {data && !isLoading && <NoteList notes={data.notes} />}
        {isModalOpen && (
          <Modal>
            <NoteForm
              onNoteCreate={() => setIsModalOpen(false)}
              onCancelClick={() => setIsModalOpen(false)}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}
