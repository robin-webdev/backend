import React, { useState } from "react";
import "../styles/register.scss";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(f);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // submit logic here (e.g., formData upload)
    const data = new FormData();
    data.append("name", form.name);
    data.append("username", form.username);
    data.append("email", form.email);
    data.append("password", form.password);
    if (file) data.append("profileImage", file);
    console.log("Submitting:", { form, file });
  };

  return (
    <div className="register-page">
      <div className="card">
        <header>
          <h1>Create Account</h1>
          <p className="subtitle">Join the community — share your moments</p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="register-form"
          autoComplete="off"
        >
          <div className="avatar-row">
            <div className="avatar-preview" aria-hidden={!preview}>
              {preview ? (
                <img src={preview} alt="Profile preview" />
              ) : (
                <div className="avatar-placeholder">+</div>
              )}
            </div>
            <label className="file-label">
              <input type="file" accept="image/*" onChange={handleFile} />
              Upload Profile Image
            </label>
          </div>

          <div className="row">
            <label>
              <span>Name</span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Full name"
                type="text"
              />
            </label>

            <label>
              <span>Username</span>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                placeholder="username"
                type="text"
              />
            </label>
          </div>

          <label>
            <span>Email</span>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@domain.com"
              type="email"
            />
          </label>

          <label>
            <span>Password</span>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Create a secure password"
              type="password"
            />
          </label>

          <button type="submit" className="btn-primary">
            Sign up
          </button>

          <p className="tos">
            By signing up you agree to the Terms of Service and Privacy Policy.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
