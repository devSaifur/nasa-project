const API_URL = 'http://localhost:4000'

export async function getPlanets() {
  try {
    const res = await fetch(`${API_URL}/planets`)
    return await res.json()
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
    console.log('Something went wrong getting planets data')
  }
}
