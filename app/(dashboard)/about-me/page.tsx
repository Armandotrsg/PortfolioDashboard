import AboutMe from "@/components/AboutMe";
import Resume from "@/components/Resume";
import { Metadata } from "next";
import { ApiRoute } from "@/utils/ApiRoute";

export const revalidate = 20;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `About Me Upload`,
    description: `Upload new About Me information.`,
  };
}

async function getAboutMe() {
  const res = await fetch(`${ApiRoute()}/api/personal/about-me`);
  return res.json();
}

async function getResume() {
  const prevPdfRes = await fetch(`${ApiRoute()}/api/personal/resume`);
  return prevPdfRes.json();
}

export default async function Personal() {
  const aboutmeData = getAboutMe();
  const resumeData = getResume();
  const [aboutme, resume] = await Promise.all([aboutmeData, resumeData]);
  return (
    <>
      <AboutMe
        {...{
          previousImageUrl: aboutme.data.image,
          previousText: aboutme.data.text,
        }}
      />
      <Resume
        {...{
          prevResume: resume.data,
        }}
      />
    </>
  );
}
