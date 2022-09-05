import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { PokemonList } from '../models/PokemonList'
import { Observable, firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private REST_API_SERVER = "https://pokeapi.co/api/v2";



  constructor(
    private httpClient: HttpClient,
  ) { }

  getList(offset: number = 0, limit: number = 20): Observable<PokemonList[]> {
    console.log("offset: ", offset)
    console.log("limit: ", limit)
    console.log(`${this.REST_API_SERVER}/pokemon/?offset=${offset}&limit=${limit}`)
    return this.httpClient.get<PokemonList[]>(`${this.REST_API_SERVER}/pokemon/?offset=${offset}&limit=${limit}`)
  }
  
  async getList2(offset: number = 0, limit: number = 20) {
    return this.httpClient.get<PokemonList[]>(`${this.REST_API_SERVER}/pokemon/?offset=${offset}&limit=${limit}`)
  }

  getDetails(name: String): Observable<PokemonList[]> {
    return this.httpClient.get<PokemonList[]>(`${this.REST_API_SERVER}/pokemon/${name}`);
  }
  
  getSpecies(idPokemon: number): Observable<PokemonList[]> {
    // https://pokeapi.co/api/v2/pokemon/pokemon-species/25/
    // https://pokeapi.co/api/v2/pokemon-species/25/
    //https://pokeapi.co/api/v2https://pokeapi.co/api/v2/pokemon-species/25/'
    return this.httpClient.get<PokemonList[]>(`${this.REST_API_SERVER}/pokemon-species/${idPokemon}/`);
  }

}
