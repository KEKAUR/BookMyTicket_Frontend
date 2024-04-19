import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Api_url } from '../../auth/auth';


function Login({ setIsAdmin }) {
    const [mode, toggleMode] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    // Function to handle login
    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <Container>
            <Content>
                <Header>
                    <h1>{mode ? 'Welcome back!' : 'Hey There!'}</h1>
                    <Switch>
                        <span>{mode ? "Don't" : 'Already'} have an account?</span>
                        <input type="checkbox" id="checkbox1" onClick={() => toggleMode(!mode)} />
                        <label htmlFor="checkbox1"></label>
                    </Switch>
                </Header>
                {!isLoggedIn && <LoginForm mode={mode} onLogin={handleLogin} setIsAdmin={setIsAdmin} toggleMode={toggleMode} />}
                {isLoggedIn && (
                    <UserDetailsContainer>
                        <UserDetails>
                            <h2>User Details</h2>
                            <p>Name: {userData.name}</p>
                            <p>Email: {userData.email}</p>
                        </UserDetails>
                    </UserDetailsContainer>
                )}
            </Content>
        </Container>
    );
}

function LoginForm({ mode, setIsAdmin, toggleMode }) {

    const [loginData, setloginData] = useState({
        email: "",
        password: "",
    });

    const [formData, setFormData] = useState({
        userName: "",
        phone: "",
        email: "",
        password: "",
        role: "CUSTOMER",
        payments: {},
        address: {
            country: "",
            state: "",
            city: "",
            addressLine: "",
            theatres: {},
            users: {}
        }
    });

    const [errors, setErrors] = useState({});

    const handleRegister = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            if (name === 'country' || name === 'state' || name === 'city' || name === 'addressLine') {
                return {
                    ...prevData,
                    address: {
                        ...prevData.address,
                        [name]: value,
                    },
                };
            } else {
                return {
                    ...prevData,
                    [name]: value,
                };
            }
        });
    };

    const handle_login = (e) => {
        const { name, value } = e.target;
        setloginData({
            ...loginData,
            [name]: value
        });
    };

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const errors = {};
        if (!loginData.email) errors.email = "Email is required.";
        if (!loginData.password) errors.password = "Password is required.";

        if (Object.keys(errors).length == 0) {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(loginData),
                redirect: "follow"
            };

            try {
                const response = await fetch(`${Api_url}users/login`, requestOptions);
                const result = await response.json();

                if (response.status === 401) {
                    toast(result.message);
                } else {
                    if (result.user.role === "ADMIN") {
                        setIsAdmin(true); // Update isAdmin state if the user is an admin
                        navigate("/admin");
                    } else {
                        setIsAdmin(false); // Update isAdmin state if the user is not an admin
                        navigate("/");
                        window.location.reload();
                    }
                    toast(result.message);
                    localStorage.setItem('role', result.user.role);
                    localStorage.setItem('userName', result.user.userName);
                    localStorage.setItem('user_id', result.user.userId);
                    localStorage.setItem('password', result.user.password);
                }
            } catch (error) {
                toast.error("Invalid email or password");
                console.error(error);
                toast.error(error);

            }
        } else {
            setErrors(errors);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic form validation
        if ( !formData.email || !formData.password || !formData.phone || !formData.email) {
            toast.error('All fields are required');
            return;
        }

        if (Object.keys(errors).length === 0) {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(formData),
                redirect: "follow"
            };

            try {
                const response = await fetch(`${Api_url}users/register`, requestOptions);
                const result = await response.json();
               
                toast.success("Welcome! Successfully created your account. Please login to continue");
                toggleMode(true);
                window.location.reload();

                if (response.status === 201) {
                } else {
                    toast.error(result || "An error occurred during registration");
                }
            } catch (error) {
                console.error(error);
                toast.error("User already exist with following details");
            }

        } else {
            setErrors(errors);
        }
    };


    return (

        <div>
            {/* LOGIN */}
            {mode && (
                <Form >
                    <>
                        <InputIcon>
                            <i className="fa fa-envelope" />
                            <Input type="email" name="email" value={loginData.email} onChange={handle_login} placeholder="Email" />
                        </InputIcon>
                        {errors.email && <Error>{errors.email}</Error>}

                        <InputIcon>
                            <i className="fa fa-key" />
                            <Input type="password" name="password" value={loginData.password} onChange={handle_login} placeholder="Password" />
                        </InputIcon>
                        {errors.password && <Error>{errors.password}</Error>}
                        <Button onClick={(e) => handleLogin(e)} type="submit">Log In</Button>
                    </>
                </Form>
            )}
            {/* REGISTER */}
            {!mode && (
                <Form onSubmit={handleSubmit}>
                    <InputIcon>
                        <i className="fa fa-envelope" />
                        <Input type="email" name="email" value={formData.email} onChange={handleRegister} placeholder="Email" />
                    </InputIcon>
                    <InputIcon>
                        <i className="fa fa-user" />
                        <Input type="text" name="userName" value={formData.userName} onChange={handleRegister} placeholder="Username" />
                    </InputIcon>
                    <InputIcon>
                        <i className="fa fa-phone" />
                        <Input type="tel" name="phone" value={formData.phone} onChange={handleRegister} placeholder="Phone" />
                    </InputIcon>
                    <InputIcon>
                        <i className="fa fa-key" />
                        <Input type="password" name="password" value={formData.password} onChange={handleRegister} placeholder="Password" />
                    </InputIcon>

                    {/* <InputIcon>
                        <i className="fa fa-globe" />
                        <Input
                            type="text"
                            name="country"
                            value={formData.address.country}
                            onChange={handleRegister}
                            placeholder="Country"
                            disabled={false} // Ensure it's not disabled
                            readOnly={false} // Ensure it's not read-only
                        />
                    </InputIcon>
                    <InputIcon>
                        <i className="fa fa-flag" />
                        <Input type="text" name="state" value={formData.address.state} onChange={handleRegister} placeholder="State" />
                    </InputIcon>
                    <InputIcon>
                        <i className="fa fa-globe" />
                        <Input type="text" name="city" value={formData.address.city} onChange={handleRegister} placeholder="City" />
                    </InputIcon>
                    <InputIcon>
                        <i className="fa fa-address-book" />
                        <Input type="text" name="addressLine" value={formData.address.addressLine} onChange={handleRegister} placeholder="Address Line" />
                    </InputIcon> */}
                    <Button onClick={(e) => handleRegister(e)} type="submit">{'Sign Up'}</Button>
                </Form>

            )}
        </div>
    );
}

