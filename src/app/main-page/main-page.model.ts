// export class MainPage {
//     public id: number;
//     public imagePath: string;
//     public fname: string;
//     public lname: string
//     public grade: string;

//     constructor(id: number, imagePath: string, fname: string, lname: string, grade: string) {
//         this.id = id;
//         this.fname = fname;
//         this.lname = lname;
//         this.grade = grade;
//         this.imagePath = imagePath;
//     }

//     getFullname(): string {
//         return `${this.fname} ${this.lname}`;
//     }

//     getFname(): string {
//         return this.fname;
//     }

//     getLname(): string {
//         return this.lname;
//     }

//     getImagePath(): string {
//         return this.imagePath;
//     }

//     getId(): number {
//         return this.id;
//     }

//     getGrade(): string {
//         return this.grade;
//     }

// }

export interface IMainPage {
    id: number;
    imagePath: string;
    fname: string;
    lname: string
    grade: string;
}
