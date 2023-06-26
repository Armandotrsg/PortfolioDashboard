import AboutMe from "@/components/AboutMe";
import Resume from "@/components/Resume";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `About Me Upload`,
    description: `Upload new About Me information.`,
  };
}

async function getAboutMe() {
  const res = await fetch("http://localhost:3000/api/personal/about-me", {
    next: {
      revalidate: 0,
    },
  });
  return res.json();
}

async function getResume() {
  const prevPdfRes = await fetch("http://localhost:3000/api/personal/resume", {
    next: {
      revalidate: 0,
    },
  });
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
