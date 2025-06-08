// vite.config.js
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
    base: '/Global-Recipe-Explorer/',  // 👈 This is the key fix
    build: {
        outDir: 'build'
    }
});

//1
//import { defineConfig } from 'vite';

//export default defineConfig({
//    build: {
//       outDir: 'build'
//    }
//});
//2
//import { defineConfig } from 'vite';
//export default defineConfig({
//    base: '/Global-Recipe-Explorer/',
//});
//base: 'https://github.com/Ethem-Deli/Global-Recipe-Explorer',