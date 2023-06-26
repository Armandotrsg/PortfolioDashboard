import { db } from "@/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  const docRef = doc(db, "about-me", "about-me");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    // return new Response(
    //   JSON.stringify({
    //     success: true,
    //     message: `About me found`,
    //     data: docSnap.data(),
    //   }),
    //   {
    //     headers: { "Content-Type": "application/json" },
    //   }
    // );
    return NextResponse.json({
      success: true,
      message: `About me found`,
      data: docSnap.data(),
    })
  } else {
    // return new Response(
    //   JSON.stringify({
    //     success: false,
    //     message: `About me not found`,
    //   }),
    //   {
    //     headers: { "Content-Type": "application/json" },
    //   }
    // );
    return NextResponse.json({
      success: false,
      message: `About me not found`,
    })
  }
}

export async function PUT(request: Request) {
  const body = await request.json();
  const docRef = doc(db, "about-me", "about-me");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    await updateDoc(docRef, body);
    // return new Response(
    //   JSON.stringify({
    //     success: true,
    //     message: `About me updated`,
    //     data: body,
    //   }),
    //   {
    //     headers: { "Content-Type": "application/json" },
    //   }
    // );
    return NextResponse.json({
      success: true,
      message: `About me updated`,
      data: body,
    })
  } else {
    // return new Response(
    //   JSON.stringify({
    //     success: false,
    //     message: `About me not found`,
    //   }),
    //   {
    //     headers: { "Content-Type": "application/json" },
    //   }
    // );
    return NextResponse.json({
      success: false,
      message: `About me not found`,
    })
  }
}
