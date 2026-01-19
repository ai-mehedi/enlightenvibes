import { db } from "../lib/db";
import { testimonials } from "../lib/db/schema";

const dummyTestimonials = [
  {
    clientName: "Ahmed Rahman",
    clientRole: "CEO",
    clientCompany: "Tech Solutions BD",
    content: "Enlighten Vibes delivered exceptional work on our corporate website. Their attention to detail and creative approach exceeded our expectations. The team was professional and responsive throughout the project.",
    rating: 5,
    order: 1,
    active: true,
  },
  {
    clientName: "Sarah Khatun",
    clientRole: "Marketing Director",
    clientCompany: "Global Brands Ltd",
    content: "Working with Enlighten Vibes on our annual report was a fantastic experience. They brought our vision to life with stunning design and impeccable print quality. Highly recommended!",
    rating: 5,
    order: 2,
    active: true,
  },
  {
    clientName: "Mohammad Hossain",
    clientRole: "Event Manager",
    clientCompany: "Premier Events",
    content: "The video production team at Enlighten Vibes is simply outstanding. They captured our corporate event perfectly and delivered a promotional video that truly represents our brand.",
    rating: 5,
    order: 3,
    active: true,
  },
  {
    clientName: "Fatima Akter",
    clientRole: "Brand Manager",
    clientCompany: "Sunrise Industries",
    content: "From concept to execution, Enlighten Vibes handled our complete branding project with professionalism and creativity. The results have significantly elevated our market presence.",
    rating: 5,
    order: 4,
    active: true,
  },
  {
    clientName: "Karim Uddin",
    clientRole: "Operations Head",
    clientCompany: "Navy Headquarters",
    content: "The web portal developed by Enlighten Vibes has transformed how we communicate with our stakeholders. Their understanding of institutional requirements was impressive.",
    rating: 5,
    order: 5,
    active: true,
  },
  {
    clientName: "Nadia Islam",
    clientRole: "Creative Director",
    clientCompany: "Design Studio BD",
    content: "As a fellow creative professional, I appreciate the high standards Enlighten Vibes maintains. Their print work is always top-notch, and they never miss a deadline.",
    rating: 5,
    order: 6,
    active: true,
  },
];

async function seed() {
  console.log("Seeding testimonials...");

  for (const testimonial of dummyTestimonials) {
    await db.insert(testimonials).values(testimonial);
  }

  console.log(`Created ${dummyTestimonials.length} testimonials`);
}

seed().then(() => process.exit(0)).catch((err) => {
  console.error(err);
  process.exit(1);
});
