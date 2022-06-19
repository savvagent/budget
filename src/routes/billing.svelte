<script>
  import { browser } from '$app/env'
  import { goto } from '$app/navigation'
  import user from '$stores/user'

  $: if (browser && !$user) goto('/')
</script>