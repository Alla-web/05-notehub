import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounceValue } from "usehooks-ts";

import css from "./App.module.css";

import type { FetchNotesResponse } from "../../types/note";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";
import ErrorBox from "../ErrorBox/ErrorBox";
import Loader from "../Loader/Loader";

export default function App() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debauncedSearch] = useDebounceValue(search, 1000);

  const { data, isLoading, isFetching, isError, error } =
    useQuery<FetchNotesResponse>({
      queryKey: ["notes", page, debauncedSearch],
      queryFn: () => fetchNotes(page, debauncedSearch),
      placeholderData: keepPreviousData,
    });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          search={search}
          onSearch={setSearch}
          resetPage={() => setPage(1)}
        />
        <Pagination
          totalPages={data?.totalPages ?? 0}
          page={page}
          setPage={setPage}
        />
        <button onClick={() => setIsModalOpen(true)} className={css.button}>
          Create note +
        </button>
      </header>
      <div>
        {isLoading && <Loader />}
        {data && !isLoading && <NoteList notes={data.notes} />}
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <NoteForm
              onNoteCreate={() => setIsModalOpen(false)}
              onCancelClick={() => setIsModalOpen(false)}
            />
          </Modal>
        )}
        {!isError && !isLoading && !data?.notes?.length && !isLoading && (
          <ErrorBox query={debauncedSearch} />
        )}
        {isError && <ErrorBox errorMessage={error.message} />}
      </div>
    </div>
  );
}
