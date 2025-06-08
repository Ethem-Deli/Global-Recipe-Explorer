// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        outDir: 'build'  // <- This is what changes the output folder from 'dist' to 'build'
    }
})


//import { defineConfig } from 'vite';
//export default defineConfig({
//    base: '/Global-Recipe-Explorer/',
//});
//base: 'https://github.com/Ethem-Deli/Global-Recipe-Explorer',