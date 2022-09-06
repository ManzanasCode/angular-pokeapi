import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { PokeApiService } from '../../services/poke-api.service'
import { PokemonList, Pokemon} from '../../models/PokemonList'
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  namePokemon: string = "";
  pokemon: Pokemon = {
    name: "",
    sprites:{}
  }

  constructor(
    private pokemonAPI: PokeApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  async ngOnInit() {
    this.cargaDatos()
  }

  async cargaDatos(){
    this.namePokemon = this.activatedRoute.snapshot.paramMap.get('namePokemon') as any;
    const detailPokemon = await firstValueFrom(this.pokemonAPI.getDetails(this.namePokemon)) as any
    const species = await firstValueFrom(this.pokemonAPI.getSpecies(detailPokemon.id)) as any
    const typesData = detailPokemon.types.map((typeData:any) => {return typeData.type.name })
    const abilitesArray = detailPokemon.abilities.map((abilitie:any) => {return abilitie.name })

    this.pokemon = detailPokemon;
    this.pokemon.sprites = detailPokemon.sprites
    this.pokemon.types = typesData;
    this.pokemon.habitat = species.habitat.name;
    this.pokemon.abilites = abilitesArray;

    console.log("detailPokemon: ", detailPokemon)
    console.log("species: ", species)

    let descriptions = species.flavor_text_entries.map((data:any) => {
      return { label: data.flavor_text, language: data.language.name }
    }).filter( (data:any) =>  data.language == 'en' )

    this.pokemon.descriptions = descriptions.slice(0, 3)
  }

  close(){
    this.router.navigate([''])

  }

}
