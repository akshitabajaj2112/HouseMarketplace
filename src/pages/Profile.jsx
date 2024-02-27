import { useState, useEffect } from 'react';
import { getAuth , updateProfile } from 'firebase/auth';
import { updateDoc } from 'firebase/firestore';
import {db} from '../firebase.config'
import { useNavigate } from 'react-router-dom';

function Profile() {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser) {
      setFormData({
        name: auth.currentUser.displayName || '',
        email: auth.currentUser.email || ''
      });
    }
  }, [auth.currentUser]);

  const onLogout = () => {
    auth.signOut();
    navigate('/');
  };

  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className="pageHeader">My Profile</p>
        <button type='button' className="logOut" onClick={onLogout}>
          Logout
        </button>
      </header>

      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p className="changePersonalDetails">
            {changeDetails ? 'Done' : 'Change'}
          </p>
        </div>
        <form>
          <label>Name:</label>
          <input type="text" value={formData.name} disabled={!changeDetails} />
          <label>Email:</label>
          <input type="email" value={formData.email} disabled={!changeDetails} />
        </form>
      </main>
    </div>
  );
}

export default Profile;
