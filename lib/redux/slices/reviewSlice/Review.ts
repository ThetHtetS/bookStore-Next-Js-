import Book from "../bookSlice/book";


export default interface Review
{
    _id?:string,
    book:Book,
    rating?:string,
    review?:string,
}