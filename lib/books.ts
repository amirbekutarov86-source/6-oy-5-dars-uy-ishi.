export type Review = { id: string; name: string; rating: number; text: string; date: string };
export type Book = {
  slug: string; title: string; author: string; category: Category; price: number; oldPrice?: number;
  pages: number; year: number; description: string; hue: number; bestseller?: boolean; isNew?: boolean; reviews: Review[];
};
export const categories = ["Fiction", "Science", "Business", "History", "Self-Help", "Technology"] as const;
export type Category = (typeof categories)[number];

let n = 0;
const rv = (name: string, rating: number, text: string, date = "2026-08-14"): Review => ({ id: `seed-${++n}`, name, rating, text, date });

export const books: Book[] = [
  { slug: "atomic-habits", title: "Atomic Habits", author: "James Clear", category: "Self-Help", price: 16.99, oldPrice: 21.99, pages: 320, year: 2018, hue: 28, bestseller: true,
    description: "A practical system for building good habits and breaking bad ones, based on small changes that compound over time.",
    reviews: [rv("Aziza", 5, "Short chapters, clear ideas. I started the two-minute rule the same day."), rv("Jamshid", 4, "Useful, though some parts repeat.")] },
  { slug: "sapiens", title: "Sapiens", author: "Yuval Noah Harari", category: "History", price: 18.5, pages: 443, year: 2011, hue: 18, bestseller: true,
    description: "A sweeping history of humankind, from the first humans to the age of technology, and the stories that hold societies together.",
    reviews: [rv("Mia", 5, "Changed how I look at money and nations."), rv("Dilshod", 4, "Big ideas, readable style.")] },
  { slug: "clean-code", title: "Clean Code", author: "Robert C. Martin", category: "Technology", price: 32, oldPrice: 39, pages: 464, year: 2008, hue: 205,
    description: "A handbook of agile software craftsmanship that shows how to write code that is readable, simple and easy to change.",
    reviews: [rv("Sardor", 5, "Every junior developer should read this."), rv("Noor", 4, "Some examples are dated, the principles are not.")] },
  { slug: "pragmatic-programmer", title: "The Pragmatic Programmer", author: "Andrew Hunt, David Thomas", category: "Technology", price: 35, pages: 352, year: 1999, hue: 175, isNew: true,
    description: "Timeless advice on becoming a better programmer, from taking responsibility for your work to automating everything you can.",
    reviews: [rv("Lola", 5, "Practical tips I use every week.")] },
  { slug: "dune", title: "Dune", author: "Frank Herbert", category: "Fiction", price: 14.99, pages: 612, year: 1965, hue: 38, bestseller: true,
    description: "On the desert planet Arrakis, a young heir is pulled into a war over the most valuable substance in the universe.",
    reviews: [rv("Timur", 5, "World-building at its best."), rv("Sofia", 5, "Slow start, unforgettable finish.")] },
  { slug: "1984", title: "1984", author: "George Orwell", category: "Fiction", price: 11.99, oldPrice: 14.99, pages: 328, year: 1949, hue: 0,
    description: "A chilling story of surveillance, propaganda and the fight to keep a private mind in a totalitarian state.",
    reviews: [rv("Karim", 5, "Frighteningly relevant."), rv("Elena", 4, "Dark, but worth it.")] },
  { slug: "brief-history-of-time", title: "A Brief History of Time", author: "Stephen Hawking", category: "Science", price: 15.5, pages: 212, year: 1988, hue: 250,
    description: "An accessible tour of black holes, the Big Bang and the nature of time, written for readers without a physics background.",
    reviews: [rv("Bobur", 4, "Hard in places, but rewarding.")] },
  { slug: "cosmos", title: "Cosmos", author: "Carl Sagan", category: "Science", price: 17.25, pages: 396, year: 1980, hue: 280, isNew: true,
    description: "A poetic journey through space and time that explains how humans came to understand the universe.",
    reviews: [rv("Madina", 5, "Made me look at the night sky for hours.")] },
  { slug: "zero-to-one", title: "Zero to One", author: "Peter Thiel", category: "Business", price: 19.99, pages: 224, year: 2014, hue: 140, bestseller: true,
    description: "Notes on startups and how to build companies that create something new instead of copying what already works.",
    reviews: [rv("Anvar", 4, "Strong opinions, good thinking prompts.")] },
  { slug: "lean-startup", title: "The Lean Startup", author: "Eric Ries", category: "Business", price: 20, oldPrice: 24, pages: 336, year: 2011, hue: 95,
    description: "A method for testing ideas quickly, learning from customers and building products people actually want.",
    reviews: [rv("Zarina", 5, "Changed how our team plans releases."), rv("Pavel", 4, "Great framework.")] },
  { slug: "deep-work", title: "Deep Work", author: "Cal Newport", category: "Self-Help", price: 17.5, pages: 304, year: 2016, hue: 330,
    description: "Rules for focused success in a distracted world, with strategies to protect your attention and do your best work.",
    reviews: [rv("Ravshan", 5, "I deleted two apps after chapter three.")] },
  { slug: "guns-germs-steel", title: "Guns, Germs, and Steel", author: "Jared Diamond", category: "History", price: 19.25, pages: 480, year: 1997, hue: 60,
    description: "An argument that geography and environment, not innate differences, shaped the fates of human societies.",
    reviews: [rv("Olim", 4, "Dense but fascinating.")] },
];

export const getBook = (slug: string) => books.find((b) => b.slug === slug);
export const avg = (rs: { rating: number }[]) => (rs.length ? rs.reduce((s, r) => s + r.rating, 0) / rs.length : 0);
