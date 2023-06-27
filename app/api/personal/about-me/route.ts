import { db } from "@/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NextResponse, NextRequest } from "next/server";

interface APIRequest extends NextRequest {
  json(): Promise<{text: string; image: string}>;
}

export async function GET() {
  const docRef = doc(db, "about-me", "about-me");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return NextResponse.json({
      success: true,
      message: `About me found`,
      data: docSnap.data(),
    })
  } else {
    return NextResponse.json({
      success: false,
      message: `About me not found`,
    })
  }
}

export async function PUT(request: APIRequest) {
  const body = await request.json();
  const docRef = doc(db, "about-me", "about-me");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    await updateDoc(docRef, body);
    return NextResponse.json({
      success: true,
      message: `About me updated`,
      data: body,
    })
  } else {
    return NextResponse.json({
      success: false,
      message: `About me not found`,
    })
  }
}
