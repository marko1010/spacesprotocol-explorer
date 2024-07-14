<script lang="ts">
    import dayjs from 'dayjs';
    import LocalizedFormat from 'dayjs/plugin/localizedFormat';
    dayjs.extend(LocalizedFormat);

    export let data;
    console.log(data);
</script>

<div class="flex flex-col grow p-5 gap-5">
    <div class="flex gap-2 items-center mb-7">
        <h1 class="font-bold text-3xl">Transaction</h1> 
        <span class="top-1 relative text-zinc-500">#82a32724f91ca4899ad40df72fa8a53f265e2fab5948e4ab94263e61cf356d9d</span>
    </div>
    <div class="flex flex-wrap gap-3">
        <a href="/block/{data.blockHash}">
            <div class="flex flex-col grow bg-info hover:opacity-90 text-info-content rounded-xl p-4 shadow-lg shadow-black">
                <h2 class="text-lg font-bold">Block</h2>
                <span>{data.block.height}</span>
            </div>
        </a>
        <div class="flex flex-col grow bg-info text-info-content rounded-xl p-4 shadow-lg shadow-black">
            <h2 class="text-lg font-bold">Time</h2>
            <span>{dayjs.unix(data.block.time).format('lll')}</span>
        </div>
        <div class="flex flex-col grow bg-info text-info-content rounded-xl p-4 shadow-lg shadow-black">
            <h2 class="text-lg font-bold">Version</h2>
            <span>{data.version}</span>
        </div>
        <div class="flex flex-col grow bg-info text-info-content rounded-xl p-4 shadow-lg shadow-black">
            <h2 class="text-lg font-bold">Lock Time</h2>
            <span>{dayjs.unix(data.data.lock_time).format('lll')}</span>
        </div>
        <div class="flex flex-col grow bg-info text-info-content rounded-xl p-4 shadow-lg shadow-black">
            <h2 class="text-lg font-bold">Confirmations</h2>
            <span>{data.block.confirmations}</span>
        </div>
    </div>
    <div class="flex flex-wrap gap-5 mt-10">
        <div class="flex flex-col basis-full lg:basis-[45%] grow">
            <h2 class="text-2xl mb-5">Inputs</h2>
            <div class="flex flex-col gap-4 rounded-xl bg-base-200 p-5 shadow shadow-black">
                {#each data.data.vin as vin}
                    <div class="flex items-center">
                        <img src="/arrow-right.svg" alt="reveal" class="w-[16px] h-[16px] mr-4" />
                        <a href="{vin.previous_output.split(':')[0]}" class="link font-semibold">{vin.previous_output.slice(0,15)}...{vin.previous_output.slice(-15)}</a>
                        <!-- <span class="grow text-right font-semibold">35.00 XX</span> -->
                    </div>
                {/each}
            </div>
        </div>
        <div class="flex flex-col basis-full lg:basis-[45%] grow">
            <h2 class="text-2xl mb-5">Outputs</h2>
            <div class="flex flex-col gap-4 rounded-xl bg-base-200 p-5 shadow shadow-black">
              {#each data.spaceHistories as spaceHistory}
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
</div>