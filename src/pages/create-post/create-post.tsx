import { Link } from "react-router-dom";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { CreateForm } from "./create-form";

export const CreatePost = () => {
  const [user] = useAuthState(auth);

  return (
    <div>
      <div className="feed">
          <div className="postContainer">
          <h1> Create post </h1>
          {!user ? (
          <Link to="/" />
          ) : (
          <CreateForm />
          )}
          </div>
      </div>
    </div>
  );
};
