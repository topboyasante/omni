<script lang="ts">
    
</script>

<script lang=“ts” module>
    let showToast = $state(false)
    let toastTitle = $state('')
    let toastParagraph: string | undefined = $state('')

    interface ToastConfig {
        title: string 
        message?: string 
        duration?: number 
    }

    export function toast(config:ToastConfig) {
        toastTitle = config.title;
        toastParagraph = config.message;
        showToast = true;
        setTimeout(() => {
            showToast = false;
            toastTitle = '';
            toastParagraph = '';
        }, config.duration || 3000)
    }
</script>

<article class={["fixed bottom-8 min-w-[300px] transition-all right-8 bg-black z-[999] p-3 border rounded-md flex flex-col", showToast ? "translate-y-0" : "translate-y-[300%]"]}>
    <h6>{toastTitle}</h6>
    <p class="text-white">{toastParagraph}</p>
</article>