import { initializeApp } from "firebase/app";
import {getDownloadURL, getStorage,ref,uploadBytes} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCmMBFTkuOCtQW_NFhQtKYNIEsNdQUE1y4",
  authDomain: "imagenesapp-8be38.firebaseapp.com",
  projectId: "imagenesapp-8be38",
  storageBucket: "imagenesapp-8be38.appspot.com",
  messagingSenderId: "359913781361",
  appId: "1:359913781361:web:8356c737fe14696db5c3d0"
};

// Initialize Firebase
const MAX_RETRIES = 5; // Número máximo de intentos
const RETRY_DELAY_MS = 2000; // Retraso en milisegundos entre intentos

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

 export function subirArchivo(file,nombre){
   const referencia= ref(storage,nombre)
   uploadBytes(referencia,file)
}

export async function conseguirArchivo(nombre, retries = 0){
  const referencia = ref(storage, nombre);

  try {
    const url = await getDownloadURL(referencia);
    return url;
  } catch (error) {
    if (error.code === 'storage/object-not-found' && retries < MAX_RETRIES) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
      console.log(`Reintentando (${retries + 1}/${MAX_RETRIES})...`);
      return conseguirArchivo(nombre, retries + 1);
    } else {
      console.error('Error al obtener el archivo:', error);
      throw error; // Re-lanzar el error para manejarlo en el componente
    }
  }
 }
