<script lang="ts">
    export let data;
</script>

<div class="flex flex-col justify-center">
    <h1 class="text-center text-3xl mb-10 font-semibold">Spaces</h1>
    <div class="p-4 border border-base-300 mb-10 rounded-2xl flex w-fit">
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
                        <div class="text-sm text-white group-hover:text-primary-content flex">
                            Bid: 
                            <span class="font-semibold ml-1">{space.history.filter(x => x.action == 'bid').pop()?.bid_amount}</span>
                            <span class="text-gray-500 group-hover:text-gray-900 font-semibold ml-1">SAT</span>
                        </div>
                    </div>
                    <div class="invisible group-hover:visible overflow-hidden absolute px-4 pb-4 rounded-b-3xl group-hover:bg-primary top-[88%] z-20 max-h-0  group-hover:max-h-[200px] flex flex-col text-primary-content w-[220px] left-[-1px]" style="transition: max-height .7s">
                        <span class="font-semibold">Bid history:</span>
                        <div class="grid grid-cols-2 w-fit ml-1 mt-1 text-sm">
                            {#each space.history.filter(x => x.action == 'bid') as bid}
                                <span class="group-hover:opacity-100 opacity-0 text-right mr-3">{bid.bid_amount}</span>
                                <span class="text-gray-900 font-semibold">SAT</span>
                            {/each}
                        </div>
                    </div>
                </div>
            </a>
        {/each}
    </div>
</div>