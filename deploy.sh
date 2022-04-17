set -e

npm run build

cd dist


git init
git add -A
git commit -m $1

git push 'xxxxxx'

cd -