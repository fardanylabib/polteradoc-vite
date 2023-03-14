import { ISelectOptions } from "../models/common";
import { EnumLecturerPosition } from "../models/lecturer";

export const DEFAULT_LIMIT = 10;
export const MAX_LIMIT = 300;
export const SEARCH_DEBOUNCE_DELAY = 500;

export const TIMEOUT_TOAST_APPEAR = 300;
export const TIMEOUT_TOAST_DISAPPEAR = 4000;
export const TIMEOUT_TOAST_REMOVE = 4300;
export const TIME_API_REFRESH = 10000;

export const ROLE_MAHASISWA = "MAHASISWA";
export const ROLE_MANAGER = "MANAGER";
export const ID_TYPE_STUDENT_DEFAULT = "NRP";

export const semesterOptions:ISelectOptions[] = [1,2,3,4,5,6,7,8].map(s => ({label:`${s}`, value:`${s}`}));
export const idOptions:ISelectOptions[]=["NIDN", "NIP", "NIK", "NUP"].map(n => ({label:n, value:n}));
export const managerPositions:ISelectOptions[]=[
    EnumLecturerPosition.KOORDINATOR,
    EnumLecturerPosition.KETUA_PRODI,
    EnumLecturerPosition.KETUA_JURUSAN,
].map(p => ({label:p.split("_").join(" "), value:p}));