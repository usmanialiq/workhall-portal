import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../store/actions/auth';
import LogoImage from '../../assets/logo.png';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useSelector(state => state.auth);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if (auth.isAuthenticated) {
            history.push('/dashboard');
        }
    }, [auth.isAuthenticated, history]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            email,
            password,
        };
        
        dispatch(loginUser(payload));
    }
    return (
        <div className='container-fluid'>
            <form className='auth-form auth-login'>
                <div className='text-center'>
                    <img src={LogoImage} className='img-fluid' width={50} height={50} alt='Workhall Logo' />
                </div>
                <h2 className='text-center mb-3'>Sign In to our platform</h2>
                <div className='form-floating mb-4'>
                    <input 
                        type='email' 
                        className='form-control' 
                        id='email' 
                        placeholder='name@example.com' 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor='email' className='form-label'>Email address</label>
                </div>
                <div className='form-floating mb-4'>
                    <input 
                        type='password' 
                        className='form-control' 
                        id='password' 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <label htmlFor='password' className='form-label'>Password</label>
                </div>
                <div className='row'>
                    <div className='col-sm-12 col-md-6'>
                        <div className='form-check'>
                            <input className='form-check-input' type='checkbox' value='' id='remeberme' />
                            <label className='form-check-label' htmlFor='remeberme'>
                                Remember me
                            </label>
                        </div>
                    </div>
                    <div className='col-sm-12 col-md-6 text-end'>
                        <span className='lostpassword'>Lost password?</span>
                    </div>
                </div>
                <div className='text-center mt-3 mb-3'>
                    <button className='btn btn-primary btn-wh w-100' onClick={handleSubmit}>Sign In</button>
                    
                    <p className='pt-3'>Not registered? <Link to='/register'>Create account</Link></p>
                </div>
                
            </form>
        </div>
    );
}

export default LoginPage;
