<script lang="ts">
    import dayjs from 'dayjs';
    import LocalizedFormat from 'dayjs/plugin/localizedFormat';
    dayjs.extend(LocalizedFormat);

    export let data;
</script>

<div class="flex flex-col grow p-5 gap-5">
    <div class="flex gap-2 items-center mb-7">
        <h1 class="font-bold text-3xl">Block</h1> 
        <span class="top-1 relative text-zinc-500">{data.hash}</span>
    </div>
    <div class="flex flex-wrap gap-3 mb-10">
        <div class="flex flex-col grow bg-primary text-success-content rounded-xl p-4 shadow-lg shadow-black">
            <h2 class="text-lg font-bold">Confirmations</h2>
            <span>{data.confirmations}</span>
        </div>
        <div class="flex flex-col grow bg-info text-info-content rounded-xl p-4 shadow-lg shadow-black">
            <h2 class="text-lg font-bold">Time</h2>
            <span>{dayjs.unix(data.time).format('lll')}</span>
        </div>
        <div class="flex flex-col grow bg-info text-info-content rounded-xl p-4 shadow-lg shadow-black">
            <h2 class="text-lg font-bold">Difficulty</h2>
            <span>{data.difficulty}</span>
        </div>
        <div class="flex flex-col grow bg-info text-info-content rounded-xl p-4 shadow-lg shadow-black">
            <h2 class="text-lg font-bold">Bits</h2>
            <span>{data.bits}</span>
        </div>
        <div class="flex flex-col grow bg-info text-info-content rounded-xl p-4 shadow-lg shadow-black">
            <h2 class="text-lg font-bold">Nonce</h2>
            <span>{data.nonce}</span>
        </div>
        <div class="flex flex-col grow bg-info text-info-content rounded-xl p-4 shadow-lg shadow-black">
            <h2 class="text-lg font-bold">Merkle Root</h2>
            <span>{data.merkleroot}</span>
        </div>
    </div>
    {#each data.transactions as tx}
        <div class="flex flex-wrap gap-5 bg-base-200 rounded-xl p-5 shado">
            <h1 class="w-full font-semibold">Tx # <a href='/tx/{tx.txid}' class="link link-secondary break-all">{tx.txid}</a></h1>
            <div class="flex flex-col basis-full lg:basis-[45%] grow">
                <h2 class="text-2xl mb-5">Inputs</h2>
                <div class="flex flex-col gap-4 rounded-xl bg-base-300 p-5">
                    {#each tx.data.vin ?? [] as vin}
                        <div class="flex items-center">
                            <img src="/arrow-right.svg" alt="reveal" class="w-[16px] h-[16px] mr-4" />
                            {#if vin.previous_output?.split(':')[0].replaceAll('0', '').length == 0}
                                <span class="font-semibold">Coinbase</span>
                            {:else}
                                <a href="/tx/{vin.previous_output.split(':')[0]}" class="link link-secondary font-semibold">{vin.previous_output}</a>
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>
            <div class="flex flex-col basis-full lg:basis-[45%] grow">
                <h2 class="text-2xl mb-5">Outputs</h2>
                <div class="flex flex-col gap-4 rounded-xl bg-base-300 p-5">
                    {#each tx.spaceHistories as spaceHistory}
                        <a href="/space/{spaceHistory.spaceName}">
                            <div class="flex items-center justify-between cursor-pointer hover:opacity-70">
                                <a href="/space/{spaceHistory.spaceName}" class="link link-primary font-semibold text-right">{spaceHistory.spaceName}</a>
                                <div class="flex justify-start items-center py-2 px-3 bg-neutral rounded-2xl gap-2 min-w-[110px] mr-2">
                                    <img src="/action/{spaceHistory.action}.svg" alt="reveal"  class="w-[20px] h-[20px]" />
                                    <span class="grow text-center">{spaceHistory.action[0].toUpperCase() + spaceHistory.action.slice(1)}{spaceHistory.action == 'reject' ? ` (${spaceHistory.meta.reason})` : ''}</span>
                                    </div>
                            </div>
                        </a>
                    {/each}
                </div>
            </div>
        </div>
    {/each}
</div>