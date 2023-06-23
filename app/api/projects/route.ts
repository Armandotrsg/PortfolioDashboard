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
    console.log("Project created", params);
    return new Response(JSON.stringify({
        success: true,
        message: "Project created",
    }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({
        success: false,
        message: "Failed to create project",
    }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
