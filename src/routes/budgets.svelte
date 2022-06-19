<script>
  import { writable } from 'svelte/store'
  import { browser } from '$app/env'
  import { goto } from '$app/navigation'
  import user from '$stores/user'
  import BudgetCard from '$components/BudgetCard.svelte'
  import { default as t } from '$stores/translate'
  import budgets, { addBudget, delBudget, updateBudget } from '$stores/budgets'
  import Modal, { ModalBody, ModalHeader, ModalFooter } from '$components/Modal/Modal.svelte'
  import Input from '$components/Input.svelte'
  import Button from '$components/Button.svelte'
  import { isEmpty } from '$utils/empty'
  import uuid from '$utils/uuid'

  let name
  let description
  let selectedBudget

  const showCreateBudgetModal = writable(false)
  const showEditBudgetModal = writable(false)
  const showDeleteBudgetModal = writable(false)

  const clear = () => {
    name = undefined
    description = undefined
    showCreateBudgetModal.set(false)
    showEditBudgetModal.set(false)
    showDeleteBudgetModal.set(false)
  }

  const editBudget = (budget) => {
    selectedBudget = budget
    name = budget.name
    description = budget.description
    showEditBudgetModal.set(true)
  }

  const createBudget = () => {
    const budget = {
      description,
      id: uuid(),
      name,
      ownerId: $user.id,
      updated: Date.now()
    }
    addBudget(budget)
    clear()
  }

  const showDeleteModal = (budget) => {
    selectedBudget = budget
    name = budget.name
    showDeleteBudgetModal.set(true)
  }

  const del = () => {
    delBudget(selectedBudget)
    clear()
  }

  const update = () => {
    updateBudget({...selectedBudget, ...{name, description, updated: Date.now()} })
    clear()
  }

  $: console.log(`$user`, $user)

  $: if (browser && !$user) goto('/')
</script>
<div>
  <div class="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4 gap-4">
    {#each $budgets as budget }
      <BudgetCard 
        budget={budget} 
        heading={budget.name} 
        description={budget.description} 
        editFn={editBudget}
        delFn={showDeleteModal}
         />
    {/each}
    <BudgetCard heading={$t('create_new_budget')} description={$t('creating_budget_easy')} click={() => showCreateBudgetModal.set(true)} />
  </div>
</div>
<Modal showModal={showCreateBudgetModal}>
  <ModalHeader>{$t('create_new_budget')}</ModalHeader>
  <ModalBody>
    <Input placeholder={$t('budget_name')} required bind:value={name}/>
    <Input placeholder={$t('budget_description')} required bind:value={description}/>
  </ModalBody>
  <ModalFooter css="flex gap-2">
    <Button click={createBudget} disabled={isEmpty(name) || isEmpty(description)} emphasis="primary">{$t('create_new_budget')}</Button>
    <Button click={clear} emphasis="link">{$t('cancel')}</Button>
  </ModalFooter>
</Modal>
<Modal showModal={showEditBudgetModal}>
  <ModalHeader>{$t('edit_budget')}</ModalHeader>
  <ModalBody>
    <Input placeholder={$t('budget_name')} required bind:value={name}/>
    <Input placeholder={$t('budget_description')} required bind:value={description}/>
  </ModalBody>
  <ModalFooter css="flex gap-2">
    <Button click={update} disabled={isEmpty(name) || isEmpty(description)} emphasis="primary">{$t('update_budget')}</Button>
    <Button click={clear} emphasis="link">{$t('cancel')}</Button>
  </ModalFooter>
</Modal>
<Modal showModal={showDeleteBudgetModal}>
  <ModalHeader>{$t('delete_budget')}</ModalHeader>
  <ModalBody>
    <p>{$t('delete_budget_warning', {name: name || ''})}</p>
  </ModalBody>
  <ModalFooter css="flex gap-2">
    <Button click={del} emphasis="danger">{$t('delete_budget')}</Button>
    <Button click={clear} emphasis="link">{$t('cancel')}</Button>
  </ModalFooter>
</Modal>

