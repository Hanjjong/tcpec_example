import { Tspec, TspecDocsMiddleware } from "tspec";
import express, { Request, Response, Router } from "express";


// tspec example
/** 도서 정보 */
interface Book {
  /** 도서 ID */
    id: number;
    /**
   * 도서명
   * @example 상수리 나무 아래
   */
    title: string;
    tags: Tag[];
}
type Tag = '로맨스' | '판타지';
//----------------------

interface Member {
    level: number;
    defaultGroupId: number;
    starredGroupId: number;
    groups : number[];
    img: string;
    msg:string;
    inOrOut : number;
    locate:string;
    location:string;
    signUpDate:string;
    evaling:number;
    createTime:Date;
    evalDate:Date;
    updateTime:Date;
}

export type MemberApiSpec = Tspec.DefineApiSpec<{
    tags: ['Member'],
    paths:{
        '/member/info' : {
            get: {
                summay :'멤버 조회',
                path : {id : number},
                responses: {200:Member},
            },
        },
    }
}>;

//tspec example
export type BookApiSpec = Tspec.DefineApiSpec<{
    tags: ['도서'],
    paths: {
    '/books/{id}': {
        get: {
        summary: '단일 도서 조회',
        path: { id: number },
        responses: { 200: Book },
    },
},
}
}>;

const getBookById = (req: Request<{ id: string }>, res: Response<Book>) => {
    res.json({
    id: +req.params.id,
    title: '상수리 나무 아래',
    tags: ['로맨스', '판타지'],
  });
}

const getMember = (req: Request<{ }>, res: Response<Member>) => {
    res.json({
        level: 4,
        defaultGroupId: 1,
        starredGroupId: 1,
        groups : [1, 2],
        img: "url",
        msg:"hello",
        inOrOut : 0,
        locate:"개포",
        location:"1층",
        signUpDate:"2310191930",
        evaling:0,
        createTime: new Date(),
        evalDate:new Date(),
        updateTime:new Date(),
    });
}

const router = Router().get('/books/:id', getBookById).get('member/info', getMember);

const initServer = async () => {
    const app = express();
    app.use(router);
    app.use('/docs', await TspecDocsMiddleware());
    app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`);
    });
}
initServer();