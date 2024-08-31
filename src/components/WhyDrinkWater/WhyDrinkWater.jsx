import css from "./WhyDrinkWater.module.css";

export default function WhyDrinkWater() {
  return (
    <div className={css.container}>
      <h3 className={css.title}>Why drink water</h3>
      <ul className={css.list}>
        <li className={css.listItem}>
          <div className={css.circle}></div>
          <p className={css.itemsText}>Supply of nutrients to all organs</p>
        </li>
        <li className={css.listItem}>
          <div className={css.circle}></div>
          <p className={css.itemsText}>Providing oxygen to the lungs</p>
        </li>
        <li className={css.listItem}>
          <div className={css.circle}></div>
          <p className={css.itemsText}>Maintaining the work of the heart</p>
        </li>
        <li className={css.listItem}>
          <div className={css.circle}></div>
          <p className={css.itemsText}>Release of processed substances</p>
        </li>
        <li className={css.listItem}>
          <div className={css.circle}></div>
          <p className={css.itemsText}>
            Ensuring the stability of the internal environment
          </p>
        </li>
        <li className={css.listItem}>
          <div className={css.circle}></div>
          <p className={css.itemsText}>
            Maintaining within the normal temperature
          </p>
        </li>
        <li className={css.listItem}>
          <div className={css.circle}></div>
          <p className={css.itemsText}>
            Maintaining an immune system capable of resisting disease
          </p>
        </li>
      </ul>
    </div>
  );
}
