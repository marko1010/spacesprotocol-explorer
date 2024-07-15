<script lang="ts">
    import statusMeta from '$lib/statusMeta';
    import dayjs from 'dayjs';
    import LocalizedFormat from 'dayjs/plugin/localizedFormat';
    dayjs.extend(LocalizedFormat);

    export let data;
</script>

<div class="flex flex-col justify-center">
    <h1 class="text-center text-3xl mb-10 font-semibold">Spaces</h1>
    <div class="p-4 border border-base-300 mb-10 rounded-2xl flex w-fit hidden">
        <select class="select select-bordered">
            <option value="all">All</option>
            <option value="in-auction">Pre-auction</option>
            <option value="in-auction">In auction</option>
            <option value="registered">Registered</option>
        </select>
    </div>
    <div class="flex flex-wrap gap-3">
        {#each data.spaces as space}
            <a href={`/space/${space.name}`}>
                <div class="group hover:z-10 relative group flex flex-col py-7 gap-2 rounded-3xl border border-b-8 border-primary w-[220px] cursor-pointer text-primary hover:bg-primary hover:text-primary-content hover:sc1ale-110 bg-base-100 transition-transform duration-300">
                    <div class="px-4">
                        <span class="text-lg font-semibold tracking-wider ">{space.name}</span>
                        <div class="text-xs my-2 rounded-2xl bg-{statusMeta[space.status].color} text-white text-center w-fit px-2 font-semibold py-[2px]">{statusMeta[space.status].name}</div>
                        <div class="text-sm text-white group-hover:text-primary-content flex items-center">
                            Highest bid: 
                            <span class="font-semibold ml-1">{space.history.filter(x => x.action == 'bid').pop()?.bid_amount}</span>
                            <span class="text-gray-500 group-hover:text-gray-900 ml-1 text-xs relative top-[.5px]">SAT</span>
                        </div>
                    </div>
                    <div class="invisible group-hover:visible overflow-hidden absolute px-4 pb-4 rounded-b-3xl group-hover:bg-primary top-[88%] z-20 max-h-0  group-hover:max-h-[200px] flex flex-col text-primary-content w-[220px] left-[-1px]" style="transition: max-height .7s">
                        <span class="font-semibold text-sm mb-1">Bids:</span>
                        <div class="grid grid-cols-[auto_auto_1fr] w-full text-sm items-center">
                            {#each space.history.filter(x => x.action == 'bid') as bid}
                                <span class="group-hover:opacity-100 opacity-0 mr-[3px] font-semibold w-fit">{bid.bid_amount}</span>
                                <span class="text-gray-900 text-xs ml-[1px]">SAT</span>
                                <span class="text-xs text-right">{dayjs.unix(bid.transaction.block.time).format('MMM DD, hh:mm A')}</span>
                            {/each}
                        </div>
                    </div>
                </div>
            </a>
        {/each}
    </div>
</div>