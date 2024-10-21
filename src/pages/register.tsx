import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const navigate = useNavigate();

  return (
    <>
    <div className="loginpage">
      <div className="loginContainer">
        <p> Sign in </p>
        <input placeholder="Username"/>
        <input placeholder="Password" type="password"/>
        <input placeholder="Confirm Password" type="password"/>
        <input placeholder="E-mail"/>
        <button className="submit"> Sign in </button>
        <a className="submit" href="/"> Log in </a>
      </div>
    </div>
    </>
  );
};
