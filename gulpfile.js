const gulp = require('gulp');
const { series } = require('gulp');
const markdownToJSON = require('gulp-markdown-to-json');
const marked = require('marked');
const jsonConcat = require('gulp-json-concat');

marked.setOptions({
  pedantic: true,
  smartypants: true,
});

gulp.task('markdown', async () => {
  gulp.src('./src/posts/*.md').pipe(markdownToJSON(marked)).pipe(gulp.dest('./src/posts/build'));
});

gulp.task('combine', async () => {
  gulp
    .src('./src/posts/build/*.json')
    .pipe(jsonConcat('posts_db.json', (data) => Buffer.alloc(JSON.stringify(data))))
    .pipe(gulp.dest('./src/posts/build/json'));
});

gulp.task('build-posts', series('markdown', 'combine'));
