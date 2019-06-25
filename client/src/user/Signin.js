import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Content from "../layouts/Content/Content";
import { signin, authenticate, isAuthenticated } from "../auth";
import './signin.css';

const Signin = () => {
    const [values, setValues] = useState({
        email: "customer@g.com",   //admin@g.com  
        password: "password1",
        error: "",
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        console.log("click")
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };

    const signInForm = () => (
        <div className="row signInF">
            <div className="col-md-2 col-sm-2"></div>
            <div className="col-md-4 col-sm-4">
                <div className="card signInC shadow-lg">
                    <div className="card-header signInH text-center">
                        <h3>Sign In</h3>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-paw"> Email</i></span>
                                </div>
                                <input
                                    onChange={handleChange("email")}
                                    type="email"
                                    className="form-control"
                                    value={email}
                                />
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-key"> Password</i></span>
                                </div>
                                <input
                                    onChange={handleChange("password")}
                                    type="password"
                                    className="form-control"
                                    value={password}
                                />
                            </div>
                            <div className="form-group">
                                <button onClick={clickSubmit} className="btn btn-primary login_btn">
                                    Submit
                                 </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-md-4 col-sm-4">
                <div className="card signInC shadow-lg">
                    <div className="card-header signInH text-center">
                        <h3>New Customer?</h3>
                    </div>
                    <div className="card-body">
                        <p className="card-text">If you are a new customer wishing to create an account click below!</p>
                        <a href="/signup" className="btn btn-primary login_btn"><i className="far fa-plus-square"></i> Create Account</a>
                    </div>
                </div>
            </div>
            <div className="col-md-2 col-sm-2"></div>
        </div>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        );


    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };


    return (
        <Content className="container col-md-8 offset-md-2">
            {showLoading()}
            {showError()}
            {signInForm()}
            {redirectUser()}
        </Content>
    );
};

export default Signin;