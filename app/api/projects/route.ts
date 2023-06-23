import { db } from "@/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

interface Dates {
    start: string;
    end: string | undefined;
}

export interface ProjectProps {
  name: string;
  description: string;
  image: string;
  url: string;
  dates: Dates;
}

interface APIRequest extends Request {
    json(): Promise<ProjectProps>;
}

export async function POST(req: APIRequest) {
  try {
    const params = await req.json();
    if (!params.name) {
      throw new Error("Missing project name");
    }
    const name = params.name
      .replace(/[^a-zA-Z0-9]/g, "-")
      .toLowerCase();
    await setDoc(doc(db, "projects", name), params);
    return new Response(JSON.stringify(params), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal server error", { status: 500 });
  }
}
