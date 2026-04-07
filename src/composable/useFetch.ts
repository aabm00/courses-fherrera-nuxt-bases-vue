import { computed, onMounted, ref, watch } from "vue"

/**
 * if url is a plain string, the composable does not rerun on later 
 * changes.
 * The function reads pokemonId.value, which is reactive. When the value 
 * changes, the computed property reactiveUrl updates, which triggers 
 * the watch to call fetchData again with the new URL.
 * 
 * @param url 
 * @returns 
 */
export const useFetch = <T>(url: string | (() => string) ) => {

  const data = ref<T | null>(null)
  const hasError = ref(false)
  const error = ref<Error | null>(null)
  const isLoading = ref(true)

  // Cache
  const fetchCache = new Map<string, T>()

  /**
   * Computed is not limited to objects; it works with primitive 
   * results too, but only updates when the getter depends on reactive 
   * values.
   */
  const reactiveUrl = computed(() => {
    return typeof url === "function" ? url() : url 
  })

  onMounted(() => {
    fetchData()
  })

  watch(reactiveUrl, () => {
    fetchData()
  })

  async function fetchData() {

    if(fetchCache.has(reactiveUrl.value)) {
      data.value = fetchCache.get(reactiveUrl.value) as T
      return
    }

    isLoading.value = true
    error.value = null
    hasError.value = false

    try {
      const response = await fetch(reactiveUrl.value)
      const responseData = await response.json()
      data.value = responseData

      fetchCache.set(reactiveUrl.value, responseData)
      
    } catch (err) {
      hasError.value = true
      error.value = err as Error
      
    } finally {
      isLoading.value = false
    }
  }


  return {
    data,
    hasError,
    error,
    isLoading,
  }
}