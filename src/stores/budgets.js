import { browser } from '$app/env'
import { writable } from 'svelte/store'
import { get, set } from 'idb-keyval'

const budgets = writable([])

if (browser) {
  get('budgets').then((buds) => {
    if (buds) budgets.set(buds)
  }).then(() => {
    budgets.subscribe((buds) => {
      if (browser && buds) set('budgets', buds)
    })
  })
}

export const addBudget = (budget) => {
  budgets.update((buds) => {
    buds.push(budget)
    return buds
  })
}

export const updateBudget = (budget) => {
  budgets.update((buds) => {
    const bud = buds.find((b) => b.id === budget.id)
    Object.assign(bud, budget)
    return buds
  })
}

export const delBudget = (budget) => {
  budgets.update((buds) => {
    return buds.filter((b) => b.id !== budget.id)
  })
}



export default budgets