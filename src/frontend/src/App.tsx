import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  ChevronLeft,
  Flame,
  Leaf,
  Minus,
  Phone,
  Plus,
  ShoppingCart,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SiGooglepay, SiPhonepe } from "react-icons/si";
import { Toaster, toast } from "sonner";

// ─── Types ───────────────────────────────────────────────────────────────────
interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  emoji: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

type Page = "menu" | "payment" | "confirmation";

type PaymentMethod = "upi" | "phonepe" | "googlepay" | "cod";

// ─── Data ────────────────────────────────────────────────────────────────────
const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: "Bamboo Chicken",
    price: 280,
    description: "Tender chicken slow-cooked inside bamboo over open fire",
    image: "/assets/generated/bamboo-chicken.dim_400x300.jpg",
    emoji: "🎋",
  },
  {
    id: 2,
    name: "Bamboo Biryani",
    price: 220,
    description: "Aromatic biryani cooked in bamboo with tribal spices",
    image: "/assets/generated/bamboo-biryani.dim_400x300.jpg",
    emoji: "🍚",
  },
  {
    id: 3,
    name: "Pot Chicken",
    price: 260,
    description: "Rich chicken curry in traditional clay pot",
    image: "/assets/generated/pot-chicken.dim_400x300.jpg",
    emoji: "🏺",
  },
  {
    id: 4,
    name: "Pot Biryani",
    price: 200,
    description: "Dum biryani sealed and slow-cooked in clay handi",
    image: "/assets/generated/pot-biryani.dim_400x300.jpg",
    emoji: "🍛",
  },
];

const PAYMENT_OPTIONS: {
  id: PaymentMethod;
  label: string;
  icon: string;
  desc: string;
}[] = [
  { id: "upi", label: "UPI", icon: "💳", desc: "Pay via any UPI app" },
  {
    id: "phonepe",
    label: "PhonePe",
    icon: "📱",
    desc: "Fast & secure payments",
  },
  {
    id: "googlepay",
    label: "Google Pay",
    icon: "🔵",
    desc: "Pay with Google Pay",
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    icon: "💵",
    desc: "Pay when you receive",
  },
];

function generateOrderId(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `#ABB-${num}`;
}

