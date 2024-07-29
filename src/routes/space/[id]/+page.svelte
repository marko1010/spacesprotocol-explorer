<script lang="ts">
    import statusMeta from '$lib/statusMeta.js';
    import dayjs from 'dayjs';
    import LocalizedFormat from 'dayjs/plugin/localizedFormat';
    dayjs.extend(LocalizedFormat);

    export let data;
    const firstBid = data.history.filter(x => x.action == 'bid')?.pop()?.bid_amount;
    const highestBid = data.history.filter(x => x.action == 'bid')?.[0]?.bid_amount;
</script>
<div class="flex p-5 gap-5">
    <div class="basis-1/3 flex flex-col gap-10 items-center">
        <div class="p-3 pl-4 w-[270px] h-[270px]  shadow-md shadow-primary border border-primary rounded-lg flex flex-col justify-between">
            <img class="w-[50px]" src="/logo.png" alt="Spaces Protocol" />
            <h1 class="text-4xl font-bold drop-shadow mb-2">{data.name}</h1>
        </div>
        <div class="flex flex-col p-4 bg-base-200 text-gray-400 rounded-xl gap-1 min-w-[350px] shadow-md border border-neutral">
            <div class="flex justify-between">
                <span>Owner:</span>
                <span>0x1234...5678</span>
            </div>
            <div class="flex justify-between">
                <span>Initial purchase price:</span>
                <span>{firstBid} SAT</span>
            </div>
            <div class="flex justify-between">
                <span>Highest bid received:</span>
                <span>{highestBid} SAT</span>
            </div>
            <div class="flex justify-between">
                <span>Price increase:</span>
                <span>{Math.round(highestBid/firstBid)}x</span>
            </div>
        </div>
    </div>
    <div class="basis-2/3 flex flex-wrap content-baseline gap-2">
        <div class="w-full flex flex-col gap-2 mb-3">
            <h1 class="text-2xl font-bold">{data.name}</h1>
            <p class="prose">
                {data.name} is a top level domain (TLD) secured by Spaces Protocol, a root namespace for a decentralized web. Spaces Protocol TLDs are open for anyone to register, transparent for anyone to audit, and extensible for uses from domain names to wallet names to usernames.
            </p>
        </div>
        <div class="basis-[45%] grow flex flex-col p-4 bg-base-200 text-gray-400 rounded-xl gap-1 shadow-md border border-neutral">
            <h1 class="text-xl font-bold">Top Bid</h1>
            <div class="flex items-center text-nowrap">
                <span>{highestBid} <span class="text-xs text-gray-500">SAT</span> ($110)</span>
                {#if ['pre-auction', 'auction'].includes(data.status)}
                    <button class="ml-3 btn btn-sm btn-accent">Bid Now</button>
                {/if}
            </div>
        </div>
        <div class="basis-[45%] grow flex flex-col p-4 bg-base-200 text-gray-400 rounded-xl gap-1 shadow-md border border-neutral">
            <h1 class="text-xl font-bold">Score</h1>
            <div>
                <span class="text-3xl text-accent font-extrabold">1580 </span><span class="text-gray-500 font-bold">points</span>
            </div>
        </div>
        <!-- <div class="basis-[60%] grow flex flex-col p-4 bg-base-200 text-gray-400 rounded-xl gap-1 shadow-md border border-neutral">
            <h1 class="text-xl font-bold">Tags</h1>
            <div class="mt-1 flex flex-wrap gap-1">
                <div class="badge py-4">german</div>
                <div class="badge py-4">common word</div>
                <div class="badge py-4">clean</div>
                <div class="badge py-4">first name</div>
            </div>
        </div>
        <div class="basis-[33%] grow flex flex-col p-4 bg-base-200 text-gray-400 rounded-xl gap-1 shadow-md border border-neutral">
            <h1 class="text-xl font-bold">Rating</h1>
            <div>
                <span class="text-2xl text-primary font-extrabold">Legendary</span>
            </div>
        </div> -->

        <div class="basis-[23%] grow flex flex-col p-4 bg-base-200 text-gray-400 rounded-xl gap-1 shadow-md border border-neutral">
            <h1 class="text-xl font-bold">Status</h1>
            <div class="mt-1 text-sm rounded-2xl bg-{statusMeta[data.status].color} text-white text-center w-fit px-4 font-semibold py-[2px]">{statusMeta[data.status].name}</div>
        </div>
        <div class="basis-[23%] grow flex flex-col p-4 bg-base-200 text-gray-400 rounded-xl gap-1 shadow-md border border-neutral">
            <h1 class="text-xl font-bold">Hash</h1>
            <span>0x1234...5678</span>
        </div>
        <div class="basis-[23%] grow flex flex-col p-4 bg-base-200 text-gray-400 rounded-xl gap-1 shadow-md border border-neutral">
            <h1 class="text-xl font-bold">Claimed</h1>
            <span>No</span>
        </div>
        <div class="basis-[23%] grow flex flex-col p-4 bg-base-200 text-gray-400 rounded-xl gap-1 shadow-md border border-neutral">
            <h1 class="text-xl font-bold">Renewals</h1>
            <span>1</span>
        </div>
        <div class="basis-[23%] grow flex flex-col p-4 bg-base-200 text-gray-400 rounded-xl gap-1 shadow-md border border-neutral">
            <h1 class="text-xl font-bold">Expired</h1>
            <span>No</span>
        </div>
        <div class="basis-[23%] grow flex flex-col p-4 bg-base-200 text-gray-400 rounded-xl gap-1 shadow-md border border-neutral">
            <h1 class="text-xl font-bold text-nowrap">In Transfer</h1>
            <span>No</span>
        </div>
        {#if data.status == 'registered'}
            <div class="basis-[23%] grow flex flex-col p-4 bg-base-200 text-gray-400 rounded-xl gap-1 shadow-md border border-neutral">
                <h1 class="text-xl font-bold">Expiry block</h1>
                <span>{data.history.findLast(x => x.action == 'transfer').meta.covenant.expire_height}</span>
            </div>
        {/if}
        <div class="basis-[23%] grow flex flex-col p-4 bg-base-200 text-gray-400 rounded-xl gap-1 shadow-md border border-neutral">
            <h1 class="text-xl font-bold">Expires on</h1>
            <span>October 14, 2024</span>
        </div>
        <div class="w-full mt-7 flex flex-col gap-4">
            <h1 class="text-xl ml-1">Root Zone Records</h1>
            <div class="grow flex flex-col p-4 bg-base-200 text-gray-400 rounded-xl gap-2 shadow-md border border-neutral ">
                <div class="flex gap-10 hover:bg-base-100">
                    <span class="w-[70px] font-bold">GLUE4</span>
                    <div class="flex flex-col gap-1 font-mono">
                        <span>ns1.kohl.</span>
                        <span>44.231.6.183</span>
                    </div>
                </div>
                <div class="flex gap-10 hover:bg-base-100">
                    <span class="w-[70px] font-bold">NS</span>
                    <div class="flex flex-col gap-1 font-mono">
                        <span>ns1.kohl.</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full mt-7 flex flex-col gap-1">
            <h1 class="text-xl ml-1 mb-4">Transaction History</h1>
            {#each data.history as event}
                <a href="/tx/{event.txid}">
                    <div class="grow flex items-center p-4 bg-base-200 hover:bg-base-300 hover:scale-[101%] transition-transform text-gray-400 rounded-xl gap-2 shadow-md border border-neutral ">
                        <div class="flex justify-start items-center py-2 px-3 bg-neutral rounded-2xl gap-2 w-[110px] mr-2">
                            <img src="/action/{event.action}.svg" alt="reveal"  class="w-[20px] h-[20px]" />
                            <span class="grow text-center">{event.action[0].toUpperCase() + event.action.slice(1)}</span>
                        </div>
                        <div class="flex flex-col">
                            <span class="">{event.txid.slice(0,10)}...{event.txid.slice(-10)}</span>
                            <span class="text-sm text-gray-500">{dayjs.unix(event.transaction.block.time).format('lll')}</span>
                        </div>
                        <span class="grow text-primary text-end font-semibold">{event.bid_amount ? `${event.bid_amount} SAT` : ""}</span>
                    </div>
                </a>
            {/each}
        </div>
    </div>
</div>