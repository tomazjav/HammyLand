import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const Home = () => {
  const [user] = useAuthState(auth);

  return (
    <div>
      {!user ? (
      <Link to="/" />
      ) : (
      <>
      <h1> Welcome to Hammy Land! </h1>
      <img src="welcome.gif" alt="welcome" className="welcome" />
      </>
      )}
    </div>
  );
};
