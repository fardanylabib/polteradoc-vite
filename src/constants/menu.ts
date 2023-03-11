import { ROLE_MAHASISWA, ROLE_MANAGER } from "./common";

export const routes = {
    HOME:"home",
    MITRA:"mitra",
    STUDENT:"mahasiswa",
    ACTIVITY:"ojt",
    CONFIG:"config",
    LOGIN:"login",
    REGISTER:"register",
    PROFILE:"profile"
}

export const adminMenu = {
    menu: [
        {
            id:0,
            title: "Beranda",
            url: routes.HOME,
            icon: "HomeIcon",
            roles:[ROLE_MANAGER, ROLE_MAHASISWA],
        },
        {
            id:1,
            title: "Mitra",
            url: routes.MITRA,
            icon: "HomeModernIcon",
            expand: false,
            roles:[ROLE_MANAGER]
        },
        {
            id:2,
            title: "Mahasiswa",
            url: routes.STUDENT,
            icon: "UserGroupIcon",
            expand: false,
            roles:[ROLE_MANAGER]
        },
        {
            id:3,
            title: "On Job Training",
            url: routes.ACTIVITY,
            icon: "BriefcaseIcon",
            expand: false,
            roles:[ROLE_MANAGER, ROLE_MAHASISWA]
        },
        {
            id:4,
            title: "Pengaturan",
            url: routes.CONFIG,
            icon: "AdjustmentsHorizontalIcon",
            expand: false,
            roles:[ROLE_MANAGER],
            submenu:[]
        }
    ]
}