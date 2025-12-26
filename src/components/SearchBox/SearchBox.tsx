import css from "./SearchBox.module.css";

interface SearchBoxProps {
  search: string;
  onSearch: (search: string) => void;
  resetPage: () => void;
}

export default function SearchBox({
  search,
  onSearch,
  resetPage,
}: SearchBoxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
    resetPage();
  };

  return (
    <input
      value={search}
      onChange={handleChange}
      className={css.input}
      name="search"
      type="text"
      placeholder="Search notes"
    />
  );
}
