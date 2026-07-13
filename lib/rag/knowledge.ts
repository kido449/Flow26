import type { KnowledgeChunk } from "@/lib/types"

// STATIC KNOWLEDGE LAYER
// Mock but realistic facts about a single generic WC26 host stadium.
// This is the only source of ground truth for the assistant. In production this
// would be swapped for a vector store / CMS behind the same shape.

export const STADIUM_NAME = "Atlas Metropolitan Stadium"

export const KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: "k-gates-overview",
    title: "Stadium gates",
    category: "gates",
    text: `${STADIUM_NAME} has four public entry gates. Gate A (North) serves seating sections 100-115, Gate B (East) serves sections 116-130, Gate C (South) serves sections 131-145, and Gate D (West) serves sections 146-160. Gates open three hours before kickoff. Gate A is the accessible entrance with step-free access.`,
    keywords: ["gate", "entrance", "entry", "door", "gate a", "gate b", "gate c", "gate d", "north", "east", "south", "west", "open", "opening"],
  },
  {
    id: "k-seating-map",
    title: "Seating layout",
    category: "seating",
    text: "Seating is arranged in three tiers. Lower tier sections are numbered 100-160, club level sections 200-230, and upper tier sections 300-345. Your section, row, and seat are printed on your ticket. Section numbers increase clockwise starting from the north stand.",
    keywords: ["seat", "seating", "section", "row", "tier", "lower", "upper", "club level", "where is my seat", "find seat"],
  },
  {
    id: "k-restrooms",
    title: "Restrooms",
    category: "amenities",
    text: "Restrooms are located on every concourse, near sections 104, 112, 122, 136, 148, and 158 on the lower concourse. Accessible restrooms and family/companion restrooms are available near Gate A and on the club level concourse.",
    keywords: ["restroom", "bathroom", "toilet", "wc", "washroom", "family restroom", "accessible restroom"],
  },
  {
    id: "k-medical",
    title: "Medical stations",
    category: "safety",
    text: "There are two first-aid and medical stations: one on the lower concourse near section 108 (behind Gate A) and one on the club level near section 215. Medical staff can also be reached by alerting any steward. In an emergency, dial the stadium control room from any help point.",
    keywords: ["medical", "first aid", "aid", "doctor", "nurse", "injury", "hurt", "sick", "emergency", "help point", "paramedic"],
  },
  {
    id: "k-exits",
    title: "Exits and evacuation",
    category: "safety",
    text: "All four gates (A, B, C, D) double as primary exits. Additional emergency exits are marked with green running-figure signage on every concourse. In an evacuation, follow steward instructions and move to the nearest marked exit; do not use elevators.",
    keywords: ["exit", "evacuation", "evacuate", "leave", "emergency exit", "way out", "leaving", "egress"],
  },
  {
    id: "k-prohibited",
    title: "Prohibited items",
    category: "rules",
    text: "Prohibited items include large bags over 25x25x25 cm, glass containers, outside alcohol, professional cameras with detachable lenses, drones, flares, and weapons. A clear-bag policy is in effect. Small medical bags and diaper bags are permitted after inspection.",
    keywords: ["prohibited", "banned", "not allowed", "bag", "bags", "camera", "alcohol", "bring", "allowed", "clear bag", "policy", "rules"],
  },
  {
    id: "k-kickoff-timing",
    title: "Match timing and arrival",
    category: "timing",
    text: "Gates open three hours before kickoff. Fans are advised to arrive at least 90 minutes early to clear security. Halftime lasts 15 minutes. On matchdays with 60,000+ attendance, expect security lines to peak 60-90 minutes before kickoff.",
    keywords: ["kickoff", "kick off", "time", "timing", "arrive", "arrival", "when", "early", "halftime", "start", "how early"],
  },
  {
    id: "k-transport-metro",
    title: "Getting here by metro",
    category: "transport",
    text: "The stadium is served by Metro Line 2 (Stadium station), a 6-minute walk from Gate B. Trains run every 4 minutes on matchdays until two hours after the final whistle. A dedicated post-match shuttle to the downtown transit hub departs from the West lot near Gate D.",
    keywords: ["metro", "subway", "train", "transport", "transit", "get here", "how to get", "line 2", "shuttle", "station", "travel"],
  },
  {
    id: "k-transport-parking",
    title: "Parking and rideshare",
    category: "transport",
    text: "Official parking is in the North, East, and West lots and must be pre-booked online. Rideshare pickup and drop-off is at the East lot near Gate B. Accessible parking is in the North lot closest to Gate A and requires a valid permit.",
    keywords: ["parking", "park", "car", "rideshare", "uber", "lyft", "drop off", "pickup", "lot", "drive"],
  },
  {
    id: "k-tickets",
    title: "Tickets and entry",
    category: "tickets",
    text: "Entry is by mobile ticket only through the official app; screenshots are not accepted. Add your ticket to your phone wallet before arriving as network may be congested. Each ticket has a unique QR code scanned at your assigned gate. Ticket resale is only permitted through the official resale platform.",
    keywords: ["ticket", "tickets", "qr", "mobile", "entry", "scan", "resale", "wallet", "app"],
  },
  {
    id: "k-accessibility",
    title: "Accessibility services",
    category: "amenities",
    text: "Step-free access is available at Gate A. Wheelchair-accessible seating is in sections 101, 131, and 301, with companion seats adjacent. Assistive listening devices and sensory kits are available from the Guest Services booth near Gate A. Service animals are welcome.",
    keywords: ["accessible", "accessibility", "wheelchair", "disabled", "step free", "companion", "sensory", "assistive", "service animal"],
  },
  {
    id: "k-food",
    title: "Food and concessions",
    category: "amenities",
    text: "Concession stands are on every concourse. Halal, vegetarian, and gluten-free options are marked with icons on the stand menus. Water refill stations are located near sections 106, 128, and 152. Mobile ordering is available in the official app for club-level guests.",
    keywords: ["food", "concession", "eat", "drink", "water", "halal", "vegetarian", "gluten", "snack", "beer", "menu"],
  },
  {
    id: "k-sustainability-waste",
    title: "Waste management and recycling",
    category: "sustainability",
    text: `${STADIUM_NAME} operates a zero-waste-to-landfill program for all matchday events. Color-coded bins for recyclables (blue), compostables (green), and general waste (gray) are placed every 30 meters on all concourses. All food containers are compostable. Fans are encouraged to use the free water refill stations near sections 106, 128, and 152 instead of buying single-use bottles.`,
    keywords: ["recycle", "recycling", "waste", "bin", "trash", "compost", "sustainability", "green", "environment", "eco", "zero waste", "plastic"],
  },
  {
    id: "k-sustainability-energy",
    title: "Energy and water conservation",
    category: "sustainability",
    text: `${STADIUM_NAME} is powered by a rooftop solar array generating 3.2 MW and uses rainwater harvesting for pitch irrigation and restroom flushing. LED stadium lighting reduces energy consumption by 60% compared to legacy fixtures. Real-time energy dashboards in the command center track consumption per zone to minimize waste during low-attendance periods.`,
    keywords: ["solar", "energy", "power", "electricity", "water conservation", "rainwater", "LED", "sustainability", "carbon", "green energy", "renewable"],
  },
  {
    id: "k-sustainability-transport",
    title: "Sustainable transport and carbon offset",
    category: "sustainability",
    text: "The stadium partners with the city transit authority to offer free metro passes on matchdays for ticket holders, reducing car traffic and emissions. Electric vehicle charging stations are available in the North and East parking lots. A carbon offset calculator in the official app estimates each fan's matchday footprint and offers options to offset via verified reforestation programs.",
    keywords: ["carbon", "offset", "electric", "EV", "charging", "green transport", "emissions", "climate", "carbon footprint", "sustainable transport"],
  },
]

