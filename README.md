# progamesigner.com

The website source code for progamesigner.com.

## Getting Started

The site is built with [Hugo](http://gohugo.io/) extended. Styles go through Dart Sass and PostCSS, so a local build needs the `sass` binary in `PATH`.

```sh
npm ci
npm run deploy:watch  # Hugo dev server with drafts
npm run build         # production build into public/
npm run preview       # serve public/ with wrangler dev, no remote calls
```

## Deploying to Cloudflare

The site runs on Cloudflare Workers with static assets and no Worker script. `wrangler.jsonc` serves `public/`. The site has no Hugo 404 page, so unknown paths get Cloudflare's default 404 response.

GitHub Actions deploys the site with `.github/workflows/deploy.yaml`, which also pins the Hugo and Node.js versions. A push to `main` deploys to production. A push to any other branch uploads a preview version under an alias named after the branch, and the run summary shows its URL. The workflow needs the repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. The custom domain `progamesigner.com` is set under the Worker's Settings > Domains & Routes. `wrangler.jsonc` turns off the production `workers.dev` URL and keeps preview URLs on.

## Built With

* [Bulma](http://bulma.io/)
* [Cloudflare Workers](https://workers.cloudflare.com/)
* [cssnano](https://cssnano.co/)
* [Hugo](http://gohugo.io/)
* [PostCSS](https://postcss.org/)
* [Purgecss](https://www.purgecss.com/)
* [SASS](http://sass-lang.com/)
* [webpack](https://webpack.js.org/)
