import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounceCallback } from "usehooks-ts";

import css from "./App.module.css";

import type { FetchNotesResponse } from "../../types/note";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

export default function App() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, search),
  });

  const debauncedSearchChange = useDebounceCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    1000
  );

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <input
          defaultValue={search}
          onChange={debauncedSearchChange}
          className={css.input}
          type="text"
          placeholder="Search notes"
        />

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
