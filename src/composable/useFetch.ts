

export const useFetch = async(url: string) => {

  const response = await fetch(url)
  const responseData = await response.json()

  return {
    data: responseData,
  }
}