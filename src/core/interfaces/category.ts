interface IGeneralKeys {
    title: string,
    notification: number,
}

export interface ICategory extends IGeneralKeys {
    toggleBlock(): void,
}

export interface IItem {
    id: number,
    title: string,
    isDone: boolean
}

export interface ITitle extends IGeneralKeys {
    id: number,
    title: string,
    notification: number,
    items: IItem[]
}
