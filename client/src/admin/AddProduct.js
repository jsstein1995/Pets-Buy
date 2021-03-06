//Import Package
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import Files/Components
import Content from "../layouts/Content/Content";
import { isAuthenticated } from "../auth/apiAuth";
import { createProduct, getCategories, getAnimals} from "./apiAdmin";

//Component for admin user to add new products to database 
const AddProduct = () => {

    // Status Hooks
    const [values, setValues] = useState({
        name: "",
        description: "",
        image: "",
        price: "",
        categories: [],
        animal: [],
        category: "",
        quantity: "",
        loading: false,
        error: "",
        createdProduct: "",
        redirectToProfile: false,
        formData: ""
    });

    const { user, token } = isAuthenticated();

    const {
        name,
        description,
        image,
        price,
        animal,
        categories,
        category,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    // Imports all categories from database to insert into form drop down
    const init = () => {
       getCategories()
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({
                        ...values,
                        categories: data,
                        formData: new FormData()
                    });
                }
        });
    };

    const initAn = () => {
        getAnimals()
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({
                        ...values,
                        categories: data,
                        formData: new FormData()
                    });
                }
        });
    };

   //Mount Hook
    useEffect(() => {
        init();
    }, []);
    const handleChange = name => event => {
        const value = event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });

        createProduct(user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    console.log(formData);
                    console.log(user._id);
                    console.log(token);
                    console.log(data);
                    setValues({
                        ...values,
                        name: "",
                        description: "",
                        image: "",
                        price: "",
                        quantity: "",
                        loading: false,
                        createdProduct: data.name
                    });
                }
            });
    };

    const newProductForm = () => (
        <form className="mb-3 mt-5" onSubmit={clickSubmit}>

            <div className="form-group">
                <label className="text-muted">Product Name</label>
                <input
                    onChange={handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Image</label>
                <textarea
                    onChange={handleChange("image")}
                    className="form-control"
                    value={image}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea
                    onChange={handleChange("description")}
                    className="form-control"
                    value={description}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input
                    onChange={handleChange("price")}
                    type="number"
                    className="form-control"
                    value={price}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Animal</label>
                <select
                    onChange={handleChange("animal")}
                    className="form-control"
                >
                    <option>Please select ...</option>
                    <option value="5d2186e860c170bf8de79881">Cat</option>
                    <option value="5d2186fd60c170bf8de79896">Dog</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select
                    onChange={handleChange("category")}
                    className="form-control"
                >
                    <option>Please select ...</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input
                    onChange={handleChange("quantity")}
                    type="number"
                    className="form-control"
                    value={quantity}
                />
            </div>

            <button className="btn btn-outline-primary login_btn">Submit</button>
        </form>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showSuccess = () => (
        <div
            className="alert alert-info"
            style={{ display: createdProduct ? "" : "none" }}
        >
            <h2>{`${createdProduct}`} is created!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-primary">
                Back to Dashboard
            </Link>
        </div>
    );

    return (
        <Content>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    <h3 className="mt-5">Add New Product</h3>
                    {newProductForm()}
                    {goBack()}
                </div>
            </div>
        </Content>
    );
};

export default AddProduct;
