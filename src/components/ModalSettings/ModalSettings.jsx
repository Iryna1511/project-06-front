import { useState, useEffect} from "react";
import styles from "./ModalSettings.module.css";
import { MdOutlineFileUpload } from "react-icons/md";
import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";

export default function ModalSetting({ isOpen, closeModal, userId, token }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    outdatedPassword: "",
    newPassword: "",
    repeatPassword: "",
    gender: "",
  });
  const [initialData, setInitialData] = useState({
    name: "",
    email: "",
    gender: "",
  });

  const [passwordVisibility, setPasswordVisibility] = useState({
    outdatedPassword: false,
    newPassword: false,
    repeatPassword: false,
  });

useEffect(() => {
  if (isOpen) {
    fetch(`https://water-tracker-06.onrender.com/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          const { name, email, gender } = data.data;


          setFormData((prevData) => ({
            ...prevData,
            name: name,
            email: email,
            gender: gender ? (gender === "female" ? "Woman" : "Man") : "Woman", // Якщо гендер не визначений, за замовчуванням "Woman"
          }));


          setInitialData({
            name: name,
            email: email,
            gender: gender ? (gender === "female" ? "Woman" : "Man") : "Woman", // Якщо гендер не визначений, за замовчуванням "Woman"
          });
        } else {
          console.error("Failed to fetch user data");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }
}, [isOpen, userId, token]);

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

    if (formData.newPassword !== formData.repeatPassword) {
      console.error("New passwords do not match");
      return;
    }

    const updatedData = {};
    if (formData.name !== initialData.name) {
      updatedData.name = formData.name;
    }
    if (formData.email !== initialData.email) {
      updatedData.email = formData.email;
    }
    if (formData.gender !== initialData.gender) {
      updatedData.gender = formData.gender === "Woman" ? "female" : "male";
    }
    if (formData.outdatedPassword) { 
      updatedData.password = formData.outdatedPassword;

    }
    if (formData.newPassword) {
      updatedData.newPassword = formData.newPassword;
    }

    if (Object.keys(updatedData).length === 0) {
      console.log("No changes detected");
      return;
    }
    

    fetch(
      `https://water-tracker-06.onrender.com/user`, // Замініть на ID користувача
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Використайте свіжий токен
        },
        body: JSON.stringify(updatedData),
      }
    )
      .then((response) => {
        console.log("Response status:", response.status);
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data);
        if (data.status === 200) {
          console.log("User data successfully updated:", data);
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
                          passwordVisibility.outdatedPassword ? "text" : "password"
                        }
                        name="outdatedPassword" // Заміна oldPassword на outdatedPassword
                        value={formData.outdatedPassword}
                        onChange={handleInputChange}
                        className={styles.textInputAreaPassword}
                      />
                      <span
                        onClick={() => togglePasswordVisibility("outdatedPassword")} // Заміна oldPassword на outdatedPassword
                      >
                        {passwordVisibility.outdatedPassword ? (
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