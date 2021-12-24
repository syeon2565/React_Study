# mongodb

# mongodb 실행
npm start
brew services start mongodb-community@4.4

# brew service로 열었을 떄 에러가 떴는데 못 고쳐서 강제로 db서버 열 때
sudo mongod --dbpath ~/data/db

# 서버 상태 확인 (에러 유무)
brew services list

# 에러 경로
cd /opt/homebrew/var/log/mongodb

cat mongo.log

# mongo 서버 프로세스 확인
ps -ef | grep mongo

# mongoose 모델 생성 

const Post = mongoose.model('Post', PostSchema); //모델 인스턴스 만들기 (스키마이름, 스키마 객체)

export default Post; //내보내기

ex) 스키마 이름 Post 일 시, 실제 데잍베이스 만드는 컬렉션 이름 Posts

원하는 컬렉션 이름이 있을 시 세번쨰 파라미터에 집어넣기