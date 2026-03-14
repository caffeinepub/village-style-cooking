import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Clock, Leaf, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useGetMenuItems } from "./hooks/useQueries";

const queryClient = new QueryClient();

const FOOD_IMAGE_MAP: Record<string, string> = {
  "Bamboo Chicken": "/assets/generated/bamboo-chicken.dim_400x300.jpg",
  "Bamboo Prawns": "/assets/generated/bamboo-prawns.dim_400x300.jpg",
  "Pot Chicken": "/assets/generated/pot-chicken.dim_400x300.jpg",
  "Poy Thiryani": "/assets/generated/poy-thiryani.dim_400x300.jpg",
  "Bamboo Biryani": "/assets/generated/bamboo-biryani.dim_400x300.jpg",
};

const CATEGORY_LABELS: Record<string, string> = {
  bamboo: "Bamboo Special",
  clay: "Clay Pot",
  rice: "Village Rice",
  chicken: "Chicken",
  seafood: "Seafood",
};

const FALLBACK_ITEMS = [
  {
    id: BigInt(1),
    name: "Bamboo Chicken",
    description:
      "Tender chicken marinated in aromatic village spices, slow-cooked inside fresh bamboo for a truly authentic smoky flavor.",
    category: "bamboo",
    price: 380,
  },
  {
    id: BigInt(2),
    name: "Bamboo Prawns",
    description:
      "Juicy tiger prawns infused with coastal spices, steamed to perfection inside fresh green bamboo tubes with coconut and curry leaves.",
    category: "bamboo",
    price: 480,
  },
  {
    id: BigInt(3),
    name: "Pot Chicken",
    description:
      "Village-style chicken curry slow-simmered in traditional earthen clay pots, capturing the deep earthy richness of countryside cooking.",
    category: "clay",
    price: 350,
  },
  {
    id: BigInt(4),
    name: "Poy Thiryani",
    description:
      "Fragrant biryani served in a hand-stitched leaf bowl (poy), layered with saffron rice, tender chicken, and whole village spices.",
    category: "rice",
    price: 320,
  },
  {
    id: BigInt(5),
    name: "Bamboo Biryani",
    description:
      "Aromatic basmati rice and succulent chicken slow-cooked sealed inside bamboo, unlocked at your table for a dramatic smoky reveal.",
    category: "bamboo",
    price: 420,
  },
];

const SKELETON_KEYS = ["sk1", "sk2", "sk3", "sk4", "sk5"];

const FEATURES = [
  {
    id: "bamboo",
    icon: "🎋",
    title: "Bamboo Cooking",
    desc: "Food sealed and cooked inside fresh bamboo, imparting a unique earthy aroma.",
  },
  {
    id: "clay",
    icon: "🏺",
    title: "Clay Pot Tradition",
    desc: "Slow-simmered in traditional terracotta pots for deep, rustic flavors.",
  },
  {
    id: "spices",
    icon: "🌿",
    title: "Farm Fresh Spices",
    desc: "Hand-picked spices from local village farms used in every recipe.",
  },
];

const CONTACT_INFO = [
  {
    id: "address",
    icon: <MapPin className="w-5 h-5" />,
    label: "Address",
    value: "Village Road, Near Bamboo Grove, Tamil Nadu",
  },
  {
    id: "phone",
    icon: <Phone className="w-5 h-5" />,
    label: "Phone",
    value: "+91 98765 43210",
  },
  {
    id: "hours",
    icon: <Clock className="w-5 h-5" />,
    label: "Hours",
    value: "Daily: 11 AM – 10 PM",
  },
];

