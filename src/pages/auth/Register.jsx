import { useState } from "react";

export default function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            firstName,
            lastName,
            phone,
            email,
            city,
            password,
            confirmPassword,
        };
        console.log("🚀 ~ file: LogIn.jsx:11 ~ handleSubmit ~ payload", payload);
    }
    return (
        <div className="container-fluid">
            <form className="auth-form">
                <h2 className="text-center mb-3">Create an account</h2>
                <div className="form-floating mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="firstName" 
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        required
                    />
                    <label htmlFor="firstName" className="form-label">First Name *</label>
                </div>
                <div className="form-floating mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="lastName" 
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        required
                    />
                    <label htmlFor="lastName" className="form-label">Last Name *</label>
                </div>
                <div className="form-floating mb-3">
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="email" className="form-label">Email address *</label>
                </div>
                <div className="form-floating mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="phone"  
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                </div>
                <div className="form-floating mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="city" 
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />
                    <label htmlFor="city" className="form-label">City</label>
                </div>
                <div className="form-floating mb-3">
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="password" className="form-label">Password *</label>
                </div>
                <div className="form-floating mb-3">
                    <input 
                        type="password" 
                        className="form-control" 
                        id="cpassword" 
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="cpassword" className="form-label">Confirm Password *</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="remeberme" />
                    <label className="form-check-label" for="remeberme">
                        I agree to the terms and conditions
                    </label>
                </div>
                <div className="text-center mt-3 mb-3">
                    <button className="btn btn-primary btn-wh w-100" onClick={handleSubmit}>Sign Up</button>

                    <p className="pt-3">Already have an account? Login here</p>
                </div>
            </form>
        </div>
    );
}