import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

async function uploadFile(file) {
  console.log(file);
  const storageRef = ref(storage, "child");
  uploadBytes(storageRef, file).then((snapshot) => {
    image = getDownloadURL(snapshot.ref);
    return image;
  });
}
