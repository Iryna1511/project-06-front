import { useState, useEffect } from "react";
import styles from "./ModalSettings.module.css";
import { MdOutlineFileUpload } from "react-icons/md";
import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";

export default function ModalSetting({ isOpen, closeModal }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
    gender: "", // Поле гендерної ідентичності
  });

  const [passwordVisibility, setPasswordVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    repeatPassword: false,
  });

  // Виконуємо запит на бекенд при відкритті модального вікна
  useEffect(() => {
    if (isOpen) {
      fetch("https://water-tracker-06.onrender.com/users/66d2e3a18c42147b871bcdcc")
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            const { name, email, gender } = data.data;
            setFormData((prevData) => ({
              ...prevData,
              name: name,
              email: email,
              gender: gender === "female" ? "Woman" : "Man", // Мапінг гендеру на відповідні значення
            }));
          } else {
            console.error("Failed to fetch user data");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [isOpen]);

  useEffect(() => {
  if (isOpen) {
    console.log("Modal is open, attempting to fetch data...");
    fetch("https://water-tracker-06.onrender.com/users/66d2e3a18c42147b871bcdcc")
      .then((response) => {
        console.log("Response received:", response);
        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data);
        if (data.status === 200) {
          const { name, email, gender } = data.data;
          setFormData((prevData) => ({
            ...prevData,
            name: name,
            email: email,
            gender: gender === "female" ? "Woman" : "Man", // Мапінг гендеру на відповідні значення
          }));
        } else {
          console.error("Failed to fetch user data, status:", data.status);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }
}, [isOpen]);

  const handleOutsideClick = (event) => {
    if (event.target.classList.contains(styles.modal)) {
      closeModal();
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenderChange = (e) => {
    setFormData({
      ...formData,
      gender: e.target.value,
    });
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility({
      ...passwordVisibility,
      [field]: !passwordVisibility[field],
    });
  };

 const handleSubmit = (e) => {
    e.preventDefault();
    
    // Створюємо об'єкт з даними, які потрібно відправити на бекенд
    const updatedData = {
        name: formData.name,
        email: formData.email,
        gender: formData.gender === "Woman" ? "female" : "male", // Мапінг назад на значення для бекенду
        // Ви можете додати поля oldPassword, newPassword і repeatPassword, якщо потрібно
    };

    // Виконуємо PUT або PATCH запит на оновлення даних користувача
    fetch("https://water-tracker-06.onrender.com/users/66d2e3a18c42147b871bcdcc", {
        method: "PUT", // або "PATCH"
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.status === 200) {
            console.log("User data successfully updated:", data);
            // Закриваємо модальне вікно після успішного сабміту форми
            closeModal();
        } else {
            console.error("Failed to update user data");
        }
    })
    .catch((error) => {
        console.error("Error updating user data:", error);
    });
};

  return (
    <div>
      {isOpen && (
        <div className={styles.modal} onClick={handleOutsideClick}>
          <div className={styles.modalcontent}>
            <span className={styles.close} onClick={closeModal}>
              <RxCross1 className={styles.cross} />
            </span>
            <h2 className={styles.titleOfModalSettings}>Setting</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.wrapperForBlokOfPhoto}>
                <label className={styles.yourPhoto}>
                  <span className={styles.titels}>Your photo</span>
                  <div className={styles.uploadAPhoto}>
                    <img
                      src="https://m.media-amazon.com/images/M/MV5BMTQ5MzkzNTIyN15BMl5BanBnXkFtZTYwNzUzOTA2._V1_FMjpg_UX1000_.jpg"
                      alt="Foto of user"
                      className={styles.fotoOfUser}
                    />
                    <div className={styles.uploadButton}>
                      <MdOutlineFileUpload
                        className={styles.iconOfUploadAPhoto}
                      />
                      <p className={styles.textUploadAPhoto}>Upload a photo</p>
                    </div>
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
                          checked={formData.gender === "Woman"}
                          onChange={handleGenderChange}
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
                          checked={formData.gender === "Man"}
                          onChange={handleGenderChange}
                        />
                        <label htmlFor="genderMan">Man</label>
                      </div>
                    </div>
                  </label>

                  <label>
                    <span className={styles.titels}>Your name</span>
                    <div className={styles.wrapperForInput}>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={styles.textInputArea}
                      />
                    </div>
                  </label>
                  <label>
                    <span className={styles.titels}>E-mail</span>
                    <div className={styles.wrapperForInput}>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={styles.textInputArea}
                      />
                    </div>
                  </label>
                </div>

                <div className={styles.wrapperForPasswordField}>
                  <span className={styles.titels}>Password</span>
                  <label>
                    <span className={styles.titelsOutdatedPassword}>
                      Outdated password:
                    </span>
                    <div className={styles.wrapperForInput}>
                      <input
                        type={
                          passwordVisibility.oldPassword ? "text" : "password"
                        }
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleInputChange}
                        className={styles.textInputAreaPassword}
                      />
                      <span
                        onClick={() => togglePasswordVisibility("oldPassword")}
                      >
                        {passwordVisibility.oldPassword ? (
                          <HiOutlineEye className={styles.eyeIcon} />
                        ) : (
                          <HiOutlineEyeOff className={styles.eyeIcon} />
                        )}
                      </span>
                    </div>
                  </label>
                  <label>
                    <span>New Password:</span>
                    <div className={styles.wrapperForInput}>
                      <input
                        type={
                          passwordVisibility.newPassword ? "text" : "password"
                        }
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className={styles.textInputAreaPassword}
                      />
                      <span
                        onClick={() => togglePasswordVisibility("newPassword")}
                      >
                        {passwordVisibility.newPassword ? (
                          <HiOutlineEye className={styles.eyeIcon} />
                        ) : (
                          <HiOutlineEyeOff className={styles.eyeIcon} />
                        )}
                      </span>
                    </div>
                  </label>
                  <label>
                    <span>Repeat new password:</span>
                    <div className={styles.wrapperForInput}>
                      <input
                        type={
                          passwordVisibility.repeatPassword
                            ? "text"
                            : "password"
                        }
                        name="repeatPassword"
                        value={formData.repeatPassword}
                        onChange={handleInputChange}
                        className={styles.textInputAreaPassword}
                      />
                      <span
                        onClick={() =>
                          togglePasswordVisibility("repeatPassword")
                        }
                      >
                        {passwordVisibility.repeatPassword ? (
                          <HiOutlineEye className={styles.eyeIcon} />
                        ) : (
                          <HiOutlineEyeOff className={styles.eyeIcon} />
                        )}
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <button type="submit" className={styles.saveButton}>
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}