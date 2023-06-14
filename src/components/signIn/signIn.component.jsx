import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../form-input/form-input.component";


import { signInAuthUserWithEmailAndPassword, signInWithGoogleRedirect } from "../../utils/firebase/firebase.utils";

import './signIn.styles.scss';

const defaultFormFields = {
    email:'',
    password:''
}

const SignIn = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;
    const nav = useNavigate();

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };
    const signInWithGoogle = async () => {
        await signInWithGoogleRedirect();
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
            nav('/');
        } catch (error) {
            console.log('user sign in failed', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]:value});
    };

    return (
        <div className='sign-in-page-container'>
            <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
            <FormInput
                label='Email'
                type='email'
                required
                onChange={handleChange}
                name='email'
                value={email}
            />
    
            <FormInput
                label='Password'
                type='password'
                required
                onChange={handleChange}
                name='password'
                value={password}
            />
            <div className='buttons-container'>
                <button type='submit'>Sign In</button>
                <button type='button' onClick={signInWithGoogle}>
                Sign In With Google
                </button>
            </div>
            </form>
        </div> 
      </div>       
    )
}

export default SignIn;