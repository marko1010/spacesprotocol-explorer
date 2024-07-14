
<script>
	import { page } from '$app/stores';
    console.log($page.error);
</script>

<h1 class="text-center text-xl">{$page.error.message}</h1>