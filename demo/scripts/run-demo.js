const {execSync} = require('child_process');
const path = require('path');
const fs = require('fs');

(async () => {
    const srcDir = path.join(__dirname, '../../src');
    const publicDir = path.join(__dirname, '../public');

// Fetch submodules from q
    execSync('bash build.sh', {cwd: srcDir, stdio: 'inherit'})

    await fs.promises.mkdir(publicDir).catch(err => {});
    await fs.promises.copyFile(path.join(srcDir, 'audio-processor.js'), path.join(publicDir, 'audio-processor.js'));
    await fs.promises.copyFile(path.join(srcDir, 'build', 'q_wasm.js'), path.join(publicDir, 'q_wasm.js'));

    execSync('npx webpack serve', {stdio: 'inherit'})
})();


