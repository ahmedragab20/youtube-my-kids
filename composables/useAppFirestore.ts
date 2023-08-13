import { User } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

export const useAppFirestore = () => {
  const defaultDB = useFirestore();

  const addUser = async (user: User | null) => {
    if (!user) return;

    try {
      return await addDoc(collection(defaultDB, 'users'), user);
    } catch (error) {
      console.error(error);
      throw createError({
        message: "Couldn't add user",
        statusCode: 500,
      });
    }
  };

  return {
    addUser,
  };
};
