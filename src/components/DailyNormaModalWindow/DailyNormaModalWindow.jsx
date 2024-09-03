import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import css from "./DailyNormaModalWindow.module.css";
import { BasicModalWindow } from "../BasicModalWindow/BasicModalWindow";

const DailyNormaModalWindow = ({ onClose, onOpen, onSave }) => {
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [activityTime, setActivityTime] = useState('');
  const [dailyNormLvl, setDailyNormLvl] = useState(0.0);
  const [waterRate, setWaterRate] = useState('');

  useEffect(() => {
    const measuredWeight = parseFloat(weight);
    const timeOfActivity = parseFloat(activityTime);

    if (gender && !isNaN(measuredWeight) && !isNaN(timeOfActivity)) {
      let aquaVolume = 0;
      if (gender === 'female') {
        aquaVolume = (measuredWeight * 0.03) + (timeOfActivity * 0.4);
      } else if (gender === 'male') {
        aquaVolume = (measuredWeight * 0.04) + (timeOfActivity * 0.6);
      }
      setDailyNormLvl(aquaVolume.toFixed(1));
    } else {
      setDailyNormLvl(0.0);
    }
  }, [gender, weight, activityTime]);

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleWeightChange = (e) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 0 && Number(value) <= 250)) {
      setWeight(value);
    }
  };

  const handleActivityTimeChange = (e) => {
    const value = e.target.value;
    if (value === '' || Number(value) >= 0) {
      setActivityTime(value);
    }
  };

  const handlewaterRateChange = (e) => {
    const value = e.target.value;
    if (value === '' || Number(value) >= 0) {
      setWaterRate(value);
    }
  };

  const handleSave = () => {
    if (!gender) {
      alert("Please select your gender.");
      return;
    }
    if (!weight || isNaN(weight) || weight <= 0) {
      alert("Please enter a valid weight.");
      return;
    }
    if (isNaN(activityTime) || activityTime < 0) {
      alert("Please enter a valid activity time.");
      return;
    }
    if (isNaN(waterRate) || waterRate < 0) {
      alert("Please enter a valid amount of water to drink.");
      return;
    }

    const data = {
      gender,
      weight: parseFloat(weight),
      activityTime: parseFloat(activityTime),
      dailyNormLvl: parseFloat(dailyNormLvl),
      waterRate: parseFloat(waterRate),
      date: new Date().toISOString(), 
    };

    onSave(data);
    onClose();
  };

  return (
    <BasicModalWindow onClose={onClose} onOpen={onOpen} title="My daily norma">
      <div className={css.BoxModal}>
        <div>
          <div className={css.normaFormula}>
            <p className={css.normaParagraph}>
              For woman: <span>V=(M*0.03) + (T*0.4)</span>
            </p>
            <p className={css.normaParagraph}>
              For man: <span>V=(M*0.04) + (T*0.6)</span>
            </p>
          </div>
          <div className={css.normaExplanation}>
            <p>
              <span>*</span> V is the volume of the water norm in liters per day, M is your body weight in kilograms, T is the time of active sports or other high-physical-load activities in hours (set to 0 if none).
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
                  checked={gender === 'female'}
                  onChange={handleGenderChange}
                />
                <span>For woman</span>
              </label>
              <label>
                <input
                  className={css.normaInputRadio}
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={handleGenderChange}
                />
                <span>For man</span>
              </label>
            </div>
            <div>
              <p className={css.normaParagraph}>Your weight in kilograms:</p>
              <input
                className={css.normaInput}
                type="number"
                min="0"
                max="250"
                placeholder="0"
                value={weight}
                onChange={handleWeightChange}
              />
            </div>
            <div>
              <p className={css.normaParagraph}>
                The time of active participation in sports or other activities with high physical load in hours:
              </p>
              <input
                className={css.normaInput}
                type="number"
                min="0"
                placeholder="0"
                value={activityTime}
                onChange={handleActivityTimeChange}
              />
            </div>
            <div className={css.normaFormResult}>
              The required amount of water in liters per day:
              <strong>{dailyNormLvl} L</strong>
            </div>
            <div>
              <p className={css.normaTitleModal}>
                Write down how much water you will drink:
              </p>
              <input
                className={css.normaInput}
                type="number"
                placeholder="0"
                value={waterRate}
                onChange={handlewaterRateChange}
              />
            </div>
            <button className={css.normaButtonSave} onClick={handleSave}>
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
  onOpen: PropTypes.func.isRequired,  
  onSave: PropTypes.func.isRequired, 
};

export default DailyNormaModalWindow;
