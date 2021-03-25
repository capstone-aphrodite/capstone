set -e


function cleanup_at_exit {

  git checkout main


  git branch -D deploy
}
trap cleanup_at_exit EXIT


git checkout -b deploy


npm run build


git add -f build


git commit --allow-empty -m 'Deploying'


git push --force heroku deploy:main
