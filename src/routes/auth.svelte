<script>
  import { default as t } from '$stores/translate'
  import { mdiApple, mdiFacebook, mdiGithub, mdiGoogle, mdiTwitter } from '@mdi/js'
  import IconButton from '$components/IconButton.svelte'
  import supabase from '$utils/supabase'

  let signIn = true

  const authenticate = async (provider) => {
    if (signIn) {
      const { user, session, error } = await supabase.auth.signIn({provider})
      console.log(`user`, user)
      console.log(`session`, session)
      console.log(`error`, error)
    } else {
      const { user, session, error } = await supabase.auth.signUp({provider})
      console.log(`user`, user)
      console.log(`session`, session)
      console.log(`error`, error)
    }
  }
</script>

<section class="flex h-full items-center justify-center">
  <div class="border border-slate-300 p-4">
    <h1 class="text-center mb-3 text-xl">{$t('savvagent_budget')}</h1>
    <IconButton click={() => authenticate('apple')} path={mdiApple} css="h-8 w-8" label={signIn ? $t('sign_in_with_apple') : $t('sign_up_with_apple')} labelAsText />
    <IconButton click={() => authenticate('facebook')} path={mdiFacebook} css="h-8 w-8" label={signIn ? $t('sign_in_with_facebook') : $t('sign_up_with_facebook')} labelAsText />
    <IconButton click={() => authenticate('github')} path={mdiGithub} css="h-8 w-8" label={signIn ? $t('sign_in_with_github') : $t('sign_up_with_github')} labelAsText />
    <IconButton click={() => authenticate('google')} path={mdiGoogle} css="h-8 w-8" label={signIn ? $t('sign_in_with_google') : $t('sign_up_with_google')} labelAsText />
    <IconButton click={() => authenticate('twitter')} path={mdiTwitter} css="h-8 w-8" label={signIn ? $t('sign_in_with_twitter') : $t('sign_up_with_twitter')} labelAsText />
    {#if signIn}
      <p class="pt-2">
        {$t('not_a_customer')} <button on:click={() => signIn = !signIn} class="underline">
          {$t('try_for_free')}
        </button>
      </p>
    {:else}
      <p class="pt-2">
        {$t('already_have_an_account')} <button on:click={() => signIn = !signIn} class="underline">
          {$t('sign_in')}
        </button>
      </p>
    {/if}
  </div>
</section>