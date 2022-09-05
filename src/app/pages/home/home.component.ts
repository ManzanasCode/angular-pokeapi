import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../../services/poke-api.service'
import { PokemonList, Pokemon} from '../../models/PokemonList'
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pokemonArray: Pokemon[] = [];
  totalPokemons = 1154

  constructor(
    private pokemonAPI: PokeApiService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.cargarDatos()
  }

  async cargarDatos(){
    const limit = this.radomNumber(20,100)
    let dataWS = await firstValueFrom(this.pokemonAPI.getList(limit-20, limit)) as any;
    const listPokemon = dataWS.results
    let arrayData = []
    for await (const pokemon of listPokemon){
      const detalle = await firstValueFrom(this.pokemonAPI.getDetails(pokemon.name)) as any
      const typesData = detalle.types.map((typeData:any) => {return typeData.type.name })
      let insertData:Pokemon = detalle;
      insertData.types = typesData
      insertData.blobContainer = `../../../assets/blob${this.radomNumber(1,3)}.svg`
      arrayData.push(insertData)
    }
    this.pokemonArray = arrayData

  }
  
  radomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  showDetails(pokemon: Pokemon){
    this.router.navigate(['details', pokemon.name])
  }

  pruebasConsulta(){
    this.pokemonAPI.getList().subscribe({
      complete: () => { 
        console.log("complete")
      },
      next: (data) => {
        console.log("next: ", data)
      }
    });
  }


}
