import mongoose from 'mongoose';

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: String,
  body: String,
  tags: [String], //문자열로 이루어진 배열
  publishedDate:{
    type:Date,
    default:Date.now, //현재 날짜 기본값 지정
  },
});

const Post = mongoose.model('Post', PostSchema); //모델 인스턴스 만들기 (스키마이름, 스키마 객체)
export default Post; //내보내기

//