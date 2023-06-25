import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export async function GET() {
  const docRef = doc(db, "about-me", "about-me");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return new Response(
      JSON.stringify({
        success: true,
        message: `About me found`,
        data: docSnap.data(),
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } else {
    return new Response(
      JSON.stringify({
        success: false,
        message: `About me not found`,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
