# BootPlate | An Awesome Bootstrap 5 Starter Kit

A zero configuration Bootstrap 5 Boilerplate bundled with modern tools and workflows for an efficient UI/UX development experience.

<table width="100%">
    <tbody>
    <tr>
        <td style="margin: 0; padding: 0;">
            A FOSS (Free &amp; Open Source Software) project. Developed &amp; Maintained by <a href="https://github.com/provineet">@provineet</a>.
        </td>
        <td align="center">
           <strong>Vineet Verma</strong>
        </td>
    </tr>
</tbody></table>

<br>

![Gulp + Webpack Frontend Boilerplate](./bootstrap-starter-kit.png)

<br>

### Built-in Support For:

-   Bootstrap 5.x, FontAwesome 5.x
-   SASS Compilation
-   CSS AutoPrefixer
-   JS Babel Transpilation (ES6 Presets)
-   Webpack 5 Script Bundling
-   Assets Minification (CSS, JS, Images)
-   Image Optimizer (JPEG, GIF, PNG and SVGs)
-   CSS Sprite Images
-   BrowserSync for a no-lag browser reload
-   Gulp Workflow

### Salient Features

-   All your source files will reside inside 'src' folder.
-   Write SCSS with 7-in-1 SASS Architecture Folder Structure (src/scss)
-   Option to transpile JS via Babel. Create individual JS files for each of your JS function inside 'src/js/scripts' folder and they all will be concatenated on the top of each other, creating a scripts.js file inside 'assets/js' folder.
-   Use WebPack instead, to write Node or ES6 module based JS and bundle it as scripts.bundle.js.
-   Create CSS Sprites by dumping all your individual images/icons inside 'src/sprites' folder. It will generate a sprite of these images and place a corresponding \_sprites.scss file inside 'src/scss/components' folder to use the sprites via CSS classes.
-   Generate a production distributable copy of your application via gulp build.
-   Generate a development distribution copy of your application via gulp devbuild.

## ⚙️ Installtion

It requires [nodejs](https://nodejs.org/en/) with [npm](https://www.npmjs.com/get-npm) and a global installation of [gulp 4.x](http://gulpjs.com/) on your development machine.

You can install NodeJs from [here](https://nodejs.org/en/download/).

Once Node is installed on your system, open your terminal and run:

```
npm install --global gulp gulp-cli
```

To check your gulp version run:

```
gulp --version

CLI version: 2.*.*
Local version: 4.*.*
```

## 🚀 Let's get you started quickly!

```
1. Clone this repo
git clone https://github.com/provineet/bootplate

2. cd into directory bootplate

3. Run `npm install`
   - to install all dependencies

4. Run `npm run serve`
   - to spin a development server, compile files and reload browser on file changes.

Happy Coding 👍
```

<br>

## ⚙️ Advanced Gulp Configurations

Edit gulpfile.config.js file inside gulpfile.js folder to manage your configs.

Gulpconfig.json file contains settings and variables used by the Gulp to perform the tasks.

### A few important settings that you might want to checkout:

<table class="table">
  <thead>
    <tr>
      <th>Setting</th>
      <th>Option Type</th>
      <th>Option Value</th>
      <th>Usage</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>MODE</td>
      <td>Boolean</td>
      <td>true/false</td>
      <td>Turn Development mode on and off</td>
    </tr>
    <tr>
      <td>COMPRESSION</td>
      <td>Boolean</td>
      <td>true/false</td>
      <td>Enable/Disable assets minification while compilation.</td>
    </tr>
    <tr>
    <td>browserSyncOptions.proxy</td>
    <td>String</td>
    <td>wpdev.local</td>
    <td>Your localhost development url.</td>
    </tr>
    <tr>
    <td>JSBUILD</td>
    <td>String</td>
    <td>webpack | concat</td>
    <td>Controls how your theme's custom JavaScript files will be compiled.</td>
    </tr>
  </tbody>
</table>

There are more options that can be tweaked inside gulpconfig.json feel free to check them out.

<br>

### MODE

Manage the development or production mode of your theme.

```
{
    MODE: String ("development|production")
}
```

### COMPRESSION

Enable or disable this setting to enable compression for your CSS & JS files.

```
{
    COMPRESSION: BOOLEAN (true|false)
}
```

### JSBUILD

Controls how your theme's custom JavaScript files will be compiled.

```
{
    JUSBUILD: String ("concat|webpack")
}
```

-   "webpack" lets you use ES6 modules style building with webpack. You can edit your webpack configuration using gulpfile.js/webpack.config.js file. Create all your custom modules in the modules directory found at src/js/modules and use them in src/js/scripts.bundle.js file. Output file name will be scripts.bundle.min.js.
-   With "concat" option all your scripts inside src/js/scripts directory will be concated with the src/js/scripts.js file. Output file name will be scripts.js.

<br>

## Work with ES6 / Node Modules via Webpack

Use available node modules via npm while writing your scripts using webpack.

You can create your custom modules inside src/js/modules and use them in src/js/scripts.bundle.js file. Make sure to set JSBUILD to webpack inside your gulpfile.config.js file.

`{ JUSBUILD: "webpack" } `

Manage your webpack configration via webpack.config.js inside gulpfile.js folder.

<br>

## Work with unbundled/plain JS with Babel Support

-   Create your individual JS functions files inside src/js/scripts folder.
-   You can these functions inside src/js/scripts.js file.
-   All the \*.js files inside src/js/scripts folder will be concatenated on the top of each other and finally concatenated with src/js/scripts.js file.
-   Concatenated file will then be transpiled by babel and placed inside assets/js/scripts.js.

Manage your babel config by editing babel.config.json file in the root of your application.

<br>

## List of available NPM Commands

<table class="table">
  <thead>
    <tr>
      <th>NPM Command</th>
      <th>Usage</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>npm run serve</td>
      <td>To compile your SCSS, JS, Minify Images and start a development server. Watch for changes in .js, .scss, .php files.</td>
    </tr>
    <tr>
      <td>npm run build</td>
      <td>Creats a production distributable folder of your theme.</td>
    </tr>
    <tr>
      <td>npm run devbuild</td>
      <td>Creats a development distributable folder of your theme. Along with yout PHP theme files this version contains all your src and gulpfile.js and other settings files.</td>
    </tr>
  </tbody>
</table>

<br>

## List of available Gulp Commands for advanced usage

<table class="table">
  <thead>
    <tr>
      <th>Gulp Command</th>
      <th>Usage</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>gulp serve</td>
      <td>To compile your SCSS, JS, Minify Images and start a development server. Watch for changes in .js, .scss, .php files.</td>
    </tr>
    <tr>
      <td>gulp build</td>
      <td>Creats a production distributable folder of your theme.</td>
    </tr>
    <tr>
      <td>gulp devbuild</td>
      <td>Creats a development distributable folder of your theme. Along with yout PHP theme files this version contains all your src and gulpfile.js and other settings files.</td>
    </tr>
    <tr>
      <td>gulp minify</td>
      <td>Minify all CSS and JS files inside assets folder.</td>
    </tr>
    <tr>
      <td>gulp scss</td>
      <td>Compiles your scss files to assets/css folder.</td>
    </tr>
    <tr>
      <td>gulp scripts</td>
      <td>Compiles your JS files to assets/js folder.</td>
    </tr>
  </tbody>
</table>

<br>