const Error = styled.div`
    color: red;
    font-size: 12px;
    margin-top: 5px;
    margin-bottom: 5px
`;

const Container = styled.div`
    position: relative;
    margin-top: 60px;
    height: calc(100vh - 140px);
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("/images/login-bg.jpg");
    background-size: cover;
    background-repeat: no-repeat;
`;

const Content = styled.div`
    max-width: 500px;
    padding: 50px 40px;
    width: 80%;
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    overflow: hidden;

    @media (max-width: 900px) {
        width: 90%;
    }
`;

const Header = styled.header`
    margin-bottom: 20px;

    h1 {
        color: #fff;
        margin-bottom: 10px;
    }

    span {
        color: #fff;
        font-size: 14px;
    }
`;

const InputIcon = styled.div`
    position: relative;
    margin-bottom: 15px;
    display: flex;
    justify-content: center;

    i {
        position: absolute;
        top: 50%;
        left: 15px;
        transform: translateY(-50%);
        color: #999;
    }
`;

const Input = styled.input`
    width: calc(100% - 40px);
    padding: 12px 40px 12px 35px;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    color: #333;
    transition: border-color 0.3s;

    &:focus {
        outline: none;
        border-color: #1f80e0;
        box-shadow: 0 0 0 3px rgba(31, 128, 224, 0.2);
    }
`;

const Button = styled.button`
    width: 100%;
    padding: 15px;
    background-color: #1f80e0;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0483ee;
    }
`;

const Switch = styled.div`
    position: relative;

    label {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
        background-color: #f0f0f0;
        border-radius: 50px;
        width: 55px;
        height: 25px;
        cursor: pointer;
    }

    label:after {
        content: '';
        position: absolute;
        width: 23px;
        height: 23px;
        border-radius: 50%;
        background-color: #1f80e0;
        top: 1px;
        left: 1px;
        transition: transform 0.3s;
    }

    input[type='checkbox'] {
        display: none;
    }

    input[type='checkbox']:checked + label {
        background-color: #f0f0f0;
    }

    input[type='checkbox']:checked + label:after {
        transform: translateX(28px);
    }
`;

const Form = styled.form`
    margin-top: 30px;
`;

const UserDetailsContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 0.9);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const UserDetails = styled.div`
    h2 {
        margin-bottom: 10px;
        font-size: 18px;
    }

    p {
        margin: 5px 0;
        font-size: 16px;
    }
`;

export default Login;








