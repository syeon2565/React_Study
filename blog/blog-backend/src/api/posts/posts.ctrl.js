import Post from '../../models/post';
import mongoose from 'mongoose';

const {ObjectId} = mongoose.Types;

export const checkObjectId = (ctx, next) =>{
    const {id}=ctx.params;
    if(!ObjectId.isValid(id)){
        ctx.status = 400;
        return;
    }
    return next;
}

export const wirte = async ctx => {
    const { title, body, tags } = ctx.request.body;
    const post = new Post({
        title,
        body,
        tags,
    });
    try {
        await post.save(); //save 함수를 실행시켜야 db에 저장
        ctx.body = post;
    } catch (e) {
        ctx.throw(500,e);
    }
};

export const list = async ctx => {
    try {
        const posts = await Post.find().exec();
        ctx.body = posts;
    } catch (e) {
        ctx.throw(500, e);
    }
};

export const read = async ctx => {
    const { id } = ctx.params;
    try {
        const post = await Post.findById(id).exec();
        if(!post) {
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    } catch (e) {
        ctx.throw(500, e);
    }
};

export const remove = async ctx => {
     const { id } = ctx.params;
     try {
         await Post.findByIdAndRemove(id).exec();
         ctx.status = 204; // No constent (성공은 했지만 응답할 데이터 X)
     } catch (e) {
         ctx.throw(500, e);
     }
};

export const update = async ctx => {
    const { id } = ctx.params;
    try { 
        const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
            new: true, //업데이트 된 데이터 반환
            // false 이면? 업데이트 되기 전 데이터 반환
        }).exec();
        if(!post){
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    } catch(e) {
        ctx.throw(500, e);
    }
};