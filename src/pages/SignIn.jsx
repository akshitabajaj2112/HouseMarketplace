import { useState } from "react";
import {toast}  from 'react-toastify'
import { Link, useNavigate } from "react-router-dom";
import {getAuth , isSignInWithEmailLink, signInWithEmailAndPassword} from 'firebase/auth'
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import OAuth from "../components/OAuth";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit =async(e) =>{
    e.preventDefault()


    try {
      const auth = getAuth()
    const userCredential = await signInWithEmailAndPassword (auth , email , password)

    if (userCredential.user){
      navigate('/')
    }
    } catch (error) {
      toast.error('bad user credentials')
    }
    
  }
 
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>

        <form onSubmit={onSubmit}>
          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            id="email" 
            value={email}
            onChange={onChange}
          />

          <div className="passwordInputDiv">
            <input
              type={showPassword ? "text" : "password"}
              className="passwordInput"
              placeholder="password"
              id="password" 
              value={password}
              onChange={onChange}
            />

            <img
              src={visibilityIcon}
              alt="show password"
              className="showPassword"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />

            <Link to="/forgot-password" className="forgotPasswordLink">
              forgot password
            </Link>

            <div className="signInBar">
              <p className="signInText">Sign-IN</p>

              <button className="signInButton">
                <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
              </button>
            </div>
          </div>
        </form>

        <OAuth/>

        <Link to="/sign-up" className="registerLink">
          Sign up Instead!
        </Link>
      </div>
    </>
  );
}

export default SignIn;
