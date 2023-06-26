import { storage } from "@/firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";

export async function GET() {
  const storageRef = ref(storage, `pdf/Armando_Terrazas_Resume.pdf`);
  const url = await getDownloadURL(storageRef);
  return new Response(
    JSON.stringify({
      success: true,
      message: `CV found`,
      data: url,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
