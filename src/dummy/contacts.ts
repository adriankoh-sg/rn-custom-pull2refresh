import { ContactType } from "@/src/types";

const sampleContacts = [
  {
    name: "Ava Chen",
    avatar: "https://i.pravatar.cc/150?img=47",
    phone: "+1 (415) 555-0123",
  },
  {
    name: "Noah Patel",
    avatar: "https://i.pravatar.cc/150?img=12",
    phone: "+1 (212) 555-0198",
  },
  {
    name: "Mia Rodriguez",
    avatar: "https://i.pravatar.cc/150?img=5",
    phone: "+1 (305) 555-0176",
  },
  {
    name: "Ethan Kim",
    avatar: "https://i.pravatar.cc/150?img=22",
    phone: "+1 (206) 555-0141",
  },
  {
    name: "Sophia Nguyen",
    avatar: "https://i.pravatar.cc/150?img=31",
    phone: "+1 (408) 555-0162",
  },
  {
    name: "Liam Johnson",
    avatar: "https://i.pravatar.cc/150?img=9",
    phone: "+1 (617) 555-0139",
  },
  {
    name: "Isabella Brown",
    avatar: "https://i.pravatar.cc/150?img=18",
    phone: "+1 (303) 555-0107",
  },
  {
    name: "Oliver Wilson",
    avatar: "https://i.pravatar.cc/150?img=36",
    phone: "+1 (702) 555-0155",
  },
  {
    name: "Charlotte Davis",
    avatar: "https://i.pravatar.cc/150?img=25",
    phone: "+1 (312) 555-0114",
  },
  {
    name: "James Martin",
    avatar: "https://i.pravatar.cc/150?img=41",
    phone: "+1 (646) 555-0183",
  },
  {
    name: "Amelia Thompson",
    avatar: "https://i.pravatar.cc/150?img=52",
    phone: "+1 (415) 555-0187",
  },
  {
    name: "Benjamin Lee",
    avatar: "https://i.pravatar.cc/150?img=53",
    phone: "+1 (212) 555-0146",
  },
  {
    name: "Harper Garcia",
    avatar: "https://i.pravatar.cc/150?img=54",
    phone: "+1 (305) 555-0191",
  },
  {
    name: "Lucas Hernandez",
    avatar: "https://i.pravatar.cc/150?img=55",
    phone: "+1 (206) 555-0109",
  },
  {
    name: "Evelyn Martinez",
    avatar: "https://i.pravatar.cc/150?img=56",
    phone: "+1 (408) 555-0174",
  },
  {
    name: "Henry Robinson",
    avatar: "https://i.pravatar.cc/150?img=57",
    phone: "+1 (617) 555-0128",
  },
  {
    name: "Abigail Clark",
    avatar: "https://i.pravatar.cc/150?img=58",
    phone: "+1 (303) 555-0166",
  },
  {
    name: "Jackson Lewis",
    avatar: "https://i.pravatar.cc/150?img=59",
    phone: "+1 (702) 555-0133",
  },
  {
    name: "Emily Walker",
    avatar: "https://i.pravatar.cc/150?img=60",
    phone: "+1 (312) 555-0199",
  },
  {
    name: "Sebastian Hall",
    avatar: "https://i.pravatar.cc/150?img=61",
    phone: "+1 (646) 555-0111",
  },
  {
    name: "Ella Allen",
    avatar: "https://i.pravatar.cc/150?img=62",
    phone: "+1 (415) 555-0104",
  },
  {
    name: "Daniel Young",
    avatar: "https://i.pravatar.cc/150?img=63",
    phone: "+1 (212) 555-0170",
  },
  {
    name: "Scarlett King",
    avatar: "https://i.pravatar.cc/150?img=64",
    phone: "+1 (305) 555-0122",
  },
  {
    name: "Matthew Wright",
    avatar: "https://i.pravatar.cc/150?img=65",
    phone: "+1 (206) 555-0180",
  },
  {
    name: "Grace Scott",
    avatar: "https://i.pravatar.cc/150?img=66",
    phone: "+1 (408) 555-0137",
  },
  {
    name: "Joseph Green",
    avatar: "https://i.pravatar.cc/150?img=67",
    phone: "+1 (617) 555-0152",
  },
  {
    name: "Chloe Baker",
    avatar: "https://i.pravatar.cc/150?img=68",
    phone: "+1 (303) 555-0119",
  },
  {
    name: "David Adams",
    avatar: "https://i.pravatar.cc/150?img=69",
    phone: "+1 (702) 555-0168",
  },
  {
    name: "Victoria Nelson",
    avatar: "https://i.pravatar.cc/150?img=70",
    phone: "+1 (312) 555-0143",
  },
  {
    name: "Andrew Carter",
    avatar: "https://i.pravatar.cc/150?img=71",
    phone: "+1 (646) 555-0190",
  },
] satisfies Omit<ContactType, "id">[];

export const sampleContactList: ContactType[] = sampleContacts.map(
  (c, idx) => ({
    id: idx + 1,
    ...c,
  }),
);
