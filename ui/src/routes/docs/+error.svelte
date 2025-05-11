<script>
    import { page } from '$app/state';
    import Button from '$lib/components/button/button.svelte';
  </script>
  
  <main class="grid min-h-[70vh] place-items-center px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center">
      <p class="text-base font-semibold text-primary">
        {page?.error?.status || 'Error'}
      </p>
  
      <h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
        {page?.error?.message || 'Something went wrong'}
      </h1>
  
      <p class="mt-6 text-lg text-gray-500 sm:text-xl/8">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
  
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <a href="/">
          <Button class="bg-primary hover:bg-primary/75 ">
            Go back home
          </Button>
        </a>
  
        
      </div>
    </div>
  </main>
  