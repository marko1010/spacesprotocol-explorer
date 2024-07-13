<script>
    import "../app.css";
</script>
<div class="shadow-lg mb-10 flex justify-center">
    <div class="container flex p-2 px-10 items-center gap-5">
      <a href='/' class="flex items-center">
        <img class="w-[50px]" src="/logo.png" alt="Spaces Protocol" />
        <h1 class="text-xl font-bold">Spaces Protocol</h1>
      </a>
      <label class="h-[40px] grow input input-bordered flex items-center gap-2">
          <input type="text" class="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70">
            <path
              fill-rule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clip-rule="evenodd" />
          </svg>
        </label>
        <a href='#' class="btn btn-ghost btn-sm">Find Spaces</a>
        <a href='#' class="btn btn-ghost btn-sm">Browse Portfolios</a>
        <a href='#' class="btn btn-ghost btn-sm">Explorer</a>
        <a href='#' class="btn btn-ghost btn-sm">Help</a>
        <a href='#' class="btn btn-primary btn-sm">Sign In</a>
    </div>
</div>
<div class="container mx-auto pb-10">
  <slot />
</div>