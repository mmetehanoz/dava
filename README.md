# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## Production deploy

1. `.env.production.example` dosyasını `.env.production` olarak kopyalayın.
2. Cloudflare Turnstile panelinden alınan site key değerini `VITE_TURNSTILE_SITE_KEY` alanına ekleyin.
3. GitHub Pages proje yolu için `VITE_BASE_PATH=/dava/`, özel domain kökü için `VITE_BASE_PATH=/` kullanın.
4. Canlıya almak için:

```bash
npm run deploy:prod
```

Sadece production build almak için:

```bash
npm run build:prod
```

Deploy öncesi lint kontrolünü de zorunlu yapmak isterseniz:

```bash
npm run deploy:prod -- --lint
```

Turnstile doğrulamasının güvenli olması için formdan gelen `turnstileToken` değeri backend tarafında Cloudflare Turnstile secret key ile doğrulanmalıdır.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
