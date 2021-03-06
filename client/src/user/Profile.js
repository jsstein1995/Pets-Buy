// Import React Packages
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

// Import Files/Components
import Content from "../layouts/Content/Content";
import { isAuthenticated } from "../auth/apiAuth";
import { read, update, updateUser } from "./apiUser";


const Profile = ({ match }) => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: false,
        success: false
    });

    const { token } = isAuthenticated();
    const { name, email, password, error, success } = values;

    const init = userId => {
        read(userId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, name: data.name, email: data.email });
            }
        });
    };

    useEffect(() => {
        init(match.params.userId);
    }, []);

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        update(match.params.userId, token, { name, email, password })
            .then(
                data => {
                    if (data.error) {
                        console.log(data.error);
                    } else {
                        updateUser(data, () => {
                            setValues({
                                ...values,
                                name: data.name,
                                email: data.email,
                                success: true
                            });
                        });
                    }
                }
            );
    };

    const redirectUser = success => {
        if (success) {
            return <Redirect to="/cart" />;
        }
    };

    const profileUpdate = (name, email, password) => (
        <form>
            <div className="form-group mt-5">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    onChange={handleChange("name")}
                    className="form-control"
                    value={name}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    type="email"
                    onChange={handleChange("email")}
                    className="form-control"
                    value={email}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    type="password"
                    onChange={handleChange("password")}
                    className="form-control"
                    value={password}
                />
            </div>

            <button onClick={clickSubmit} className="btn btn-primary login_btn">
                Submit
            </button>
        </form>
    );

    return (
        <Content className="container-fluid">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h3 className="mt-5">Profile update</h3>
                    {profileUpdate(name, email, password)}
                    {redirectUser(success)}
                </div>
            </div>
        </Content>
    );
};

export default Profile;
