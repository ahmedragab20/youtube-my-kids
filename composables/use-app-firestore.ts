import { Firestore, addDoc, collection, doc, getDocs, query, where } from 'firebase/firestore';
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
   * @param docId
   * @param db (optional)
   * @returns Promise<void>
   * @description read document by id
   */
  const readDocument = async (collectionName: string, docId: string, db?: Firestore) => {
    if (!collectionName || !docId) {
      console.error('collectionName && docId are required');
      return;
    }

    try {
      return useDocument(doc(db || defaultDB, collectionName, docId));
    } catch (error) {
      console.error(error);
      throw createError({
        message: "Couldn't read document",
        statusCode: 500,
      });
    }
  };
  /**
   * @param collectionName
   * @param payload
   * @param db (optional)
   * @returns Promise<void>
   * @description query document by key and value
   */
  const queryDocument = async (
    collectionName: string,
    payload: { key: string; value: string },
    db?: Firestore
  ) => {
    if (!collectionName || !payload) {
      console.error('collectionName && payload [key, value] are required');
      return;
    }

    try {
      const q = query(
        collection(db || defaultDB, collectionName),
        where(payload.key, '==', payload.value)
      );
      const querySnapshot = await getDocs(q);
      const doc = querySnapshot.docs[0];
      return doc;
    } catch (error) {
      console.error(error);
      throw createError({
        message: "Couldn't read document",
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

    // if user already exists, stop execution
    const userExists = await queryDocument('users', {
      key: 'uid',
      value: user.uid,
    });

    console.log({ userExists });

    if (userExists) {
      console.warn('user already exists');
      return;
    }

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
    readDocument,
    queryDocument,
    addDocument,
    addUser,
  };
};
