import MathPage from "./components/mathPage";

export const metadata = {
  title: "Brains & Brawns Science",
  description:
    "Empowering students in STEM fields with innovative learning in science",
  keywords: [
    "STEM learning",
    "after-school programs",
    "math courses",
    "coding for kids",
    "science workshops",
  ],
};
const homeCarouselBackup = [
  {
    heading: "Unlock",
    subheading: "Young Minds Today",
    imageUrl: "../assets/img/banner/slider-bg-1.jpg",
  },
  {
    heading: "Build",
    subheading: "Skills for Tomorrow",
    imageUrl: "./assets/img/banner/slider-bg-2.jpg",
  },
  {
    heading: "Shape",
    subheading: "a Brighter Future",
    imageUrl: "slider-bg-3.jpg",
  },
];

export default async function ScienceWrapper() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL}/carousels?pageName=maths`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error(`Failed with status ${res.status}`);

    const data = await res.json();

    if (!Array.isArray(data)) throw new Error("Invalid response format");

    return <MathPage carouselData={data} />;
  } catch (error) {
    console.error("Error fetching carousel, using fallback data:", error);
    return <MathPage carouselData={homeCarouselBackup} />;
  }
}
