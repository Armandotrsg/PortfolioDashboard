import AboutMe, { AboutMeProps }  from "@/components/AboutMe"

export default async function Personal() {
  const res = await fetch("http://localhost:3000/api/personal/about-me", {
    next: {
      revalidate: 10,
    }
  });
  const resJson = await res.json();

  console.log(resJson.data);
 
  return (
    <>
      <AboutMe {...{
        previousImageUrl: resJson.data.image,
        previousText: resJson.data.text
      }} />
    </>
  );
}
