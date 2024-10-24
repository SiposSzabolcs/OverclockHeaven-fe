const fs = require("fs");

// Get environment variables from the Render environment
const stripePublicKey = process.env.STRIPE_API_KEY;

// Template for the environment.prod.ts file
const envConfig = `
export const environment = {
  stripePublicKey: '${stripePublicKey}'
};
`;

fs.writeFileSync("src/environments/environment.ts", envConfig);
console.log("Environment configuration file generated successfully.");
