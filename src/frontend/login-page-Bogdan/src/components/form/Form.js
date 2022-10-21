import React, { useState } from "react";
import "./Form.css";

const Users = ({ usersData }) => {
  console.log(JSON.stringify(usersData));
  return (
    <ul>
      {usersData?.map(({ id, name, age }) => (
        <li key={id}>
          Name: {name}, Age: {age}
        </li>
      ))}
    </ul>
  );
};

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const auth = async (event) => {
    event.preventDefault();
    await fetch("http://localhost:3000/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        email,
        password,
      }),
    });
  };

  const getUsers = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/users?age=0&lessOrGreat=G",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status >= 400) {
        throw new Error("There was an issue");
      }
      const data = await response.json();
      console.log("data recieved", data);
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form
        method="POST"
        action="http://localhost:3000/authenticate"
        className="form"
      >
        <input
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          id="email"
          type="email"
          className="input"
        />
        <input
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          id="password"
          type="password"
          className="input"
        />
        <input className="btn" type="submit" onClick={auth} />
        {/* SIGN IN
      </button> */}
      </form>
      <section id="users">
        <button onClick={getUsers}>Get Users</button>
        Users:
        <br />
        <Users usersData={users} />
      </section>
    </>
  );
};

export default Form;
