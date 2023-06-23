import UploadImage from "@/components/UploadImage";
import { UploadImageProps } from "@/components/UploadImage";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { projects: "projects" | "social-service" | "awards" };
}): Promise<Metadata> {
  return {
    title: `${params.projects[0].toUpperCase()}${params.projects.slice(1)} Upload`,
    description: `Upload a new ${params.projects}.}`,
  };
}

export default function Projects({
  params,
}: {
  params: { projects: "projects" | "social-service" | "awards" };
}) {
  const props: UploadImageProps = {
    path: params.projects,
    isUrlRequired: params.projects === "projects",
  };
  return <UploadImage {...props} />;
}
