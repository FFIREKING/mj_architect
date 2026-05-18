import express from 'express';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, 'dist');
const port = Number(process.env.PORT) || 3000;

if (!existsSync(path.join(distPath, 'index.html'))) {
  console.error('Missing dist/index.html — run: npm run build');
  process.exit(1);
}

const app = express();

app.use(express.static(distPath));

// SPA fallback (React Router) — any unmatched route gets index.html
app.use((_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`MJ Architect listening on port ${port}`);
});
