import { Link } from "react-router-dom";
import { auth, db } from "../../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Post } from "./post";


export interface Post {
    id: string;
    userId: string;
    title: string;
    username: string;
    description: string;
}

export const Feed = () => {
  const [user] = useAuthState(auth);

  const [postsList, setPostsList] = useState<Post[] | null>(null);
  const postsRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Post[]);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="feed">
        {postsList?.map((post) => (
          <div className="postContainer">
            <Post post={post} />
          </div>
        ))}
    </div>
  );
};

