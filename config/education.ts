export interface EducationItem {
  id: string;
  institution: string;
  location: string;
  specialization: string;
  marks: string;
  startYear: string;
  endYear: string;
  logo: string;
}

export const educationsData: EducationItem[] = [
  {
    id: "edu-1",
    institution: "National Institute of Engineering",
    location: "Mysore, Karnataka, India",
    specialization: "Bachelor of Engineering in Computer Science",
    marks: "CGPA: 8.8 / 10",
    startYear: "2020",
    endYear: "2024",
    logo: "/icons/academic-cap.svg",
  },
  {
    id: "edu-2",
    institution: "Pre-University College",
    location: "Karnataka, India",
    specialization: "PCMC (Physics, Chemistry, Mathematics, Computer Science)",
    marks: "Percentage: 92%",
    startYear: "2018",
    endYear: "2020",
    logo: "/icons/academic-cap.svg",
  },
];
