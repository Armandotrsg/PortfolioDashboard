import { storage } from "@/firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const storageRef = ref(storage, `pdf/Armando_Terrazas_Resume.pdf`);
    const url = await getDownloadURL(storageRef);
    return NextResponse.json({
      success: true,
      message: `Resume found`,
      data: url,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