// ─── Header ──────────────────────────────────────────────────────────────────
function Header({
  cartCount,
  onCartOpen,
  page,
  onBack,
}: {
  cartCount: number;
  onCartOpen: () => void;
  page: Page;
  onBack: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 bamboo-bg shadow-tribal">
      <div className="flex items-center justify-between px-4 py-3 max-w-[480px] mx-auto">
        <div className="flex items-center gap-2.5">
          {page !== "menu" ? (
            <button
              type="button"
              onClick={onBack}
              className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-primary-foreground hover:bg-white/25 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
              <Flame className="w-5 h-5 text-gold" />
            </div>
          )}
          <div>
            <h1 className="font-display text-base font-bold text-primary-foreground leading-tight">
              Araku Bamboo Biryani
            </h1>
            <p className="text-[10px] text-white/70 font-body leading-none">
              {page === "menu"
                ? "Authentic Tribal Bamboo Cooking"
                : page === "payment"
                  ? "Secure Payment"
                  : "Order Placed!"}
            </p>
          </div>
        </div>
        {page === "menu" && (
          <button
            type="button"
            data-ocid="header.cart_button"
            onClick={onCartOpen}
            className="relative w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-primary-foreground hover:bg-white/25 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <Badge className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-accent text-accent-foreground border-0 fire-glow">
                {cartCount}
              </Badge>
            )}
          </button>
        )}
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-52">
        <img
          src="/assets/generated/hero-bamboo-cooking.dim_800x500.jpg"
          alt="Bamboo Cooking"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-[11px] uppercase tracking-widest font-body font-semibold text-gold mb-1">
              🎋 Araku Valley Tribal Style
            </p>
            <h2 className="font-display text-2xl font-bold text-white leading-tight">
              Taste the <em className="italic text-gold">Araku Tradition</em>
            </h2>
            <p className="text-white/80 text-xs font-body mt-1">
              Cooked over open fire · Fresh bamboo · Ancient recipes
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Menu Card ────────────────────────────────────────────────────────────────
function MenuCard({
  item,
  index,
  quantity,
  onQuantityChange,
  onAddToCart,
}: {
  item: MenuItem;
  index: number;
  quantity: number;
  onQuantityChange: (id: number, qty: number) => void;
  onAddToCart: (item: MenuItem, qty: number) => void;
}) {
  return (
    <motion.article
      data-ocid={`menu.item.${index + 1}`}
      className="tribal-card bg-card rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-2 left-2">
          <span className="bg-primary/90 text-primary-foreground text-[10px] font-body font-semibold px-2 py-0.5 rounded-full">
            {item.emoji} Tribal Special
          </span>
        </div>
      </div>
      <div className="p-3.5">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-display text-base font-bold text-foreground leading-tight">
            {item.name}
          </h3>
          <span className="font-display text-lg font-bold text-accent shrink-0 ml-2">
            ₹{item.price}
          </span>
        </div>
        <p className="text-[11px] text-muted-foreground font-body leading-relaxed mb-3">
          {item.description}
        </p>
        {/* Quantity selector */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-muted rounded-full px-1 py-1">
            <button
              type="button"
              onClick={() =>
                onQuantityChange(item.id, Math.max(0, quantity - 1))
              }
              className="w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
              disabled={quantity === 0}
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-5 text-center font-body font-semibold text-sm text-foreground">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => onQuantityChange(item.id, quantity + 1)}
              className="w-7 h-7 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <Button
            data-ocid={`menu.add_button.${index + 1}`}
            size="sm"
            disabled={quantity === 0}
            onClick={() => {
              onAddToCart(item, quantity);
              onQuantityChange(item.id, 0);
            }}
            className="rounded-full text-xs px-4 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 fire-glow"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Cart Sheet ───────────────────────────────────────────────────────────────
function CartSheet({
  open,
  cart,
  onClose,
  onRemove,
  onProceed,
}: {
  open: boolean;
  cart: CartItem[];
  onClose: () => void;
  onRemove: (id: number) => void;
  onProceed: () => void;
}) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-foreground/50 fade-in"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Sheet */}
          <motion.div
            data-ocid="cart.sheet"
            className="fixed bottom-0 left-0 right-0 z-50 max-w-[480px] mx-auto bg-card rounded-t-3xl shadow-fire"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>
            <div className="px-5 pb-2 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-foreground">
                Your Cart
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-border transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <Separator />
            <div className="px-5 py-3 max-h-64 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="py-10 text-center">
                  <p className="text-4xl mb-2">🛒</p>
                  <p className="text-muted-foreground font-body text-sm">
                    Your cart is empty
                  </p>
                  <p className="text-xs text-muted-foreground font-body mt-1">
                    Add some delicious items!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item, i) => (
                    <div
                      key={item.id}
                      data-ocid={`cart.item.${i + 1}`}
                      className="flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <p className="font-body font-semibold text-sm text-foreground">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground font-body">
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-body font-bold text-sm text-accent">
                          ₹{item.price * item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onRemove(item.id)}
                          className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center hover:bg-destructive/20 transition-colors"
                        >
                          <X className="w-3 h-3 text-destructive" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Separator />
            <div className="px-5 py-4">
              <div className="flex items-center justify-between mb-4">
                <span className="font-body font-semibold text-foreground">
                  Total
                </span>
                <span className="font-display text-2xl font-bold text-accent">
                  ₹{total}
                </span>
              </div>
              <Button
                data-ocid="cart.proceed_button"
                disabled={cart.length === 0}
                onClick={() => {
                  onClose();
                  onProceed();
                }}
                className="w-full rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold fire-glow h-12 text-base disabled:opacity-40"
              >
                Proceed to Payment →
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Payment Page ─────────────────────────────────────────────────────────────
function PaymentPage({
  cart,
  selectedPayment,
  onSelectPayment,
  onPlaceOrder,
}: {
  cart: CartItem[];
  selectedPayment: PaymentMethod | "";
  onSelectPayment: (p: PaymentMethod) => void;
  onPlaceOrder: () => void;
}) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
      className="px-4 py-5 pb-24"
    >
      {/* Order Summary */}
      <div className="bg-card rounded-2xl border-2 border-border p-4 mb-5">
        <h3 className="font-display text-base font-bold text-foreground mb-3">
          📋 Order Summary
        </h3>
        <div className="space-y-2">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between text-sm font-body"
            >
              <span className="text-foreground">
                {item.name}{" "}
                <span className="text-muted-foreground">×{item.quantity}</span>
              </span>
              <span className="font-semibold text-foreground">
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}
        </div>
        <Separator className="my-3" />
        <div className="flex justify-between">
          <span className="font-body font-bold text-foreground">Total</span>
          <span className="font-display text-xl font-bold text-accent">
            ₹{total}
          </span>
        </div>
      </div>

      {/* Payment Methods */}
      <h3 className="font-display text-base font-bold text-foreground mb-3">
        💳 Select Payment Method
      </h3>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {PAYMENT_OPTIONS.map((opt, i) => (
          <button
            type="button"
            key={opt.id}
            data-ocid={`payment.select.${i + 1}`}
            onClick={() => onSelectPayment(opt.id)}
            className={`p-4 rounded-2xl border-2 text-left transition-all ${
              selectedPayment === opt.id
                ? "border-accent bg-accent/10 fire-glow"
                : "border-border bg-card hover:border-accent/40"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              {opt.id === "phonepe" ? (
                <SiPhonepe className="w-5 h-5 text-purple-600" />
              ) : opt.id === "googlepay" ? (
                <SiGooglepay className="w-6 h-6" />
              ) : (
                <span className="text-xl">{opt.icon}</span>
              )}
              {selectedPayment === opt.id && (
                <CheckCircle2 className="w-4 h-4 text-accent ml-auto" />
              )}
            </div>
            <p className="font-body font-semibold text-sm text-foreground">
              {opt.label}
            </p>
            <p className="font-body text-[10px] text-muted-foreground leading-tight mt-0.5">
              {opt.desc}
            </p>
          </button>
        ))}
      </div>

      <Button
        data-ocid="payment.submit_button"
        disabled={!selectedPayment}
        onClick={onPlaceOrder}
        className="w-full rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/90 font-body font-semibold h-12 text-base disabled:opacity-40 shadow-tribal"
      >
        🎋 Place Order — ₹{total}
      </Button>
    </motion.div>
  );
}

// ─── Order Confirmation Dialog ────────────────────────────────────────────────
function OrderConfirmation({
  open,
  cart,
  orderId,
  selectedPayment,
  onClose,
}: {
  open: boolean;
  cart: CartItem[];
  orderId: string;
  selectedPayment: PaymentMethod | "";
  onClose: () => void;
}) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const paymentLabel =
    PAYMENT_OPTIONS.find((p) => p.id === selectedPayment)?.label ?? "";

  return (
    <Dialog open={open}>
      <DialogContent
        data-ocid="order.dialog"
        className="max-w-[440px] mx-4 rounded-3xl border-2 border-secondary/30 p-0 overflow-hidden"
        onInteractOutside={(e) => e.preventDefault()}
      >
        {/* Green top banner */}
        <div className="bg-secondary py-7 px-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 15, delay: 0.1 }}
          >
            <CheckCircle2 className="w-16 h-16 text-secondary-foreground mx-auto mb-3" />
          </motion.div>
          <DialogHeader>
            <DialogTitle
              data-ocid="order.success_state"
              className="font-display text-xl font-bold text-secondary-foreground text-center"
            >
              Order Confirmed! 🎉
            </DialogTitle>
          </DialogHeader>
          <p className="text-secondary-foreground/85 font-body text-sm mt-2 leading-relaxed">
            Thank you for ordering from Araku Bamboo Biryani. Your order has
            been received and will be prepared soon.
          </p>
        </div>

        <div className="p-5">
          {/* Order ID */}
          <div className="bg-muted rounded-xl p-3 mb-4 text-center">
            <p className="text-[10px] font-body text-muted-foreground uppercase tracking-wider">
              Order ID
            </p>
            <p className="font-display text-xl font-bold text-accent">
              {orderId}
            </p>
          </div>

          {/* Items */}
          <div className="space-y-2 mb-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm font-body"
              >
                <span className="text-foreground">
                  {item.name}{" "}
                  <span className="text-muted-foreground">
                    ×{item.quantity}
                  </span>
                </span>
                <span className="font-semibold">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
          <Separator className="mb-3" />
          <div className="flex justify-between mb-1 font-body">
            <span className="text-muted-foreground text-sm">Total Paid</span>
            <span className="font-display font-bold text-lg text-accent">
              ₹{total}
            </span>
          </div>
          <div className="flex justify-between font-body">
            <span className="text-muted-foreground text-sm">Payment via</span>
            <span className="font-semibold text-sm text-foreground">
              {paymentLabel}
            </span>
          </div>

          <Button
            data-ocid="order.close_button"
            onClick={onClose}
            className="w-full mt-5 rounded-xl bamboo-bg text-primary-foreground hover:opacity-90 font-body font-semibold h-11"
          >
            Back to Menu
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [page, setPage] = useState<Page>("menu");
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | "">(
    "cod",
  );
  const [orderId, setOrderId] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemQuantities, setItemQuantities] = useState<Record<number, number>>(
    Object.fromEntries(MENU_ITEMS.map((item) => [item.id, 0])),
  );

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  function handleQuantityChange(id: number, qty: number) {
    setItemQuantities((prev) => ({ ...prev, [id]: qty }));
  }

  function handleAddToCart(item: MenuItem, qty: number) {
    if (qty === 0) return;
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + qty } : c,
        );
      }
      return [
        ...prev,
        { id: item.id, name: item.name, price: item.price, quantity: qty },
      ];
    });
    toast.success(`${item.name} added to cart!`, {
      description: `${qty} × ₹${item.price}`,
      duration: 2000,
    });
  }

  function handleRemoveFromCart(id: number) {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }

  function handlePlaceOrder() {
    const newOrderId = generateOrderId();
    setOrderId(newOrderId);
    setPage("confirmation");
    setShowConfirmation(true);
  }

  function handleConfirmationClose() {
    setShowConfirmation(false);
    setCart([]);
    setPage("menu");
    setSelectedPayment("cod");
    setItemQuantities(
      Object.fromEntries(MENU_ITEMS.map((item) => [item.id, 0])),
    );
  }

  return (
    <div className="min-h-screen parchment-bg">
      <Toaster position="top-center" richColors />

      {/* Mobile wrapper — centered on desktop */}
      <div className="max-w-[480px] mx-auto min-h-screen flex flex-col relative shadow-[0_0_40px_oklch(0.30_0.08_47_/_0.15)]">
        <Header
          cartCount={cartCount}
          onCartOpen={() => setShowCart(true)}
          page={page}
          onBack={() => setPage("menu")}
        />

        <main className="flex-1">
          <AnimatePresence mode="wait">
            {page === "menu" && (
              <motion.div
                key="menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Hero />

                {/* Menu Section */}
                <section className="px-4 pt-5 pb-8">
                  <div className="text-center mb-5">
                    <p className="text-[10px] uppercase tracking-widest font-body font-semibold text-secondary mb-1">
                      🔥 Slow-cooked to perfection
                    </p>
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      Our Special Menu
                    </h2>
                    <div className="tribal-divider mt-2 text-border">
                      <span className="text-sm">🎋</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {MENU_ITEMS.map((item, i) => (
                      <MenuCard
                        key={item.id}
                        item={item}
                        index={i}
                        quantity={itemQuantities[item.id] ?? 0}
                        onQuantityChange={handleQuantityChange}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                </section>

                {/* Contact Footer */}
                <footer className="bamboo-bg py-5 px-4">
                  <div className="max-w-[480px] mx-auto text-center">
                    <h3 className="font-display text-base font-bold text-primary-foreground mb-1">
                      Contact Us
                    </h3>
                    <a
                      href="tel:8466056551"
                      className="inline-flex items-center gap-2 text-gold font-body font-semibold text-sm hover:text-white transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      8466056551
                    </a>
                    <p className="text-white/60 text-xs font-body mt-1">
                      Open for orders daily
                    </p>
                    <Separator className="my-3 bg-white/15" />
                    <div className="flex items-center justify-center gap-1.5">
                      <Leaf className="w-3 h-3 text-white/50" />
                      <p className="text-white/50 text-[10px] font-body">
                        © {new Date().getFullYear()}. Built with ❤️ using{" "}
                        <a
                          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-white/80 transition-colors"
                        >
                          caffeine.ai
                        </a>
                      </p>
                    </div>
                  </div>
                </footer>
              </motion.div>
            )}

            {page === "payment" && (
              <PaymentPage
                key="payment"
                cart={cart}
                selectedPayment={selectedPayment}
                onSelectPayment={setSelectedPayment}
                onPlaceOrder={handlePlaceOrder}
              />
            )}
          </AnimatePresence>
        </main>

        {/* Cart Sheet */}
        <CartSheet
          open={showCart}
          cart={cart}
          onClose={() => setShowCart(false)}
          onRemove={handleRemoveFromCart}
          onProceed={() => setPage("payment")}
        />

        {/* Order Confirmation */}
        <OrderConfirmation
          open={showConfirmation}
          cart={cart}
          orderId={orderId}
          selectedPayment={selectedPayment}
          onClose={handleConfirmationClose}
        />
      </div>
    </div>
  );
}
