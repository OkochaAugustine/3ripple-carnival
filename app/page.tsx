import fs from "fs";
import path from "path";
import { Navbar } from "@/components/carnival/Navbar";
import { Hero } from "@/components/carnival/Hero";
import { WelcomeVideo } from "@/components/carnival/WelcomeVideo";

function getCarnivalImages() {
  const imagesDirectory = path.join(process.cwd(), "public", "images");

  if (!fs.existsSync(imagesDirectory)) {
    return [];
  }

  const files = fs.readdirSync(imagesDirectory);

  const supportedImages = /\.(jpg|jpeg|png|webp|avif)$/i;

  return files
    .filter((file) => supportedImages.test(file))
    .sort((a, b) => {
      if (a.toLowerCase() === "canival.png") return -1;
      if (b.toLowerCase() === "canival.png") return 1;
      return a.localeCompare(b);
    })
    .map((file) => `/images/${file}`);
}

export default function HomePage() {
  const images = getCarnivalImages();

  return (
    <main>
      <Navbar />
      <Hero images={images} />
      <WelcomeVideo />
    </main>
  );
}