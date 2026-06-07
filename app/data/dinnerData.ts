// ../app/data/dinnerData.ts
import { StaticImageData } from 'next/image';
import hodaiLogo from '../assets/hodai.jpg';
import kaizenLogo from '../assets/kaizen.png';
import holycowLogo from '../assets/holycow.jpg';
import guriLogo from '../assets/guriramen.jpg';
import signoraLogo from '../assets/signorapasta.jpg';
import paneLogo from '../assets/paneepane.png';

export interface ReasonItem {
  icon: string;
  title: string;
  text: string;
}

export interface DinnerSpotItem {
  name: string;
  type: string;
  logo: StaticImageData;
  desc: string;
  color: string;
  border: string;
  url: string;
  hasWhiteBg: boolean;
}

export const reasons: ReasonItem[] = [
  { icon: "🌸", title: "Your Smile & Face When You Look At Me", text: "Even when it rains, the sky turns blue when it sees you smile, or at least that's what I feel inside me." },
  { icon: "🌙", title: "Your Mercy & Forgiveness", text: "The way you are gentle and kind to everything around you, easy to forgive, but stern when needed is the most beautiful thing." },
  { icon: "🐾", title: "Your Loveliness & Clinginess", text: "You make me feel perfectly cozy and comfortable, somebody that enjoys being with me and loves to meet." },
  { icon: "🍡", title: "Your Intelligence & Devotion", text: "Your devotion to your cause and education makes me inspired to keep going, to keep fighting for us both." },
  { icon: "✨", title: "Your Dedication", text: "Even in hard days you still push on and pick yoruself up, even picking other people up and motivating them when you yourself were shattered." },
  { icon: "🌈", title: "All of You", text: "Every little part of you, every quirk, every habit — I'd choose all of it, every day. No matter the situation, whether hard or not, I'd end up choosing you." },
];

export const dinnerSpots: DinnerSpotItem[] = [
  { 
    name: "Hodai AYCE", 
    type: "Japanese BBQ & Shabu", 
    logo: hodaiLogo, 
    desc: "Infinite premium beef slices, melting cheese dips, and cozy vapor clouds.", 
    color: "from-amber-50 to-orange-100/40", 
    border: "hover:border-orange-300", 
    url: "https://www.google.com/maps/dir/?api=1&origin=Your+Location&destination=Hodai+AYCE+Jl.+Ciliwung+No.39+Purwantoro+Kec.+Blimbing+Kota+Malang+Jawa+Timur+65126", 
    hasWhiteBg: false 
  },
  { 
    name: "Kaizen AYCE", 
    type: "Premium Japanese Grill", 
    logo: kaizenLogo, 
    desc: "Top-tier selections where you can feast like royalty without any limits.", 
    color: "from-red-50 to-rose-100/40", 
    border: "hover:border-rose-300", 
    url: "https://www.google.com/maps/dir/?api=1&origin=Your+Location&destination=Kaizen+Wilis+Jl.+Wilis+No.25+Gading+Kasri+Kec.+Klojen+Kota+Malang+Jawa+Timur+65115", 
    hasWhiteBg: true 
  },
  { 
    name: "Holy Cow", 
    type: "Gourmet Steakhouse", 
    logo: holycowLogo, 
    desc: "Incredibly juicy wagyu cuts cooked exactly right with signature sauces.", 
    color: "from-amber-50 to-yellow-100/40", 
    border: "hover:border-yellow-300", 
    url: "https://www.google.com/maps/dir/?api=1&origin=Your+Location&destination=STEAK+HOTEL+BY+HOLYCOW+Jl.+Guntur+No.19+Oro-oro+Dowo+Kec.+Klojen+Kota+Malang+Jawa+Timur+65119", 
    hasWhiteBg: true 
  },
  { 
    name: "Guri Ramen", 
    type: "Authentic Japanese Ramen", 
    logo: guriLogo, 
    desc: "Rich, deeply savory broths served with perfectly springy noodles and premium toppings.", 
    color: "from-emerald-50/60 to-emerald-100/30", 
    border: "hover:border-emerald-400", 
    url: "https://www.google.com/maps/dir/?api=1&origin=Your+Location&destination=Guri+Ramen+Jl.+Soekarno+Hatta+No.28+Mojolangu+Kec.+Lowokwaru+Kota+Malang+Jawa+Timur+65141", 
    hasWhiteBg: false 
  },
  { 
    name: "Signora Pasta", 
    type: "Authentic Italian Kitchen", 
    logo: signoraLogo, 
    desc: "Rich, velvety handcrafted pasta tossed in aromatic garden herbs and olive oils.", 
    color: "from-purple-50 to-indigo-100/30", 
    border: "hover:border-indigo-300", 
    url: "https://www.google.com/maps/dir/?api=1&origin=Your+Location&destination=Signora+Pasta+Jl+Lasem+no+7+Malang", 
    hasWhiteBg: false 
  },
  { 
    name: "Pane e Pane", 
    type: "Artisanal Italian Bakery", 
    logo: paneLogo, 
    desc: "Freshly baked sourdoughs, flaky traditional pastries, and authentic Italian comforting bites.", 
    color: "from-stone-50 to-amber-100/20", 
    border: "hover:border-amber-200", 
    url: "https://www.google.com/maps/dir/?api=1&origin=Your+Location&destination=Pane+e+Pane+Jl.+Kinibalu+No.1+Karangbesuki+Kec.+Sukun+Kota+Malang+Jawa+Timur+65146", 
    hasWhiteBg: true 
  }
];