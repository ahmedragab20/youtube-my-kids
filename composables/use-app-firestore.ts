import { Firestore, addDoc, collection } from 'firebase/firestore';
import { IFirestoreUser } from 'types/firebase';

/**
 * Firestore composables to help with CRUD operations
 * returns { readCollection, readDocument, addCollection, updateCollection, deleteCollection, addUser }
 */
export const useAppFirestore = () => {
  const defaultDB = useFirestore();
  /**
   * @param collectionName
   * @param db (optional)
   * @returns Promise<void>
   * @description read collection
   */
  const readCollection = async (collectionName: string, db?: Firestore) => {
    if (!collectionName) {
      console.error('collectionName is required');
      return;
    }

    try {
      return useCollection(collection(db || defaultDB, collectionName));
    } catch (error) {
      console.error(error);
      throw createError({
        message: "Couldn't read collection",
        statusCode: 500,
      });
    }
  };
  /**
   * @param collectionName
   * @param payload
   * @param db (optional)
   * @returns  Promise<void>
   * @description add Document to collection
   */
  const addDocument = async (collectionName: string, payload: object, db?: Firestore) => {
    if (!collectionName || !payload) {
      console.error('collectionName && payload are required');
      return;
    }

    try {
      return await addDoc(collection(db || defaultDB, collectionName), payload);
    } catch (error) {
      console.error(error);
      throw createError({
        message: "Couldn't add document",
        statusCode: 500,
      });
    }
  };
  /**
   * @param user
   * @param db (optional)
   * @returns Promise<void>
   * @description add user to users collection in firestore
   */
  const addUser = async (user: IFirestoreUser, db?: Firestore) => {
    if (!user) {
      console.error('user is required');
      return;
    }

    // convert null values to empty strings
    Object.keys(user).forEach((key) => {
      // @ts-ignore
      if (user[key] === null) {
        // @ts-ignore
        user[key] = '';
      }
    });

    console.log('user', user);

    try {
      return await addDoc(collection(db || defaultDB, 'users'), user);
    } catch (error) {
      console.error(error);
      throw createError({
        message: "Couldn't add user",
        statusCode: 500,
      });
    }
  };

  return {
    readCollection,
    addDocument,
    addUser,
  };
};
