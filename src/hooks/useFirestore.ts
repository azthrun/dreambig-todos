import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore/lite";

import { db } from "../firebase";
import TodoItem from "../models/TodoItem";

const useFirestore = () => {
    const todoCollectionRef = collection(db, 'todos');

    const getTodoItems = async () : Promise<TodoItem[]> => {
        return await getDocs(todoCollectionRef)
            .then((snapshot) => {
                let items : TodoItem[] = [];
                snapshot.docs.forEach((doc) => {
                    const data = doc.data();
                    items.push({ 
                        id: doc.id,
                        notes: data.notes,
                        modifiedDate: new Date(data.modifiedDate.seconds * 1000),
                        isComplete: data.isComplete,
                    });
                });
                return items;
            });
    }

    const addNewTodoItem = async (item : TodoItem) : Promise<void> => {
        await addDoc(todoCollectionRef, item);
    }

    const updateTodoItem = async (item : TodoItem) : Promise<void> => {
        const docRef = doc(db, 'todos', item.id);
        await updateDoc(docRef, { ...item });
    }

    const deleteTodoItem = async (item : TodoItem) : Promise<void> => {
        const docRef = doc(db, 'todos', item.id);
        await deleteDoc(docRef);
    }

    const isUserAuthorized = async (email : string | null) : Promise<boolean> => {
        if (email === null) return false;
        
        const docRef = doc(db, 'users', email);
        const snapshot = await getDoc(docRef);
        return snapshot.exists();
    }

    return { getTodoItems, addNewTodoItem, updateTodoItem, deleteTodoItem, isUserAuthorized };
}

export default useFirestore;