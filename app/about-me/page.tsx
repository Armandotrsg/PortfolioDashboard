import AboutMe from "@/components/AboutMe"
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `About Me Upload`,
    description: `Upload new About Me information.`,
  };
}

export default async function Personal() {
  const res = await fetch("http://localhost:3000/api/personal/about-me", {
    next: {
      revalidate: 0,
    }
  });
  const resJson = await res.json();
 
  return (
    <>
      <AboutMe {...{
        previousImageUrl: resJson.data.image,
        previousText: resJson.data.text
      }} />
    </>
  );
}
