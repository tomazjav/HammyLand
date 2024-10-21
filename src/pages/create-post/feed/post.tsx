import { addDoc, collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Post as IPost } from "./feed";
import { auth, db } from "../../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
    post: IPost;
}

interface Like {
    likeId: string;
    userId: string;
}

export const Post = (props: Props) => {
    const {post} = props;
    const [user] = useAuthState(auth); 

    const [likes, setLikes] = useState<Like[] | null>(null);

    const likesRef = collection(db, "likes");
    const likesDoc = query(likesRef, where("postId", "==", post.id)); // get number of likes from postId we curently on
    
    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({userId: doc.data().userId, likeId: doc.id})));
    };

    const addLike = async () => {
        try {
            const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: post.id});
            if (user) {
            setLikes((prev) => prev ? [...prev, {userId: user.uid, likeId: newDoc.id}] : [{userId: user.uid, likeId: newDoc.id}]); // update like preview everytime like/dislike
            };
        } catch (err) {
            console.log(err);
        }
    };

    const removeLike = async () => {
        try {
            const likeToDeleteQuery = query(likesRef, where("postId", "==", post.id), where("userId", "==", user?.uid)) //query likes to delete
            const likeToDeleteData = await getDocs(likeToDeleteQuery) //get data from that like
            
            const likeId = likeToDeleteData.docs[0].id
            const likeToDelete = doc(db, "likes", likeId); // get id from like and put in inside doc

            await deleteDoc(likeToDelete);
            if (user) {
                setLikes((prev) => prev && prev.filter((like => like.likeId !== likeId)))};
        } catch (err) {
            console.log(err);
        }
    };

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid) //check likes for userId of a current user

    useEffect(() => {
        getLikes();
    }, []);
    
    return (
    <div>
        <div className="title"> 
            <h1 className="postTitle"> {post.title} </h1>
        </div>

        <div className="body"> 
            <p className="postDescription"> {post.description} </p>
        </div>

        <div className="footer"> 
            <p className="postDescription"> @{post.username} </p>
            <svg className="likebutton" onClick={hasUserLiked ? removeLike : addLike} fill={hasUserLiked ? "#ff0000" : "#f0f8ff"} width="25px" height="25px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000" stroke-width="0.00016"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z"></path> </g></svg>
            {likes && <span className="likeCount"> ({likes?.length})</span>}
        </div>
    </div>
    );
};