import { useState, useEffect } from "react";
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
    avatar: null, // Додано для зберігання аватара
  });
  const [initialData, setInitialData] = useState({
    name: "",
    email: "",
    gender: "",
    avatar: null, // Додано для зберігання початкового аватара
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
            const { name, email, gender, avatar } = data.data;

            setFormData((prevData) => ({
              ...prevData,
              name: name,
              email: email,
              gender: gender
                ? gender === "female"
                  ? "Woman"
                  : "Man"
                : "Woman",
              avatar,
            }));

            setInitialData({
              name: name,
              email: email,
              gender: gender
                ? gender === "female"
                  ? "Woman"
                  : "Man"
                : "Woman",
              avatar,
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

 const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file); // Створюємо тимчасовий URL
    setFormData({
      ...formData,
      avatar: imageUrl, // Оновлюємо аватар на URL для попереднього перегляду
      avatarFile: file, // Зберігаємо файл для відправлення на бекенд
    });
  }
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

  if (Object.keys(updatedData).length > 0) {
    fetch(`https://water-tracker-06.onrender.com/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          console.log("User data successfully updated:", data);
          if (formData.avatarFile) {
            handleAvatarUpdate(formData.avatarFile);
          } else {
            closeModal();
          }
        } else {
          console.error("Failed to update user data");
        }
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  } else if (formData.avatarFile) {
    handleAvatarUpdate(formData.avatarFile);
  } else {
    closeModal();
  }
};

  const handleAvatarUpdate = (avatar) => {
  const formData = new FormData();
  formData.append("avatar", avatar);

  fetch("https://water-tracker-06.onrender.com/user/avatar", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 201) {
        console.log("Avatar successfully updated:", data);
        
        // Оновлюємо стан з новим URL аватара
        setFormData((prevData) => ({
          ...prevData,
          avatar: data.data.avatar,  // Додаємо новий URL аватара
        }));

        closeModal();
      } else {
        console.error("Failed to update avatar");
      }
    })
    .catch((error) => {
      console.error("Error updating avatar:", error);
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
            <h2 className={styles.titleOfModalSettings}>Settings</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.wrapperForBlokOfPhoto}>
                <label className={styles.yourPhoto}>
                  <span className={styles.titels}>Your photo</span>
                  <div className={styles.uploadAPhoto}>
                    <img
                      src={
                        formData.avatar || initialData.avatar || "https://i.sstatic.net/34AD2.jpg"
                      }
                      alt="User photo"
                      className={styles.fotoOfUser}
                    />
                    <label className={styles.uploadButton}>
                      <MdOutlineFileUpload
                        className={styles.iconOfUploadAPhoto}
                      />
                      <p className={styles.textUploadAPhoto}>Upload a photo</p>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className={styles.hiddenFileInput}
                        accept="image/*"
                      />
                    </label>
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
                          passwordVisibility.outdatedPassword
                            ? "text"
                            : "password"
                        }
                        name="outdatedPassword"
                        value={formData.outdatedPassword}
                        onChange={handleInputChange}
                        className={styles.textInputAreaPassword}
                        placeholder="Password"
                      />
                      <span
                        onClick={() =>
                          togglePasswordVisibility("outdatedPassword")
                        }
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
                        placeholder="Password"
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
                        placeholder="Password"
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
