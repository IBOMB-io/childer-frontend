import { IAddressModel } from "./address.model";
import { IBook } from "./book.model";

export interface IChildModel {
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
    address: IAddressModel;
    book: IBook;
}