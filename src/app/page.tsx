import HomePage from "@/components/Homepage";

export const metadata = {
  title: "Brains & Brawns",
  description: "Empowering students in STEM fields with innovative learning",
  keywords: [
    "STEM learning",
    "after-school programs",
    "math courses",
    "coding for kids",
    "science workshops",
  ],
};
export const homeCarouselBackup = [
  {
    heading: "Unlock",
    subheading: "Young Minds Today",
    imageUrl: "slider-bg-1",
  },
  {
    heading: "Build",
    subheading: "Skills for Tomorrow",
    imageUrl: "slider-bg-2",
  },
  {
    heading: "Shape",
    subheading: "a Brighter Future",
    imageUrl: "slider-bg-3",
  },
];

export default async function HomePageWrapper() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL}/carousels?pageName=home`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error(`Failed with status ${res.status}`);

    const data = await res.json();

    if (!Array.isArray(data)) throw new Error("Invalid response format");

    return <HomePage carouselData={data} />;
  } catch (error) {
    console.error("Error fetching carousel, using fallback data:", error);
    return <HomePage carouselData={homeCarouselBackup} />;
  }
}
// openGraph: {
//   title: "Brains & Brawns",
//   description: "Empowering students in STEM fields with innovative learning",
//   url: "https://yourdomain.com",
//   type: "website",
//   images: [
//     {
//       url: "https://yourdomain.com/og-banner.jpg", // Update with actual image
//       width: 1200,
//       height: 630,
//       alt: "Brains & Brawns Banner",
//     },
//   ],
// },
// twitter: {
//   card: "summary_large_image",
//   title: "Brains & Brawns",
//   description: "Empowering students in STEM fields with innovative learning",
//   images: ["https://yourdomain.com/og-banner.jpg"],
// },
