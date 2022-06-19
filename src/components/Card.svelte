<script>
	export let css = '';
	export let to = null;
</script>

<div class="border border-slate-300 p-4 h-auto drop-shadow-sm rounded-lg {css}">
	{#if to}
		<a href={to}>
			<slot />
		</a>
	{:else}
		<slot />
	{/if}
</div>
