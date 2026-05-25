import { defineConfig } from "@tanstack/start/config";
import { vercel } from "@tanstack/start-vercel";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    preset: vercel(),
  },

  vite: {
    plugins: [
      react(),
      tsconfigPaths(),
    ],
  },

  tanstackStart: {
    server: {
      entry: "server",
    },
  },
});
