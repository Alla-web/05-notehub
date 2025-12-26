import css from "./ErrorBox.module.css";

interface ErrorBoxProps {
  query?: string;
  errorMessage?: string;
}

export default function ErrorBox({ query, errorMessage }: ErrorBoxProps) {
  return (
    <div className={css.errorBox}>
      <p>Error occured!</p>
      {query && (
        <p
          className={css.errorMessage}
        >{`No notes found with guwry: ${query}`}</p>
      )}
      {errorMessage && <p className={css.errorMessage}>{errorMessage}</p>}
    </div>
  );
}
