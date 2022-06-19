<script>
  import Card from '$components/Card.svelte'
  import IconButton from '$components/IconButton.svelte'
  import { mdiAccountMultiple, mdiDelete, mdiPencil } from '@mdi/js'

  export let budget = undefined
  export let click = () => {}
  export let description = ''
  export let heading = ''
  export let editFn = () => {}
  export let delFn = () => {}
  export let shareFn = () => {}
  
</script>

  <Card>
    {#if budget}
    <div class="text-left h-20">
      <h3 class="font-semibold m-0 p-0 flex items-center justify-between">
        <a class="underline text-blue-700" href={`/budgets/${budget.id}`}>{heading}</a>
        <div class="flex gap-1">
          <IconButton path={mdiDelete} click={() => delFn(budget)} css="h-5 w-5 fill-red-500" />
          <IconButton path={mdiAccountMultiple} click={() => shareFn(budget)} css="h-5 w-5" />
          <IconButton path={mdiPencil} click={() => editFn(budget)} css="h-5 w-5" />
        </div>
      </h3>
      <div>{description}</div>
    </div>
    {:else if click}
      <button on:click={click} class="text-left h-20">
        <h3 class="font-semibold m-0 p-0">{heading}</h3>
        <div class="mt-2">{description}</div>
      </button>
    {/if}
  </Card>

