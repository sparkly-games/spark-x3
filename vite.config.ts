import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from 'fs';

const rewrites = {
  name: "api-index-rewrite",
  configureServer(server: any) {
    console.log("Rewrite plugin loaded");

    server.middlewares.use((req: any, _res: any, next: any) => {

      if (req.url) {
        const [path, query = ""] = req.url.split("?");

        if (path === "/api" || path === "/api/") {
          req.url = "/api/index.html" + (query ? "?" + query : "");
        }
      }

      next();
    });
  },
};

export default defineConfig({
  plugins: [
    rewrites,
    react(),
    tailwindcss(),
  ],
  server: {
    https: {
      key: fs.readFileSync("./localhost-key.pem"),
      cert: fs.readFileSync("./localhost.pem")
    }
  }
});