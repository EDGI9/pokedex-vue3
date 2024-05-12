// tests/unit/pokemonStore.spec.js
import { describe, expect, it, beforeAll } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { nextTick } from '@vue/test-utils'
import { usePokemonStore } from '@/stores/pokemon'

describe('PokemonStore', () => {
  let pinia
  let pokemonStore
  let mockData

  beforeAll(() => {
    mockData = {
        id: 1,
        name: 'Bulbasaur',
        image: 'image.jpg',
        height: 6,
        weight: 75,
        tags: [
          {
            id: 1,
            name: 'Grass',
          },
          {
            id: 2,
            name: 'Poison',
          },
        ],
  
    }
  })

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
    pokemonStore = usePokemonStore()
  })

  /* it('Data property is an array and has an empty list initially', () => {
    expect(Array.isArray(pokemonStore.pokemons)).toBe(true)
    expect(pokemonStore.pokemons).toEqual([])
  })

  it('Getter should be an array and return an empty array or an array of objects', () => {
    expect(Array.isArray(pokemonStore.pokemonList)).toBe(true)
    expect(pokemonStore.pokemonList).toEqual([])
  })

  it('Updating the pokemons data property should also update the pokemonList getter', async () => {
    pokemonStore.updatePokemons(mockData)
    await nextTick()
    expect(pokemonStore.pokemonList).toEqual(mockData)
  })*/

  it('Event is fired to fetch data and checks if updates data property', async () => {
    const mockGetPokemonsData = vi.spyOn(pokemonStore, 'fetchPokemon')
    const mockUpdatePokemon = vi.spyOn(pokemonStore, 'updatePokemon')

    const event = vi.fn()
    pokemonStore.('pokemons-updated', event)

    const data = await pokemonStore.fetchPokemons()

    expect(mockGetPokemonsData).toHaveBeenCalled()
    expect(event).toHaveBeenCalled()
    expect(data).toEqual(mockData)
    expect(mockUpdatePokemon).toHaveBeenCalledWith(mockData)
    expect(pokemonStore.pokemon).toEqual(mockData)
  }) 
})