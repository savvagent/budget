<script>
  import { page } from '$app/stores'
  import { mdiAccountKey, mdiBank, mdiCreditCard, mdiHome } from '@mdi/js'
  import { default as t } from '$stores/translate'
  import Icon from '$components/Icon.svelte'
  import atSize from '$utils/atSize';
	import { breakpoint } from '$stores/breakpoint';

  $: notMobile = !atSize($breakpoint, { default: true, md: false });

</script>

<div class="w-16 sm:w-1/5 md:w-1/4 pr-2 pt-3 pl-3 flex flex-col justify-between overflow-hidden">
  <div>
    <a class:active={$page.url.pathname==='/'} href="/" class="flex items-center gap-3 p-2">
      <Icon path={mdiHome} css="h-8 w-8" /> 
      {#if notMobile}{$t('home')}{/if}
    </a>
    <a class:active={$page.url.pathname==='/budgets'} href="/budgets" class="flex items-center gap-3 p-2">
      <Icon path={mdiBank} css="h-8 w-8" /> 
      {#if notMobile}{$t('budgets')}{/if}
    </a>
    <a class:active={$page.url.pathname==='/billing'} href="/billing" class="flex items-center gap-3 p-2">
      <Icon path={mdiCreditCard} css="h-8 w-8" /> 
      {#if notMobile}{$t('billing')}{/if}
    </a>
    <a class:active={$page.url.pathname==='/account'} href="/account" class="flex items-center gap-3 p-2">
      <Icon path={mdiAccountKey} css="h-8 w-8" /> 
      {#if notMobile}{$t('account')}{/if}
    </a>
  </div>
  {#if notMobile}
    <div class="text-sm">
      <p>&copy; Mentor Capital, LLC</p>
      <p><a href="/terms">{$t('terms_of_service')}</a></p>
      <p><a href="/policy">{$t('privacy_policy')}</a></p>
    </div>
  {/if}
</div>

<style>
  .active {
    @apply bg-blue-200;
  }
  
</style>