import { IAddressModel } from "../add-child/address.model";
import { IBook } from "../add-child/book.model";

export interface IChild {
    id:number;
    image: string;
    fname: string;
    lname: string;
    nickName: string;
    ethnicity: string;
    nationality: string;
    idCard: string;
    bod: Date;
    grade:string;
    parentName: string;
    tel: string;
    address: IAddressModel;
    book: IBook;
}