function MenuCard({
  item,
  index,
}: { item: (typeof FALLBACK_ITEMS)[0]; index: number }) {
  const imageSrc = FOOD_IMAGE_MAP[item.name];
  const ocid = `menu.item.${index + 1}`;

  return (
    <motion.article
      data-ocid={ocid}
      className="card-hover bg-card rounded-2xl overflow-hidden shadow-village border border-border flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
    >
      <div className="relative overflow-hidden h-56">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <Leaf className="w-12 h-12 text-primary opacity-40" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge className="bg-primary text-primary-foreground text-xs font-body font-medium px-2 py-0.5 shadow-sm">
            {CATEGORY_LABELS[item.category] ?? item.category}
          </Badge>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display text-xl font-semibold text-foreground mb-1.5">
          {item.name}
        </h3>
        <p className="text-sm text-muted-foreground font-body leading-relaxed flex-1">
          {item.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-2xl font-bold text-accent">
            ₹{item.price}
          </span>
          <span className="text-xs text-muted-foreground font-body">
            Per serving
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function MenuSection() {
  const { data, isLoading, isError } = useGetMenuItems();

  const items = data && data.length > 0 ? data : FALLBACK_ITEMS;

  return (
    <section id="menu" className="py-20 leaf-gradient bamboo-texture">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm uppercase tracking-widest font-body font-semibold text-primary mb-2">
            Our Specialities
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Village Kitchen <em className="italic text-accent">Signature</em>{" "}
            Menu
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto text-base leading-relaxed">
            Each dish is crafted with age-old recipes passed down through
            generations, cooked with bamboo, clay, and love.
          </p>
          <div className="mt-5 flex justify-center gap-2">
            <span className="inline-block w-12 h-0.5 bg-primary rounded-full" />
            <span className="inline-block w-3 h-0.5 bg-accent rounded-full" />
            <span className="inline-block w-3 h-0.5 bg-secondary rounded-full" />
          </div>
        </motion.div>

        {isLoading && (
          <div
            data-ocid="menu.loading_state"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {SKELETON_KEYS.map((k) => (
              <div
                key={k}
                className="rounded-2xl overflow-hidden bg-card border border-border"
              >
                <Skeleton className="h-56 w-full" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-8 w-1/3 mt-2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div data-ocid="menu.error_state" className="text-center py-16">
            <p className="text-destructive font-body">
              Unable to load menu. Please try again later.
            </p>
          </div>
        )}

        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {items.map((item, i) => (
              <MenuCard key={Number(item.id)} item={item} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border shadow-xs">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a
          href="#home"
          data-ocid="nav.link"
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Leaf className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            Village Style Cooking
          </span>
        </a>
        <div className="hidden md:flex items-center gap-7">
          <a
            href="#menu"
            data-ocid="nav.menu.link"
            className="text-sm font-body font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Menu
          </a>
          <a
            href="#about"
            data-ocid="nav.about.link"
            className="text-sm font-body font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            About
          </a>
          <a
            href="#contact"
            data-ocid="nav.contact.link"
            className="text-sm font-body font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section
      className="relative min-h-[90vh] flex items-end pb-20 overflow-hidden"
      id="home"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/hero-banner.dim_1200x500.jpg"
          alt="Village Style Cooking"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/30 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="text-secondary font-body text-sm font-semibold uppercase tracking-widest mb-3">
            🌿 Est. Traditional Village Recipes
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-4">
            Village Style
            <br />
            <em className="italic text-secondary">Cooking</em>
          </h1>
          <p className="font-body text-white/85 text-lg md:text-xl leading-relaxed mb-8">
            Authentic Flavors from the Heart of the Village
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#menu"
              data-ocid="hero.primary_button"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold px-7 py-3.5 rounded-xl hover:bg-primary/90 transition-colors shadow-village"
            >
              <Leaf className="w-4 h-4" />
              Explore Menu
            </a>
            <a
              href="#contact"
              data-ocid="hero.secondary_button"
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white font-body font-semibold px-7 py-3.5 rounded-xl border border-white/30 hover:bg-white/25 transition-colors"
            >
              Reserve a Table
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-secondary font-body text-sm font-semibold uppercase tracking-widest mb-3">
              Our Story
            </p>
            <h2 className="font-display text-4xl font-bold text-primary-foreground mb-5 leading-tight">
              Recipes Passed Down
              <br />
              <em className="italic">Through Generations</em>
            </h2>
            <p className="text-primary-foreground/80 font-body text-base leading-relaxed mb-6">
              Nestled in the heart of a lush village, our kitchen has been
              serving authentic South Indian delicacies for decades. From the
              smoky depths of bamboo-cooked chicken to the aromatic richness of
              clay pot curries, every dish tells a story of tradition.
            </p>
            <p className="text-primary-foreground/80 font-body text-base leading-relaxed">
              We source our ingredients fresh from local farms every morning,
              ensuring each plate you receive carries the pure, unadulterated
              flavors of the village.
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 gap-5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            {FEATURES.map((f) => (
              <div
                key={f.id}
                className="flex gap-4 items-start bg-primary-foreground/10 rounded-xl p-5 border border-primary-foreground/20"
              >
                <span className="text-3xl mt-0.5">{f.icon}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-primary-foreground mb-1">
                    {f.title}
                  </h3>
                  <p className="text-sm font-body text-primary-foreground/75 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl font-bold text-foreground mb-3">
            Visit Us
          </h2>
          <p className="text-muted-foreground font-body">
            Come taste the village experience
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {CONTACT_INFO.map((info, i) => (
            <motion.div
              key={info.id}
              className="text-center p-6 rounded-2xl bg-muted/50 border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 text-primary">
                {info.icon}
              </div>
              <p className="font-body font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-1">
                {info.label}
              </p>
              <p className="font-body text-sm text-foreground leading-relaxed">
                {info.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const href = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;
  return (
    <footer className="bg-foreground text-primary-foreground py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Leaf className="w-4 h-4 text-secondary" />
          <span className="font-display text-lg font-semibold">
            Village Style Cooking
          </span>
        </div>
        <p className="text-sm font-body text-primary-foreground/60">
          © {year}. Built with ❤️ using{" "}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-secondary transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <MenuSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
