import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface CreateFormData {
    title: string;
    description: string;
};

export const CreateForm = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    
    const schema: any = yup.object().shape({
        title: yup.string().required("Title required!"),
        description: yup.string().required("Description required!"),
    });

    const {register, handleSubmit, formState: {errors}} = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    });

    const postsRef = collection(db, "posts"); // define DB and table (collection)

    const onCreatePost = async (data: CreateFormData) => {
        await addDoc(postsRef, {
            // instead of declaring title and description by its own, we can just call ...data and grab both properties
            // title: data.title,
            // description: data.description,
            ...data,
            username: user?.displayName,
            userId: user?.uid,
        });

        navigate("/feed");
    };

    return (
        <>
        <form onSubmit={handleSubmit(onCreatePost)}>
            <input placeholder="Title" {...register("title")}/>
            <p style={{color: "#fc2626", fontSize: "25px"}}> {errors.title?.message}</p>
            <textarea placeholder="Description" {...register("description")}/>
            <p style={{color: "#fc2626", fontSize: "25px"}}> {errors.description?.message}</p>
            <input type="submit" className="submit" />
        </form>
        </>
    );
};
