const { series, src, dest } = require("gulp");
const path = require('path');
const fs = require('fs');

const dist = path.join(__dirname, 'release', 'app', 'dist');

function clean(cb) {
  fs.rmSync(dist, { recursive: true, force: true });
  cb();
}

function build(cb) {
  return src('src/*.*')
    .pipe(dest(dist));
}

exports.build = series(clean, build);