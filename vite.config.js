import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import os from 'node:os';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  base: '/demo-3/',
  cacheDir: path.join(os.tmpdir(), 'vite-cache-romantic-storybook-demo3'),
  optimizeDeps: {
    include: ['react', 'react-dom', 'gsap', '@gsap/react', 'lucide-react', 'canvas-confetti'],
  },
});
