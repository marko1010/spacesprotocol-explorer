<script lang="ts">
  import { decodeScriptPubKeyToTaprootAddress } from "$lib/utils.js";
  import dayjs from "dayjs";
  import LocalizedFormat from "dayjs/plugin/localizedFormat";
  import { PUBLIC_BTC_NETWORK } from "$env/static/public";
  import Countdown from "$lib/components/Countdown.svelte";
  import { page } from '$app/stores';
  dayjs.extend(LocalizedFormat);

  export let data;
  let space = data.space;
  let blockStats = data.blockStats;
  $: {
    if (data) {
      space = data.space;
      blockStats = data.blockStats;
    }
  }

  const highestBid = space.history?.filter((x) => x.action == "bid")?.[0]?.bid_amount;
  const numberOfBids = space.history?.filter((x) => x.action == "bid").length;
  const numberFormatter = new Intl.NumberFormat();
  const outpoint = space.history?.find((x) => !!x.meta.outpoint)?.meta?.outpoint;
  const currentOwner = space.history ? decodeScriptPubKeyToTaprootAddress(space.history?.find((x) => !!x.meta?.script_pubkey).meta?.script_pubkey, PUBLIC_BTC_NETWORK) : null;
  const currentBlockHeight = blockStats.blockHeight;

  let auctionHeader = "";
  if (space.status == "pre-auction") auctionHeader = "Auction";
  else if (space.status == "auction" && space.claimHeight > currentBlockHeight) {
    auctionHeader = "In Auction";
  } else auctionHeader = "Auction ended";

  const timeline = [
    {
      name: "Open",
      description: "Submit an open transaction to propose the space for auction.",
      done: true,
    },
    {
      name: "Pre-auction",
      description: "Top 10 highest-bid spaces advance to auctions daily.",
      done: space.status != "pre-auction",
      current: space.status == 'pre-auction'
    },
    {
      name: auctionHeader,
      done: (space.status == "auction" && space.claimHeight <= currentBlockHeight) || space.status == "registered",
      current: space.status == 'auction' && space.claimHeight > currentBlockHeight
    },
    {
      name: "Awaiting claim",
      description: "You still have time to outbid until winner claims.",
      done: space.status == "registered",
      current: space.status == 'auction' && space.claimHeight <= currentBlockHeight
    },
    {
      name: "Registered",
      description: "Space is registered",
      done: space.status == "registered",
      current: space.status == 'registered'
    },
  ];
</script>

