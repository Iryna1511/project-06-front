import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./ModalSettings.module.css";
import { MdOutlineFileUpload } from "react-icons/md";
import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { updateUserData } from "../../redux/auth/authSlice.js";
import { refreshUser } from "../../redux/auth/operations.js";
import { toast } from "react-hot-toast";

export default function ModalSetting({ isOpen, closeModal }) {
  // Хуки
  const dispatch = useDispatch();
  // Витягуємо дані користувача з Redux-стейту
  const user = useSelector((state) => state.auth.user);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        name: user.data?.name,
        email: user.data?.email,
        gender: user.data?.gender === "female" ? "Woman" : "Man",
        avatar: user.data?.avatar || "",
      });
    }
  }, [user]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    outdatedPassword: "",
    newPassword: "",
    repeatPassword: "",
    gender: "",
    avatar: undefined,
  });

  const [initialData, setInitialData] = useState({
    name: "",
    email: "",
    gender: "",
    avatar: undefined,
  });

  const [passwordVisibility, setPasswordVisibility] = useState({
    outdatedPassword: false,
    newPassword: false,
    repeatPassword: false,
  });

  useEffect(() => {
    if (isOpen && user) {
      const { name, email, gender, avatar } = user.data;

      setFormData((prevData) => ({
        ...prevData,
        name: name,
        email: email,
        gender: gender === "female" ? "Woman" : "Man",
        avatar: avatar || "",
      }));

      setInitialData({
        name: name,
        email: email,
        gender: gender === "female" ? "Woman" : "Man",
        avatar:
          avatar ||
          "https://preview.redd.it/high-resolution-remakes-of-the-old-default-youtube-avatar-v0-bgwxf7bec4ob1.png?width=2160&format=png&auto=webp&s=2bdfee069c06fd8939b9c2bff2c9917ed04771af",
      });
    }
  }, [isOpen, user]);

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
      const imageUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        avatar: imageUrl,
        avatarFile: file,
      });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.newPassword !== formData.repeatPassword) {
    toast.error("New passwords do not match");
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

  try {
    let updateResponse;
    if (Object.keys(updatedData).length > 0) {
      updateResponse = await fetch(
        `https://water-tracker-06.onrender.com/user`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );
      const updateData = await updateResponse.json();
      if (updateResponse.ok) {
        // Оновлення даних у Redux-стейті
        dispatch(updateUserData(updateData.data));

        if (formData.avatarFile) {
          await handleAvatarUpdate(formData.avatarFile);
        }

        // Тільки після успішного оновлення викликати рефреш
        dispatch(refreshUser());

        toast.success("User data successfully updated");
        // Закрити модалку
        closeModal();
        
      } else {
        toast.error("Failed to update user data");
      }
    } else if (formData.avatarFile) {
      await handleAvatarUpdate(formData.avatarFile);
      toast.success("User data successfully updated");
      closeModal();
    }
  } catch (error) {
    toast.error("Error updating user data: " + error.message);
  }
};

  const handleAvatarUpdate = async (avatar) => {
  try {
    const formData = new FormData();
    formData.append("avatar", avatar);

    const response = await fetch(
      "https://water-tracker-06.onrender.com/user/avatar",
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
    const data = await response.json();
    if (response.ok) {
      // Оновлення аватара у Redux-стейті
      dispatch(updateUserData({ avatar: data.data.avatar }));

      // Оновлення локального стейту
      setFormData((prevData) => ({
        ...prevData,
        avatar: data.data.avatar,
      }));

      toast.success("Avatar successfully updated");
    } else {
      toast.error("Failed to update avatar");
    }
  } catch (error) {
    toast.error("Error updating avatar: " + error.message);
  }
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
                    {formData.avatar ? (
                      <img
                        src={formData.avatar}
                        alt="Фото"
                        className={styles.fotoOfUser}
                      />
                    ) : (
                      <div className={styles.defoltAvatarOfUser}>
                        <p className={styles.firstSimbolOfEmail}>
                          {formData.email[0]}
                        </p>
                      </div>
                    )}

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
                        <label htmlFor="genderWoman">
                          <input
                            className={styles.genderInput}
                            type="radio"
                            id="genderWoman"
                            name="gender"
                            value="Woman"
                            checked={formData.gender === "Woman"}
                            onChange={handleGenderChange}
                          />
                          Woman
                        </label>
                      </div>
                      <div>
                        <label htmlFor="genderMan">
                          <input
                            className={styles.genderInput}
                            type="radio"
                            id="genderMan"
                            name="gender"
                            value="Man"
                            checked={formData.gender === "Man"}
                            onChange={handleGenderChange}
                          />
                          Man
                        </label>
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
