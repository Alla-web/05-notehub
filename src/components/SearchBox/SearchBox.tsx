import css from "./SearchBox.module.css";
import { useDebounceCallback } from "usehooks-ts";

interface SearchBoxProps {
  search: string;
  setSearch: (search: string) => void;
}

export default function SearchBox({ search, setSearch }: SearchBoxProps) {
  const debauncedSearchChange = useDebounceCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(typeof event.target.value);

      setSearch(event.target.value);
    },
    1000
  );

  return (
    <input
      defaultValue={search}
      onChange={debauncedSearchChange}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
}
