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
  url?: string;
  dates: Dates;
}

interface APIRequest extends Request {
    json(): Promise<ProjectProps>;
}

export async function POST(req: APIRequest,  {params}: {params: { projects: "projects" | "social-service" | "awards" }}) {
  const path = params.projects as string;
  try {  
    const props = await req.json();
    const name = props.name
      .replace(/[^a-zA-Z0-9]/g, "-")
      .toLowerCase();
    await setDoc(doc(db, path, name), props);
    console.log(`${path[0].toUpperCase() + path.slice(1).replace("-", " ")} created`, props);
    return new Response(JSON.stringify({
        success: true,
        message: `${path[0].toUpperCase() + path.slice(1).replace("-", " ")} created`,
    }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({
        success: false,
        message: `Failed to create ${path.replace("-", " ")}`,
    }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
