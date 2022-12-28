import bcrypt from "bcryptjs";

interface SeedData {
  users: SeedUser[];
  clinics: SeedClinics[];
}

interface SeedUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "client";
}

interface SeedClinics {
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
  instagram: { name: string; link: string };
  qualification: [
    { user_id: string; user_name: string; approved: boolean; stars: number }
  ];
  certifications: [
    {
      name: string;
      description: string;
      logo: string;
    }
  ];
  address: string;
  comments: [
    {
      user_photo: string;
      user_name: string;
      user_id: string;
      description: string;
      likes: [{ user_id: String; user_name: String; approved: Boolean }];
      createdAt: number;
      answers: [];
    }
  ];
}

export const seedData: SeedData = {
  users: [
    {
      name: "Bresneth Oliveros",
      email: "boliveros@google.com",
      password: bcrypt.hashSync("123456"),
      role: "admin",
    },
    {
      name: "Eduardo Rios",
      email: "eduardo@google.com",
      password: bcrypt.hashSync("123456"),
      role: "client",
    },
  ],
  clinics: [
    {
      category: "principal",
      certified: false,
      finantial: "8 million US in 2021",
      speciality: "Plastic and Reconstruction",
      technology:
        "Animation Deformity: Evaluating the Role of Morphotopologic Features in Suggesting Preventive Surgical Procedures",
      avatar: "/static/images/avatar/1.jpg",
      photo:
        "https://clinicajaca.com/wp-content/uploads/2020/08/clinicajaca-22-scaled.jpg",
      name: "Clinica porto azul",
      city: "Barranquilla",
      country: "Colombia",
      instagram: {
        name: "clinicaportoazulauna",
        link: "https://www.instagram.com/clinicaportoazulauna/?hl=es",
      },
      qualification: [
        {
          user_id: "63ab286da6e59074d5465dd1",
          user_name: "codo",
          approved: false,
          stars: 2,
        },
      ],
      certifications: [
        {
          name: "Plantree Gold Certification",
          description:
            "Plantree Gold Certification for Excellent in Person Centered Care - 2018 ",
          logo: "/static/images/certifications/plantree_certification.jfif",
        },
      ],
      address: "Cra 105#45-265",
      comments: [
        {
          user_photo: "/static/images/avatar/3.jpg",
          user_id: "63ab286da6e59074d5465dd1",
          user_name: "codo",
          description: "I loved it. Very good attention.",
          likes: [
            {
              user_id: "63aa11440fffc0374b6cb107",
              user_name: "Eduardo Rios",
              approved: true,
            },
          ],
          createdAt: Date.now(),
          answers: [],
        },
      ],
    },
  ],
};
