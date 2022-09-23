// Đây là xử lý Nhâp xóa sửa User

// const userList = [{
//         name: "Đỗ Chí Hùng",
//         image: "/assets/images/1.jpg",
//         gmail: "dochihung492002@gmail.com",
//         work: {
//             title: "Kỹ sư phần mềm",
//             desc: "PHP/Laravel"
//         },
//         status: "Online",
//         role: "Owner"
//     },
//     {
//         name: "Đỗ Chí Quyền",
//         image: "/assets/images/2.jpg",
//         gmail: "quyen@gmail.com",
//         work: {
//             title: "Kỹ sư phần mềm",
//             desc: "PHP/Laravel"
//         },
//         status: "Online",
//         role: "Owner"
//     },
//     {
//         name: "Đỗ Chí Hùng 2",
//         image: "/assets/images/3.jpg",
//         gmail: "dochihung492002@gmail.com",
//         work: {
//             title: "Kỹ sư phần mềm",
//             desc: "PHP/Laravel"
//         },
//         status: "Online",
//         role: "Owner"
//     },
//     {
//         name: "Đỗ Chí Hùng 3",
//         image: "/assets/images/4.jpg",
//         gmail: "dochihung492002@gmail.com",
//         work: {
//             title: "Kỹ sư phần mềm",
//             desc: "PHP/Laravel"
//         },
//         status: "Online",
//         role: "Owner"
//     },
//     {
//         name: "Đỗ Chí Hùng 4",
//         image: "/assets/images/5.jpg",
//         gmail: "dochihung492002@gmail.com",
//         work: {
//             title: "Kỹ sư phần mềm",
//             desc: "PHP/Laravel"
//         },
//         status: "Online",
//         role: "Owner"
//     },
//     {
//         name: "Đỗ Chí Hùng 3",
//         image: "/assets/images/4.jpg",
//         gmail: "dochihung492002@gmail.com",
//         work: {
//             title: "Kỹ sư phần mềm",
//             desc: "PHP/Laravel"
//         },
//         status: "Online",
//         role: "Owner"
//     },
//     {
//         name: "Đỗ Chí Hùng 4",
//         image: "/assets/images/5.jpg",
//         gmail: "dochihung492002@gmail.com",
//         work: {
//             title: "Kỹ sư phần mềm",
//             desc: "PHP/Laravel"
//         },
//         status: "Online",
//         role: "Owner"
//     },
//     {
//         name: "Đỗ Chí Hùng 3",
//         image: "/assets/images/4.jpg",
//         gmail: "dochihung492002@gmail.com",
//         work: {
//             title: "Kỹ sư phần mềm",
//             desc: "PHP/Laravel"
//         },
//         status: "Online",
//         role: "Owner"
//     },
//     {
//         name: "Đỗ Chí Hùng 4",
//         image: "/assets/images/5.jpg",
//         gmail: "dochihung492002@gmail.com",
//         work: {
//             title: "Kỹ sư phần mềm",
//             desc: "PHP/Laravel"
//         },
//         status: "Online",
//         role: "Owner"
//     },
//     {
//         name: "Đỗ Chí Hùng 3",
//         image: "/assets/images/4.jpg",
//         gmail: "dochihung492002@gmail.com",
//         work: {
//             title: "Kỹ sư phần mềm",
//             desc: "PHP/Laravel"
//         },
//         status: "Online",
//         role: "Owner"
//     },
//     {
//         name: "Đỗ Chí Hùng 4",
//         image: "/assets/images/5.jpg",
//         gmail: "dochihung492002@gmail.com",
//         work: {
//             title: "Kỹ sư phần mềm",
//             desc: "PHP/Laravel"
//         },
//         status: "Online",
//         role: "Owner"
//     },
//     {
//         name: "Đỗ Chí Hùng 3",
//         image: "/assets/images/4.jpg",
//         gmail: "dochihung492002@gmail.com",
//         work: {
//             title: "Kỹ sư phần mềm",
//             desc: "PHP/Laravel"
//         },
//         status: "Online",
//         role: "Owner"
//     },
//     {
//         name: "Đỗ Chí Hùng 4",
//         image: "/assets/images/5.jpg",
//         gmail: "dochihung492002@gmail.com",
//         work: {
//             title: "Kỹ sư phần mềm",
//             desc: "PHP/Laravel"
//         },
//         status: "Online",
//         role: "Owner"
//     },
//     {
//         name: "Đỗ Chí Hùng 3",
//         image: "/assets/images/4.jpg",
//         gmail: "dochihung492002@gmail.com",
//         work: {
//             title: "Kỹ sư phần mềm",
//             desc: "PHP/Laravel"
//         },
//         status: "Online",
//         role: "Owner"
//     },
//     {
//         name: "Đỗ Chí Hùng 4",
//         image: "/assets/images/5.jpg",
//         gmail: "dochihung492002@gmail.com",
//         work: {
//             title: "Kỹ sư phần mềm",
//             desc: "PHP/Laravel"
//         },
//         status: "Online",
//         role: "Owner"
//     },
//     {
//         name: "Đỗ Chí Hùng 3",
//         image: "/assets/images/4.jpg",
//         gmail: "dochihung492002@gmail.com",
//         work: {
//             title: "Kỹ sư phần mềm",
//             desc: "PHP/Laravel"
//         },
//         status: "Online",
//         role: "Owner"
//     },
//     {
//         name: "Đỗ Chí Hùng 4",
//         image: "/assets/images/5.jpg",
//         gmail: "dochihung492002@gmail.com",
//         work: {
//             title: "Kỹ sư phần mềm",
//             desc: "PHP/Laravel"
//         },
//         status: "Online",
//         role: "Owner"
//     },
//     {
//         name: "Đỗ Chí Hùng 3",
//         image: "/assets/images/4.jpg",
//         gmail: "dochihung492002@gmail.com",
//         work: {
//             title: "Kỹ sư phần mềm",
//             desc: "PHP/Laravel"
//         },
//         status: "Online",
//         role: "Owner"
//     },
//     {
//         name: "Đỗ Chí Hùng 4",
//         image: "/assets/images/5.jpg",
//         gmail: "dochihung492002@gmail.com",
//         work: {
//             title: "Kỹ sư phần mềm",
//             desc: "PHP/Laravel"
//         },
//         status: "Online",
//         role: "Owner"
//     },
// ]
