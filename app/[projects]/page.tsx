import UploadImage from "@/components/UploadImage";
import { UploadImageProps } from "@/components/UploadImage";

export default function Projects({
  params,
}: {
  params: { projects: "projects" | "social-service" | "awards" };
}) {
  const props: UploadImageProps = {
    path: params.projects,
    isUrlRequired: params.projects === "projects",
  }
  return <UploadImage {...props} />;
}
