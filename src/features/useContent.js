import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../firebase-config";

export default function useContent(target) {
    const [content, setContent] = useState([]);
    useEffect(
        () =>
            onSnapshot(
                collection(db, target),
                (snapshot) => {
                    console.log(snapshot.docs);
                    const allContent = snapshot.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
                    setContent(allContent);
                },
                (error) => {
                    console.log(error);
                }
            ),
        []
    );

    return { content };
}
