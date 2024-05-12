// tests/unit/listStore.spec.js
import { describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { nextTick } from '@vue/test-utils'
import { useListStore } from '@/stores/listStore'

describe('ListStore', () => {
  let pinia
  let listStore
  let mockData

  beforeAll(() => {
    mockData = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ]
  })


  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
    listStore = useListStore()
  })


it('Data property is an array have an empty list initially', () => {
    expect(Array.isArray(listStore.list)).toBe(true)
    expect(listStore.list).toEqual([])
  })

  it('Getter should be an array and return an empty array or an array of objects', () => {
    expect(Array.isArray(listStore.itemList)).toBe(true)
    expect(listStore.itemList).toEqual([])
  })

  it('Updating the list data property also updates the itemList getter', async () => {
    listStore.updatedList(mockData)
    await nextTick()
    expect(listStore.list).toEqual(mockData)
    expect(listStore.itemList).toEqual(mockData)
  })

  it('Event is fired to fetch data and checks if updates data property', async () => {
    const mockGetListData = vi.spyOn(listStore, 'getLisData')
    const mockUpdatedList = vi.spyOn(listStore, 'updatedList')

    const event = vi.fn()
    listStore.('data-updated', event)

    const data = await listStore.getLisData()

    expect(mockGetListData).toHaveBeenCalled()
    expect(event).toHaveBeenCalled()
    expect(data).toEqual(mockData)
    expect(mockUpdatedList).toHaveBeenCalledWith(mockData)
    expect(listStore.list).toEqual(mockData)
  })
})