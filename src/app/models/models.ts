interface Thumbnail {
    path: string,
    extension: string
}

export interface MarvelObject {
    id: number,
    name: string,
    description: string,
    modified: string,
    thumbnail: Thumbnail
}
