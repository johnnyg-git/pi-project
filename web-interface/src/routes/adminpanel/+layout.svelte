<script lang="ts">
    import { setContext } from 'svelte';

    let { children } = $props();
</script>

{@render children()}