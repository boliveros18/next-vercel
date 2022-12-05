interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  category: string;
  certified: boolean;
  finantial: string;
  speciality: string;
  technology: string;
  avatar: string;
  photo: string;
  name: string;
  city: string;
  country: string;
  instagram: string;
  qualification: number;
  certifications: string;
  address: string;
  comments: [];
}

export const seedData: SeedData = {
  entries: [
    {
      category: "principal",
      certified: false,
      finantial: "8 million US in 2021",
      speciality: "Plastic and Reconstruction",
      technology: "Animation Deformity: Evaluating the Role of Morphotopologic Features in Suggesting Preventive Surgical Procedures",
      avatar: "/static/images/avatar/1.jpg",
      photo:
        "https://clinicajaca.com/wp-content/uploads/2020/08/clinicajaca-22-scaled.jpg",
      name: "Clinica porto azul",
      city: "Barranquilla",
      country: "Colombia",
      instagram: "",
      qualification: 4,
      certifications: "Certifications in",
      address: "Cra 105#45-265",
      comments: [],
    },
  ],
};
