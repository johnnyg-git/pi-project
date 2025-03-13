<script lang="ts">
    import {onMount, setContext} from "svelte";
     import { goto } from '$app/navigation';

    let username: string = $state("");
    let password: string = $state("");
    let error: string = $state("");

    onMount(() => {
        console.log("Page mounted");
    });

    async function login() {
        console.log("Logging in");

        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            goto('/adminpanel');
        } else {
            error = data.error;
            console.error("Failed to login");
        }
    }
</script>

<h1>Login Page</h1>
<input type="text" bind:value={username} placeholder="Username"/>
<input type="password" bind:value={password} placeholder="Password"/>
<form onsubmit={(event) => {
    event.preventDefault();
    login();
}}>
<button type="submit" >Login</button>
</form>

{#if error}
    <p>{error}</p>
{/if}

