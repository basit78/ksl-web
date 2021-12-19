import React, { useEffect, useState } from "react";
import "./signup.css"

import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../config/firebase"
function Signup() {
    useEffect(() => {
        document.querySelector('.img__btn').addEventListener('click', function () {
            document.querySelector('.cont').classList.toggle('s--signup');
        });
    })
    const [semail, setsemail] = useState('')
    const [spassword, setspassword] = useState('')
    const [rname, setrname] = useState('');
    const [remail, setremail] = useState('');
    const [rpassword, setrpassword] = useState('');
    const [remailerr, setremailerr] = useState('');
    const [rpassworderr, setrpassworderr] = useState('');
    const [semailerr, setsemailerr] = useState('');
    const [spassworderr, setspassworderr] = useState('');

    const register = async () => {
        try {
            await createUserWithEmailAndPassword(auth, remail, rpassword)
        }
        catch (err) {
            if (err.message === 'Firebase: Error (auth/invalid-email).') {
                setremailerr(true)
            }
            if (err.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                setrpassworderr(true)
            }
            setTimeout(() => {
                setremailerr('')
                setrpassworderr('')
            }, 3000);
        }
    }


    const signin = async () => {
        try {
            await signInWithEmailAndPassword(auth, semail, spassword)
        }
        catch (err) {
            if (err.message === 'Firebase: Error (auth/invalid-email).') {
                setsemailerr([true, 'Invaid email'])
            }
            if (err.message === 'Firebase: Error (auth/user-not-found).') {

                setsemailerr([true, 'User email not found'])

            }
            if (err.message === 'Firebase: Error (auth/wrong-password).') {
                setsemailerr('')
                setspassworderr([true, 'Type correct password'])
            }
            setTimeout(() => {
                setsemailerr('');
                setspassworderr('');
            }, 3000);
        }

    }
    return (
        <div className="body">
            <p className="tip">Web Admin Panel</p>
            <img src=""/>
            <div className="cont">
                <div className="form sign-in">
                    <h2>Welcome back,</h2>
                    <label>
                        <span>Email</span>
                        <input type="email" onChange={(event) => { setsemail(event.target.value) }} />
                    </label>
                    {
                        semailerr[0] ?
                            <p style={{ color: "red",textAlign:'center' }}><i className="fa fa-exclamation-circle" aria-hidden="true"></i> {semailerr[1]}</p>
                            :
                            null
                    }
                    <label>
                        <span>Password</span>
                        <input type="password" onChange={(event) => { setspassword(event.target.value) }} />
                    </label>
                    {
                        spassworderr[0]
                            ?
                            <p style={{ color: "red" ,}}><i className="fa fa-exclamation-circle" aria-hidden="true"></i> {spassworderr[1]}</p>
                            : null
                    }
                    <p className="forgot-pass">Forgot password?</p>
                    <button type="button" className="submit" onClick={signin}>Sign In</button>
                </div>
                <div className="sub-cont">
                    <div className="img">
                        <div className="img__text m--up">
                            <h2>New here?</h2>
                            <p>Register and discover great amount of new opportunities!</p>
                        </div>
                        <div className="img__text m--in">
                            <h2>One of us?</h2>
                            <p>If you already has an account, just sign in. We've missed you!</p>
                        </div>
                        <div className="img__btn">
                            <span className="m--up">Register</span>
                            <span className="m--in">Sign In</span>
                        </div>
                    </div>
                    <div className="form sign-up">
                        <h2>Time to feel like home,</h2>
                        <label>
                            <span>Name</span>
                            <input type="text" onChange={(ev) => { setrname(ev.target.value) }} />
                        </label>
                        <label>
                            <span>Email</span>
                            <input type="email" onChange={(ev) => { setremail(ev.target.value) }} />
                        </label>
                        <br />
                        {
                            remailerr ?
                                <p style={{ color: "red", textAlign: 'center' }}><i className="fa fa-exclamation-circle" aria-hidden="true"></i> Invalid Email</p>
                                :
                                null
                        }
                        <label>
                            <span>Password</span>
                            <input type="password" onChange={(ev) => { setrpassword(ev.target.value) }} />
                        </label>
                        <br />
                        {
                            rpassworderr
                                ?
                                <p style={{ color: "red", textAlign: 'center' }}>< i className="fa fa-exclamation-circle" aria-hidden="true"></i> Week Password</p>
                                : null

                        }
                        <button type="button" className="submit" onClick={register}>Register</button>
                    </div>
                </div>
            </div>

        </div>


    )
}


export default Signup;