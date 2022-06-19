<script>
  import { goto } from '$app/navigation'
  import { mdiMenu } from '@mdi/js'
  import IconButton from '$components/IconButton.svelte'
  import { default as t } from '$stores/translate'
  import user from '$stores/user'
  import supabase from '$utils/supabase'

  const logout = async () => {
    await supabase.auth.signOut()
    goto('/')
  }

</script>

<section class="bg-blue-400 p-3 text-white flex align-middle justify-between">
  <div class="flex gap-4">
    <IconButton path={mdiMenu} css="h-6 w-6 fill-white" />
    <a href="/" class="text-lg">{$t('savvagent_budget')}</a>
  </div>
  {#if $user}
    <button on:click={logout} class="mr-3">{$t('sign_out')}</button>
  {:else}
    <a href="/auth" class="mr-3">{$t('sign_in')}</a>
  {/if}
</section>