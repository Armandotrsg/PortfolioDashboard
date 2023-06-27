import { db } from "@/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { NextResponse, NextRequest } from "next/server";

export interface SkillsProps {
    name: string;
    img: string;
}

interface APIRequest extends NextRequest {
    json(): Promise<SkillsProps>;
}

export async function POST(req: APIRequest) {
    try {
        const props = await req.json();
        const name = props.name
            .replace(/[^a-zA-Z0-9]/g, "-")
            .toLowerCase();
        await setDoc(doc(db, "skills", name), props);
        console.log(`Skill created`, props);
        return NextResponse.json({
            success: true,
            message: `Skill created`,
        })
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}