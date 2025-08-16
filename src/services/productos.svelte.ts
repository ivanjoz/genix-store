import { Env } from "../env";

const maxCacheTime = 60 * 5 // 2 segundos
const productosPromiseMap: Map<string,Promise<any>> = new Map()

export const productosService = (categoriasIDs?: number[]) => {
  // Initial dummy content
  let data = $state({
    productos: [],
    categorias: [],
    isLoading: true,
    error: null
  });
  const apiRoute = `p-productos-cms?categorias=${(categoriasIDs||[0]).join(".")}`

  // Effect to fetch data when the function is called
  $effect(() => {
    if(!productosPromiseMap.has(apiRoute)){
      const headers = new Headers()
      headers.append('Authorization', `Bearer 1`)
      
      productosPromiseMap.set(apiRoute, new Promise((resolve, reject) => {
        fetch(Env.makeRoute(apiRoute), { headers })
        .then(results => {
          return results.json()
        })
        .then(results => {
          console.log("productos obtenidos desde servidor:", results)
          results.updated = Math.floor(Date.now()/1000)
          resolve(results)
        })
        .catch(err => {
          reject(err)
        })
      }))
    }

    productosPromiseMap.get(apiRoute).then(results => {
      console.log("productos obtenidos::", results)

      data.productos = results.productos || []
      data.categorias = results.categorias || []
      data.isLoading = false
    })
  });

  return {
    get productos() { return data.productos; },
    get categorias() { return data.categorias; },
    get isLoading() { return data.isLoading; },
    get error() { return data.error; }
  };
}
