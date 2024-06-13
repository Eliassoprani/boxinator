import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
 base: "/",
 plugins: [react()],
 preview: {
  port: 8080,
  strictPort: true,
 },
 server: {
  port: 8080,
  strictPort: true,
  host: true,
  origin: "http://localhost:3000",    //docker="http://localhost:3000" local="http://localhost:8080" elias="http://0.0.0.0:8080"
 },
});