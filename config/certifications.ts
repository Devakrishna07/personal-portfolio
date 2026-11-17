export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  credentialId: string;
  url?: string;
  issueDate?: string;
  logo: string;
}

export const certificationsData: CertificationItem[] = [
  {
    id: "cert-1",
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services (AWS)",
    credentialId: "AWS-SAA-839210283",
    url: "https://aws.amazon.com/verification",
    issueDate: "2024",
    logo: "/icons/badge.svg",
  },
  {
    id: "cert-2",
    name: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta / Coursera",
    credentialId: "META-FED-7492018",
    url: "https://www.coursera.org/account/accomplishments/specialization",
    issueDate: "2023",
    logo: "/icons/badge.svg",
  },
  {
    id: "cert-3",
    name: "Google Cloud Certified Associate Cloud Engineer",
    issuer: "Google Cloud",
    credentialId: "GCP-ACE-9948210",
    url: "https://cloud.google.com/certification",
    issueDate: "2023",
    logo: "/icons/badge.svg",
  },
];
