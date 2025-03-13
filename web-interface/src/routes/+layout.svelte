<script lang="ts">
    import "../app.css";
    import { setContext } from 'svelte';

    let { children } = $props();
</script>

{@render children()}