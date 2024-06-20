import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();

export const uploadImageToStorage = async (file: File, userId: string) => {
  // Include the userId in the file path to organize uploads by user
  const storageRef = ref(storage, `alakave/${userId}/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};
