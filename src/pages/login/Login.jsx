import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './login.scss'
import { PWD_REGEX, USER_REGEX } from '../../auth/regauth';
const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [formObject, setFormObject] = useState({ user: '', pwd: '', matchpwd: '' });
  const { user, pwd, matchpwd } = formObject;
const [allFocuses,setAllFocuses] = useState({userFocus:false,pwdFocus:false,matchFocus:false});
  const [validName, setValidName] = useState(false);

  const [validPwd, setValidPWd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);


  const [errMsg, setErrMsg] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])


  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result)
  }, [user])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPWd(result);
    const match = pwd === matchpwd;
    setValidMatch(match);
  }, [pwd, matchpwd])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd, matchpwd])
  const handleSubmit = async (e) => {
    e.preventDefault();
    const checkUserAgain = USER_REGEX.test(user);
    const checkPwdAgain = PWD_REGEX.test(pwd);
    if (!checkPwdAgain || !checkUserAgain) {
      return;
    }
    else{
      alert("Input valid values")
    };
    setSuccess(true);
  }


  return (
    <form onSubmit={handleSubmit} className='loginForm dfAc'>

      <div className="loginContainer fldc">
        <div className="fldc usPcP">
          <p aria-live='assertive'>{errMsg}</p>
          <div>
            <input type="text"
              ref={userRef} autoComplete='off' required
              onChange={(e) => setFormObject({ ...formObject, user: e.target.value })}
              onFocus={() => setAllFocuses({...allFocuses,userFocus:true})}
              onBlur={() =>setAllFocuses({...allFocuses,userFocus:false})}
              placeholder='Username' />
          </div>

          <div>
                <input type="password" placeholder='Password' required
              onChange={(e) => setFormObject({ ...formObject, pwd: e.target.value })}
              onFocus={() => setAllFocuses({...allFocuses,pwdFocus:true})}
              onBlur={() => setAllFocuses({...allFocuses,pwdFocus:false})} />
          </div>


          <div>
            <input type="password" placeholder='Confirm Passsword' required
              onChange={(e) => setFormObject({ ...formObject, matchpwd: e.target.value })}
              onFocus={() => setAllFocuses({...allFocuses,matchFocus:true})}
              onBlur={() => setAllFocuses({...allFocuses,matchFocus:true})} />
          </div>

        </div>
        <div className='df-jsb reg'>
          <Link to={'/register'}>Register Now</Link>
          <Link to={'/register'}>Forgot Password</Link>
        </div>
        <div className="btnContainer" >
          <button type='submit'
            className="btn">Register</button>
        </div>
        <div style={{ padding: '1rem 0 2rem 0' }}>
          <p>Or Login With</p>
        </div>
        <div className="continuation fldc-jc">
          <button type='button' className='df-ac'><div className="fab fa-facebook-square"></div><div>Facebook</div> </button>
          <button type='button' className='df-ac gmail'><div className="fab fa-google"></div> <div>Google</div> </button>
          <button type='button' className='df-ac twitter'><div className="fab fa-twitter-square"></div><div>Twitter</div></button>
        </div>
      </div>

    </form>
  )
}

export default Login