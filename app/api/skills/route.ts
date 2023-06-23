import { db } from "@/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export interface SkillsProps {
    name: string;
    img: string;
}

interface APIRequest extends Request {
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
        return new Response(JSON.stringify({
            success: true,
            message: `Skill created`,
        }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({
            success: false,
            message: `Failed to create skill`,
        }), {
            headers: { "Content-Type": "application/json" },
        });
    }
}