# mongodb

# mongodb 실행
npm start
brew serivces start mongodb-community@4.4

# brew service로 열었을 떄 에러가 떴는데 못 고쳐서 강제로 db서버 열 때
sudo mongod —dbpath ~/data/db

# 서버 상태 확인 (에러 유무)
brew services list

# 에러 경로
`cd /opt/homebrew/var/log/mongodb`

`cat mongo.log`

# mongo 서버 프로세스 확인
ps -ef | grep mongosudo mongod —dbpath ~/data/db