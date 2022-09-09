# Grouped Products for WooCommerce

This plugin allows products to be grouped together for easier display on the front-end of the store. 

## Development

To work with this plugin, you'll need to use Docker. Once it is installed clone the repository. Then you can get started with these commands.

```
npm install
npx wp-env start
npm start
```

The site will be available at http://localhost:8888 with the username: `admin` and password: `password`.

## Distribution

Once you're ready to create a distributable package use this command:

```
npm run build-zip
```

That will build a ZIP file that's ready to install as a WordPress plugin.