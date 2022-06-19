<script>
	import Icon from './Icon.svelte';
	import { default as t } from '$stores/translate';

	const noop = () => {};
	export let click = noop;
	export let containerCss = '';
	export let css = '';
	export let disabled = false;
	export let iconRef = null;
	export let img = null;
	export let keydown = noop;
	export let label = null;
	export let labelAsText = false;
	export let labelLeft = true;
	export let mousedown = noop;
	export let mouseout = noop;
	export let mouseover = noop;
	export let path = null;
	export let to = null;
	export let touchstart = noop;
</script>

{#if to}
	<a href={to} class="flex items-center justify-center outline-none {containerCss}">
		{#if labelAsText && !labelLeft}{$t(label)}{/if}
		<Icon {css} {disabled} {label} {iconRef} {img} {mouseout} {mouseover} {path} />
		{#if labelAsText && labelLeft}{$t(label)}{/if}
	</a>
{:else}
	<button
		on:click={click}
		on:keydown={keydown}
		on:mousedown={mousedown}
		on:touchstart={touchstart}
		class="flex items-center justify-center outline-none gap-2 {containerCss}"
	>
		{#if labelAsText && !labelLeft}{$t(label)}{/if}
		<Icon {css} {disabled} {label} {iconRef} {img} {mouseout} {mouseover} {path} />
		{#if labelAsText && labelLeft}{$t(label)}{/if}
	</button>
{/if}