{#if space.error}
  <h1 class='text-center text-3xl md:text-4xl text-[#ec8e32] mt-10 md:mt-20'>{$page.params.id}</h1>
  <h3 class='text-center text-md mt-5 leading-9'>This name is available. <br> You can open an auction for it, <a class='link text-[#ec8e32] text-nowrap' href='https://spacesprotocol.org/' target="_blank">learn more here.</a></h3>
{:else}
  <div class="py-5 px-10 md:px-20">
    <h1 class="text-4xl font-bold">{space.name}</h1>
  </div>
  <div class="px-2 md:px-10 mx-auto space-y-4 pb-10">
    <div class="flex flex-col md:flex-row p-5 gap-10 md:gap-5">
      <div class="order-2 md:order-none basis-1/3 flex flex-col gap-10">
        <nav class="bg-[#0b0d10] p-10 rounded-xl">
          <ol role="list" class="overflow-hidden">
            {#each timeline as event, idx}
              <li class="relative {idx < timeline.length - 1 ? 'pb-10' : ''}">
                {#if idx < timeline.length - 1}
                  <div class="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 {event.done ? 'bg-[#ec8e32]' : 'bg-gray-600'}"></div>
                {/if}
                <a href="#" class="group relative flex items-start">
                  <span class="flex h-9 items-center">
                    <span class="relative z-10 flex h-8 w-8 items-center justify-center rounded-full {event.done ? 'bg-[#ec8e32] group-hover:bg-orange-600' : `border-2 ${event.current ? 'border-[#ec8e32]' : 'border-gray-600 group-hover:border-gray-400'} bg-[#0b0d10]`}">
                        {#if event.done}
                          <svg class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="black">
                            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path>
                          </svg>
                        {:else}
                          <span class="h-2.5 w-2.5 rounded-full {event.current ? 'bg-[#ec8e32]' : 'bg-transparent group-hover:bg-gray-600'}"></span>
                        {/if}
                      </span>
                  </span>
                  <span class="ml-4 flex min-w-0 flex-col">
                    {#if event.name == 'Pre-auction' && event.current}
                      <span class="text-sm font-medium text-[#ec8e32]">
                        Pre-auction: You have <Countdown seconds={(145 - (currentBlockHeight % 145)) * 10 * 60} /> left
                      </span>
                    {:else if event.name == "In Auction"}
                      <span class="text-sm font-medium text-[#ec8e32]">
                        In Auction: You have <Countdown seconds={(space.claimHeight - currentBlockHeight) * 10 * 60} /> left
                      </span>
                    {:else}
                      <span class="text-sm font-medium">
                        {event.name}
                      </span>
                    {/if}
                    <span class="text-sm text-gray-500">
                      {#if event.name == "Auction"}
                        Auction starts in <Countdown seconds={(145 - (currentBlockHeight % 145)) * 10 * 60} />
                      {:else if event.name == "In Auction"}
                        Auction currently ongoing. You have <Countdown seconds={(space.claimHeight - currentBlockHeight) * 10 * 60} /> left to make bids.
                      {:else if event.name == "Auction ended"}
                        Auction ended <Countdown seconds={(currentBlockHeight - space.claimHeight) * 10 * 60} /> ago.
                      {:else}
                        {event.description}
                      {/if}
                    </span>
                  </span>
                </a>
              </li>
            {/each}
          </ol>
        </nav>
      </div>
      <div class="basis-2/3 flex flex-wrap content-baseline md:gap-4 px-4 md:px-12">
        <div class="w-full">
          <dl class="grid grid-cols-1 gap-x-8 gap-y-5 md:gap-y-16 lg:grid-cols-3">
            <div class="flex max-w-xs flex-col gap-y-2">
              <dt class="text-base leading-7 text-gray-500">Highest bid</dt>
              <dd class="order-first text-3xl font-semibold tracking-tight sm:text-4xl">
                {numberFormatter.format(highestBid)}<span class="text-sm ml-1">sats</span>
              </dd>
            </div>
            <div class="flex max-w-xs flex-col gap-y-2">
              <dt class="text-base leading-7 text-gray-500"># of bids</dt>
              <dd class="order-first text-3xl font-semibold tracking-tight sm:text-4xl">{numberOfBids}</dd>
            </div>

            {#if space.status == "auction" && space.claimHeight > currentBlockHeight || space.status == 'pre-auction'}
              <div class=" flex max-w-xs flex-col gap-y-2">
                <dt class="text-base leading-7 text-gray-500">Blocks left to bid</dt>
                <dd class="order-first text-3xl font-semibold tracking-tight sm:text-4xl">
                  {space.status == 'pre-auction' ? (145 - (currentBlockHeight % 145)) : space.claimHeight - currentBlockHeight}
                </dd>
              </div>
            {/if}
          </dl>
        </div>

        <div class="w-full mt-7 flex flex-col gap-1 space-y-12">
          <div>
            <ol class="m-0 space-y-2 text-gray-500">
              <li class="border-b border-b-gray-400 pb-2">
                <span class="text-sm">Current owner:</span> <a target="_blank" href="https://mempool.space/testnet/address/{currentOwner}" class="text-[#ec8e32] hover:text-orange-700 break-words">{currentOwner}</a>
              </li>
              <li class="border-b border-b-gray-400 pb-2">
                <span class="text-sm">Outpoint:</span>
                <a target="_blank" href="https://mempool.space/testnet/tx/{outpoint?.split(':')[0]}#vout={outpoint?.split(':')[1]}" class="text-[#ec8e32] hover:text-orange-700 break-words">{outpoint}</a>
              </li>
              <li>
                <span class="text-sm">Records:</span> <span class="text-sm text-gray-600">None</span>
              </li>
            </ol>
          </div>
          <div>
            <h1 class="text-md border-b border-gray-600 pb-1">Transaction History</h1>

            <table class="min-w-full">
              <thead class="text-gray-900">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"></th>
                  <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"></th>
                  <th scope="col" class="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"></th>
                </tr>
              </thead>
              <tbody>
                {#each space.history as event}
                  <tr>
                    <td class="hidden px-3 py-5 text-left text-sm text-gray-500 sm:table-cell">{event.action[0].toUpperCase() + event.action.slice(1)}</td>
                    <td class="hidden px-3 py-5 text-left text-gray-500 sm:table-cell">
                      <a href="#" class="text-[#ec8e32] hover:text-orange-700 flex flex-col">
                        <span>{event.txid.slice(0, 15)}...{event.txid.slice(-15)}</span>
                        <span class="text-gray-500 text-xs">{dayjs.unix(event.transaction.block.time).format("lll")}</span>
                      </a>
                    </td>
                    {#if event.bid_amount}
                      <td>{numberFormatter.format(event.bid_amount)} sats</td>
                    {/if}
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

