export type Credentials = {
    username : string,
    password : string
}


export class ProductType {
    static PHONE = new ProductType('Phone', 'PHONE')
    static LAPTOP = new ProductType('Laptop', 'LAPTOP')
    static GRAPHICS_CARD = new ProductType('Graphics card', 'GRAPHICS_CARD')
    static PROCESSOR = new ProductType('Processor', 'PROCESSOR')
    static TV = new ProductType('TV', 'TV')
    static MOUSE = new ProductType('Mouse', 'MOUSE')
    static ALL_TYPES = [ this.PHONE, this.LAPTOP, this.GRAPHICS_CARD, this.PROCESSOR, this.TV, this.MOUSE ]

    readonly title : string
    readonly name : string

    constructor(title : string, name : string) {
        this.title = title
        this.name = name
    }

    static getByTitle(title : string) {
        return this.ALL_TYPES.find(productType => productType.title == title) || this.PHONE
    }

    static getByName(name : string) {
        return this.ALL_TYPES.find(productType => productType.name == name) || this.PHONE
    }
}

export interface Product {
    id : number,
    name : string,
    description : string,
    photoBaseFilename : string,
    price : number,
    type : ProductType,
    averageRate : number,
    reviews : Review[]
}

export interface Review {
    id : number
    text : string,
    rate : number,
    likedUsernames : string[]
    authorUsername : string
}


export type Filters = {
    selectedProductTypes : ProductType[],
    minPrice : number,
    maxPrice : number
}


export interface CartItem {
    id : number,
    productId : number,
    count : number,
    price : number,
    name : string,
    photoBaseFilename : string
}