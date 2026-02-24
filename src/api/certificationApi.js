const certifications = [
  {
    id: 1,
    name: "AWS Solutions Architect",
    provider: "Amazon",
    issueDate: "2024-01-15",
    expiryDate: "2027-01-15",
    status: "active",
  },
];

export const certificationApi = {
  getAll: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(certifications), 500);
    });
  },

  create: async (data) => {
    return new Promise((resolve) => {
      certifications.push({ id: Date.now(), ...data });
      resolve(data);
    });
  },
};