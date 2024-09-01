import { BasicModalWindow } from '../../BasicModalWindow/BasicModalWindow';
import PropTypes from 'prop-types';
import css from './DailyNormaModal.module.css'; 

const DailyNormaModalWindow = ({ onClose, onOpen }) => {
  return (
    <BasicModalWindow onClose={onClose} onOpen={onOpen} title="My daily norma: ">
      <div className={css.BoxModal}>
        <div>
          <div className={css.normaFormula}>
            <p className={css.normaParagraph}>
              For woman: <span>V=(M*0,03) + (T*0,4)</span>
            </p>
            <p className={css.normaParagraph}>
              For man: <span>V=(M*0,04) + (T*0,6)</span>
            </p>
          </div>
          <div className={css.normaExplanation}>
            <p>
              <span>*</span>V is the volume of the water norm in liters per day, M is your body weight, T is the time of active sports, or another type of activity commensurate in terms of loads (in the absence of these, you must set 0)
            </p>
          </div>
        </div>
        <div>
          <div className={css.normaForm}>
            <div className={css.normaFormRadio}>
              <p className={css.normaTitleModal}>Calculate your rate:</p>
              <label>
                <input
                  className={css.normaInputRadio}
                  type="radio"
                  name="gender"
                  value="female"
                />
                <span>For woman: </span>
              </label>
              <label>
                <input
                  className={css.normaInputRadio}
                  type="radio"
                  name="gender"
                  value="male"
                />
                <span>For man: </span>
              </label>
            </div>
            <div>
              <p className={css.normaParagraph}>Your weight in kilograms: </p>
              <input
                className={css.normaInput}
                type="number"
                min="0"
                max="250"
                placeholder="0"
              />
            </div>
            <div>
              <p className={css.normaParagraph}>
                The time of active participation in sports or other activities with a high physical. load:
              </p>
              <input
                className={css.normaInput}
                type="number"
                min="0"
                placeholder="0"
              />
            </div>
            <div className={css.normaFormResult}>
              The required amount of water in liters per day:
              <strong> 0.0 L</strong>
            </div>
            <div>
              <p className={css.normaTitleModal}>
                Write down how much water you will drink:
              </p>
              <input
                className={css.normaInput}
                type="number"
                placeholder="0"
              />
            </div>
            <button className={css.normaButtonSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </BasicModalWindow>
  );
};

DailyNormaModalWindow.propTypes = {
  onClose: PropTypes.func.isRequired,
  isShow: PropTypes.bool.isRequired,
};

export default DailyNormaModalWindow;

