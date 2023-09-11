import { IFirestoreUser } from '@/types/firebase';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { updateCurrentUserProfile } from 'vuefire';

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
   * @param new document data
   * @param collectionName
   * @param db (optional)
   * @returns Promise<void>
   * @description updates document in firestore
   */
  const updateDocument = async (
    collectionName: string,
    docId: string,
    payload: object,
    db?: Firestore
  ) => {
    if (!collectionName || !docId || !payload) {
      console.error('collectionName && docId && payload are required');
      return;
    }

    try {
      const docRef = doc(db || defaultDB, collectionName, docId);
      await updateDoc(docRef, payload);
    } catch (error) {
      console.error(error);
      throw createError({
        message: "Couldn't update document",
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
  /**
   * @param new user data
   * @param db (optional)
   * @returns Promise<void>
   * @description update user in firebase auth and firestore
   */
  const updateUser = async (user: Partial<IFirestoreUser>, db?: Firestore) => {
    if (!user) {
      console.error('user is required');
      return;
    }

    try {
      const currentUser = useCurrentUser();

      const userDoc = await queryDocument('users', {
        key: 'uid',
        value: currentUser.value!.uid,
      });

      // update user in firebase auth
      await updateCurrentUserProfile(user);
      // update user in firestore
      await updateDocument('users', userDoc?.id!, user);
    } catch (error) {
      console.error(error);
      throw createError({
        message: "Couldn't update user",
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
    updateUser,
  };
};
