import { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc , doc} from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'

function Profile() {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser) {
      setFormData({
        name: auth.currentUser.displayName || "",
        email: auth.currentUser.email || "",
      });
    }
  }, [auth.currentUser]);

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== formData.name) {
        //update display name in firebase
        await updateProfile(auth.currentUser , {
          displayName : formData.name
        });

        //update display name in firestore 
        const userRef = doc(db , 'users', auth.currentUser.uid);
          await updateDoc(userRef, {
            displayName: formData.name
        })
      }
    } catch (error) {
     toast.error('could not update profile details')
    }
  };
  

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button type="button" className="logOut" onClick={onLogout}>
          Logout
        </button>
      </header>

      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? "Done" : "Change"}
          </p>
        </div>

        <div className="profileCard">
          <form>
           
            <input
              type="text"
              id="name"
              className={!changeDetails ? "profileName" : "profileNameActive"}
              disabled={!changeDetails}
              value={formData.name}
              onChange={onChange}
            />
            
            <input
              type="text"
              id="email"
              className={!changeDetails ? "profileEmail" : "profileEmailActive"}
              value={formData.email}
              disabled={!changeDetails}
              onChange={onChange}
            />
            
          </form>
        </div>
      </main>
    </div>
  );
}

export default Profile;
