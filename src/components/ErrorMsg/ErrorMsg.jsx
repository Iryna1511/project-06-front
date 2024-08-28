import css from "./ErrorMsg.module.css";

export default function ErrorMsg() {
  return (
    <p className={css.text}>Sorry, something went wrong... Please try again!</p>
  );
}
