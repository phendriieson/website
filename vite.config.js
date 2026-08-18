import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: change `base` to '/<your-repo-name>/' before deploying to GitHub Pages.
// e.g. if your repo is github.com/phendriieson/milsim-dossier, base should be '/milsim-dossier/'
export default defineConfig({
  plugins: [react()],
  base: '/milsim-dossier/',
})
