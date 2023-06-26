import Skills from "@/components/Skills";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Skills Upload`,
    description: `Upload new Skills information.`,
  };
}

export default function SkillsUpload() {
  return <Skills />;
}