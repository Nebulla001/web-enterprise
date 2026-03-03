import "dotenv/config";
import { defineConfig } from "@prisma/config";

export default defineConfig({
  datasource: {
    db: {
      provider: "mysql",
      adapter: process.env.DATABASE_URL!, // gunakan adapter, bukan url
    },
  },
});
