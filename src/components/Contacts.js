import React, { useState } from "react";
import db from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const Contacts = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const docRef = addDoc(collection(db, "contacts"), {
        name: data.name,
        email: data.email,
        message: data.message,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Contacts</h1>
      <label className="row" htmlFor="name">
        Name:
        <input
          type="text"
          placeholder="name"
          name="name"
          id="name"
          value={data.name}
          onChange={handleInputChange}
        />
      </label>

      <label className="row" htmlFor="email">
        Email:
        <input
          type="email"
          name="email"
          id="email"
          value={data.email}
          onChange={handleInputChange}
          placeholder="user@email.com"
        />
      </label>

      <label className="row" htmlFor="message">
        Message:
        <textarea
          type="text"
          name="message"
          id="message"
          value={data.message}
          onChange={handleInputChange}
          placeholder="I<3U"
        />
      </label>
      <button type="submit" className="btn btn-primary mt-2">
        Submit
      </button>
    </form>
  );
};

export default Contacts;
