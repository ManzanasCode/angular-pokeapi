export interface PokemonList {
    name: string;
    url?: number;
}

export interface Pokemon extends PokemonList {
    id?: number;
    types?: string[];
    blobContainer?:string;
    sprites: {
        back_default?: string;
        back_female?: string;
        back_shiny?: string;
        back_shiny_female?: string
        front_default? : string;
        front_female? : string;
        front_shiny? : string;
        front_shiny_female? : string;
    } | any;
    descriptions?: DescriptionData[];
    habitat?:string;
    abilites?: string[]

}

export interface DescriptionData {
    label: string;
    language: string;
}
