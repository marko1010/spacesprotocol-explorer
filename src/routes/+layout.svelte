<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";
  import Spinner from "$lib/components/Spinner.svelte";
    import { onMount } from "svelte";
  let search = "";
  let timeout: any;
  let searching = false;
  let searchResults: any[] = [];
  let showSearchResults = false;
  let searchBar: any;

  function handleSearch(value: string) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(getResults, 250);
  }

  async function getResults() {
    if (search.length < 3) return;
    searching = true;
    showSearchResults = false;
    searchResults = await fetch("/api/search?q=" + search).then((x) => x.json());
    searching = false;
    showSearchResults = true;
  }

  onMount(() => {
    const handler = (e: any) => {
      if (!searchBar.contains(e.target) && showSearchResults) showSearchResults = false;
    };

    document.addEventListener("click", handler);

    return () => document.removeEventListener("click", handler);
  });
</script>

<div class="shadow-lg mb-10 flex justify-center">
  <div class="container flex p-2 px-10 items-center gap-5">
    <a href="/" class="flex items-center shrink-0">
      <img class="w-[50px] h-[50px]" src="/logo.png" alt="Spaces Protocol" />
      <h1 class="text-xl font-bold hidden lg:block">Spaces Protocol</h1>
    </a>
    <label bind:this={searchBar} class="h-[40px] grow input input-bordered !outline-none flex items-center gap-2 relative">
      <input on:focus={() => (showSearchResults = searchResults.length && search.length)} bind:value={search} on:input={(e) => handleSearch(e.target.value)} type="text" class="grow" placeholder="Search" />
      {#if searching || showSearchResults}
        <div class="text-sm text-gray-500 flex flex-col px-4 py-2 gap-1 bg-black border border-primary w-full absolute top-[calc(100%+5px)] left-0">
          {#if searching}
            <div class="flex p-1 py-2 items-center">
              <Spinner size={2.5} />
            </div>
          {:else if searchResults.length}
            {#each searchResults as result}
              <a class="p-1 hover:bg-gray-800" on:click={() => (showSearchResults = false)} href={`/space/${result.name}`}>{result.name}</a>
            {/each}
          {:else}
            No results
          {/if}
        </div>
      {/if} 

      {#if search.length}
        <svg on:click={() => { search = ''; showSearchResults = false; }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" class="cursor-pointer h-4 w-4 hover:opacity-100 opacity-70"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
      {/if}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70">
        <path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" />
      </svg>
    </label>
    <a href="/" class="btn {$page.url.pathname == '/' ? 'btn-primary' : 'btn-ghost'} btn-sm">Current Auctions</a>
    <a href="/upcoming" class="btn {$page.url.pathname == '/upcoming' ? 'btn-primary' : 'btn-ghost'} btn-sm">Upcoming</a>
    <a href="/past" class="btn {$page.url.pathname == '/past' ? 'btn-primary' : 'btn-ghost'} btn-sm">Past</a>
    <a href="/explorer" class="btn {$page.url.pathname == '/explorer' ? 'btn-primary' : 'btn-ghost'} btn-sm">Explorer</a>
    <a href="https://spacesprotocol.org" target="_blank" class="btn btn-ghost btn-sm">Help</a>
  </div>
</div>
<div class="container mx-auto pb-10">
  <slot />
</div>
