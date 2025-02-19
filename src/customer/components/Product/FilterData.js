export const color = [
  "Purple",
  "white",
  "Black",
  "Red",
  "maroon",
  "Being",
  "Pink",
  "Green",
  "Yellow",
];
export const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "white" },
      { value: "purple", label: "purple" },
      { value: "red", label: "red" },
      { value: "blue", label: "blue" },
      { value: "pink", label: "pink" },
      { value: "gray", label: "gray" },
      { value: "black", label: "black" },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "S", label: "S" },
      { value: "M", label: "M" },
      { value: "L", label: "L" },
    ],
  },
  {
    id: "discount",
    name: "Discount Range",
    options: [
      { value: "10", label: "10% and Above" },
      { value: "20", label: "20% and Above" },
      { value: "30", label: "30% and Above" },
      { value: "40", label: "40% and Above" },
      { value: "50", label: "50% and Above" },
      { value: "60", label: "60% and Above" },
      { value: "70", label: "70% and Above" },
      { value: "80", label: "80% and Above" },
    ],
  },
];

export const sortOptions = [
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];
