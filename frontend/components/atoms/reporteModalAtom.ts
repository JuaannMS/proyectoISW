import {atom} from "recoil"

export interface reporteModalState {
    open: boolean;
    view: "reporte";
}

const defaultModalState: reporteModalState = {
    open: false,
    view: "reporte",
};

export const reporteModalState = atom<reporteModalState>({
    key: 'reporteModalState',
    default: defaultModalState
});