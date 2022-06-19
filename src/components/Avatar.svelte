<script>
  import { goto } from '$app/navigation'
  import { writable } from 'svelte/store'
	import atSize from '$utils/atSize';
	import { breakpoint } from '$stores/breakpoint';
  import { mdiAccountCircle } from '@mdi/js'
  import IconButton from '$components/IconButton.svelte'
  import Modal, { ModalBody, ModalHeader, ModalFooter } from '$components/Modal/Modal.svelte'
  import { default as t } from '$stores/translate'
  import Button from '$components/Button.svelte'
  import { isEmpty } from '$utils/empty'
  import supabase from '$utils/supabase'

  const showModal = writable(true)

	export let css = '';
	export let size = 48;
	export let src;

  const clear = () => {
    showModal.set(false)
  }

  const logout = async () => {
    await supabase.auth.signOut()
    goto('/')
  }

	$: size = atSize($breakpoint, { default: 20, md: 36 });
</script>

<div class="mr-2 {css}">
	{#if src}
		<img class="rounded-full" {src} alt="avatar" height={size} width={size} />
	{:else}
    <IconButton click={() => showModal.set(true)} path={mdiAccountCircle} css="w-9 h-9" />
	{/if}
</div>

<Modal {showModal}>
  <ModalHeader>{$t('create_new_budget')}</ModalHeader>
  <ModalBody>
    <!-- <Input placeholder={$t('budget_name')} required bind:value={name}/>
    <Input placeholder={$t('budget_description')} required bind:value={description}/> -->
  </ModalBody>
  <ModalFooter css="flex gap-2">
    <!-- <Button click={createBudget} disabled={isEmpty(name) || isEmpty(description)} emphasis="primary">{$t('create_new_budget')}</Button> -->
    <Button click={clear} emphasis="link">{$t('cancel')}</Button>
    <Button emphasis="outline" click={logout} class="mr-3">{$t('sign_out')}</Button>
  </ModalFooter>
</Modal>
