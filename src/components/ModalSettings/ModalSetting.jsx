import { useState, useEffect } from "react";
import styles from "./ModalSettings.module.css";
import { MdOutlineFileUpload } from "react-icons/md";

export default function ModalSetting() {
  const [showModalSetting, setShowModalSetting] = useState(false);

  useEffect(() => {
    console.log("showModalSetting:", showModalSetting); // Перевірка зміни стану
  }, [showModalSetting]);

  const handleClose = () => setShowModalSetting(false);

  return (
    <div>
      <button onClick={() => setShowModalSetting(true)}>
        Відкрити модальне вікно
      </button>
      {showModalSetting && (
        <div className={styles.modal}>
          <div className={styles.modalcontent}>
            <span className={styles.close} onClick={handleClose}>
              &times;
            </span>
            <h2 className={styles.titleOfModalSettings}>Settings</h2>
            <form>
              <div className={styles.wrapperForBlokOfPhoto}>
                <label className={styles.yourPhoto}>
                  <span className={styles.titels}>Your photo</span>
                  <div className={styles.uploadAPhoto}>
                    <img
                      src="https://m.media-amazon.com/images/M/MV5BMTQ5MzkzNTIyN15BMl5BanBnXkFtZTYwNzUzOTA2._V1_FMjpg_UX1000_.jpg"
                      alt="Foto of user"
                      className={styles.fotoOfUser}
                    />
                    <MdOutlineFileUpload
                      className={styles.iconOfUploadAPhoto}
                    />
                    <p className={styles.textUploadAPhoto}>Upload a photo</p>
                  </div>
                </label>
              </div>



              <div className={styles.wrapperForNameAndPassword}>
                <div className={styles.wrapperForBlockOne}>
                  <label>
                    <span className={styles.titels}>Your gender identity</span>
                    <div className={styles.genderradiobutton}>
                      <div>
                        <input
                          className={styles.genderInput}
                          type="radio"
                          id="genderWoman"
                          name="gender"
                          value="Woman"
                        />
                        <label htmlFor="genderWoman">Woman</label>
                      </div>
                      <div>
                        <input
                          className={styles.genderInput}
                          type="radio"
                          id="genderMan"
                          name="gender"
                          value="Man"
                        />
                        <label htmlFor="genderMan">Man</label>
                      </div>
                    </div>
                  </label>

                  <label>
                    <span className={styles.titels}>Your name</span>
                    <input
                      type="text"
                      name="name"
                      value="Jhon Cena"
                      className={styles.textInputArea}
                    />
                  </label>
                  <label>
                    <span className={styles.titels}>E-mail</span> <br />
                    <input
                      className={styles.textInputArea}
                      type="email"
                      name="email"
                      value="JhonCena@gmail.com"
                    />
                  </label>
                </div>





                <div className={styles.wrapperForPasswordField}>
                  <label>
                    <span className={styles.titels}>Password</span> <br />
                    <span className={styles.titelsOutdatedPassword}>Outdated password:</span>
                    <input
                      type="text"
                      name="name"
                      value="Password"
                      className={styles.textInputArea}
                    />
                  </label>
                  <label>
                    <span>New Password:</span> <br />
                    <input
                      type="text"
                      name="name"
                      value="Password"
                      className={styles.textInputArea}
                    />
                  </label>
                  <label>
                    <span>Repeat new password:</span>
                    <input
                      type="text"
                      name="name"
                      value="Password"
                      className={styles.textInputArea}
                    />
                  </label>
                </div>
              </div>

              <button type="submit" className={styles.saveButton}>Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
