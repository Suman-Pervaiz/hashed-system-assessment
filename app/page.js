// import Navbar from '@/app/components/layout/Navbar'
// import HeroSection from '@/app/components/layout/HeroSection'
// import VenueCategories from '@/app/components/home/VenueCategories'
// import FeaturedVenues from '@/app/components/home/FeaturedVenues'
// import VendorsSection from '@/app/components/home/VendorsSection'
// import StatsAndMore from '@/app/components/home/StatsAndMore'
// import Footer from '@/app/components/layout/Footer'
import Navbar from "@/app/components/layout/Navbar";
import HeroSection from "@/app/components/layout/HeroSection";
import VenueCategories from "@/app/components/home/VenueCategories";
import FeaturedVenues from "@/app/components/home/FeaturedVenues";
import VendorsSection from "@/app/components/home/VendorsSection";
import StatsAndMore from "@/app/components/home/StatsAndMore";
import Footer from "@/app/components/layout/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <div className="relative">
        <Navbar />
        <HeroSection />
      </div>
      <VenueCategories />
      <FeaturedVenues />
      <VendorsSection />
      <StatsAndMore />
      <Footer />
    </main>
  )
}