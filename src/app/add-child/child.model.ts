import { AddressModel } from "./address.model";
import { Book } from "./book.model";

export interface ChildModel {
    imagePath: string;
    fname: string;
    lname: string;
    nickName: string;
    ethnicity: string;
    nationality: string;
    idCard: string;
    bod: Date;
    parentName: string;
    grade: string;
    tel: string;
    address: AddressModel;
    book: Book;
}