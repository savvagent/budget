<script context="module">
	import I18next from 'tiny-i18next';
	import translate from '$stores/translate';

	export async function load({ context, fetch, session, stuff }) {
		let lang;
		if (session.lang.includes('en')) lang = 'en';
		else if (session.lang.includes('de')) lang = 'de';
		else if (session.lang.includes('eo')) lang = 'eo';
		else if (session.lang.includes('es')) lang = 'es';
		else if (session.lang.includes('fr')) lang = 'fr';
		else if (session.lang.includes('it')) lang = 'it';
		else if (session.lang.includes('ko')) lang = 'ko';
		else if (session.lang.includes('nl')) lang = 'nl';
		else if (session.lang.includes('pl')) lang = 'pl';
		else if (session.lang.includes('pt')) lang = 'pt';
		else if (session.lang.includes('ru')) lang = 'ru';
		else if (session.lang.includes('sv')) lang = 'sv';
		else if (session.lang.includes('zh')) lang = 'zh';
		else lang = 'en';

		const { default: currentLang } = await import(`../locales/${lang}.js`);
		translate.set(new I18next(currentLang));

		return { props: { lang } };
	}
</script>

<script>
	import '../app.css';
  import NavPanel from '$components/NavPanel.svelte'
  import supabase from '$utils/supabase'
  import TopNav from '$components/TopNav.svelte'
  import user from '$stores/user'

  user.set(supabase.auth.user())

  supabase.auth.onAuthStateChange((_, session) => {
    user.set(session?.user)
  })

</script>


<section class="h-full overflow-hidden flex flex-col">
  <TopNav />
  {#if $user} 
    <div class="flex h-full">
      <NavPanel />
      <slot />
    </div>
  {:else }
    <slot />
  {/if}
</section>
