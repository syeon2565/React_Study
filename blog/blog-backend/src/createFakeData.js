import Post from './models/post';

export default function createFakeData(){
  const posts = [...Array(40).keys()].map(i=>({
    title: `포스트 #${i}`,
    body:
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit sedf to eismod tem-
      por incideidunt ut labore at dolore magna aliqua. Ut dsahkdsa sa ahdlas qie;qfe qndsn`,
      tags: ['가짜', '데이터'],
  }));
  Post.insertMany(posts, (err,docs)=>{
    console.log(docs);
  });
}