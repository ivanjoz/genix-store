import { Env } from "../env";
import { arrayToMapN } from "../functions/helpers";

const maxCacheTime = 60 * 5 // 2 segundos
const productosPromiseMap: Map<string, Promise<any>> = new Map()

export interface IProductoPropiedad {
  id: number, nm: string, ss: number
}

export interface IProductoPropiedades {
  ID: number, Nombre: string, Options: IProductoPropiedad[], Status: number
}

export interface IProductoImage {
  n: string /* Nombre del imagen */
  d: string /* descripcion de la imagen */
}

export interface IProducto {
  ID: number,
  Nombre: string
  Descripcion: string
  Precio?: number
  Descuento?: number
  PrecioFinal?: number
  ContentHTML?: string
  Propiedades?: IProductoPropiedades[]
  Peso?: number
  Volumen?: number
  SbnCantidad?: number
  SbnUnidad?: string
  SbnPrecio?: number
  SbnDescuento?: number
  SbnPreciFinal?: number
  Images?: IProductoImage[]
  Image?: IProductoImage
  CategoriasIDs?: number[]
  Stock?: { a /* almacen */: number, c /* cantidad */: number }[]
  ss: number
  upd: number
  _stock?: number
  _moneda?: string
}

export interface IProductoCategoria {
  ID: number,
  Descripcion: string,
  Nombre: string,
}

export const productosServiceState = $state({
  productos: [] as IProducto[],
  productosMap: new Map() as Map<number, IProducto>,
  categorias: [] as IProductoCategoria[],
  categoriasMap: new Map() as Map<number, IProductoCategoria>,
})

// Simple test version - productos.svelte.js
export function useProductosService(categoriasIDs?: number[]) {
  const apiRoute = `p-productos-cms?categorias=${(categoriasIDs || [0]).join(".")}`

  if (typeof window !== 'undefined') {
    if (!productosPromiseMap.has(apiRoute)) {
      const headers = new Headers()
      headers.append('Authorization', `Bearer 1`)

      productosPromiseMap.set(apiRoute, new Promise((resolve, reject) => {
        fetch(Env.makeRoute(apiRoute), { headers })
          .then(res => {
            return res.json()
          })
          .then(res => {
            console.log("productos obtenidos2:", res)
            for(const e of res.productos as IProducto[]){
              e.Image = (e.Images||[])[0] || { n: "" } as IProductoImage
            }

            res.productosMap = arrayToMapN(res.productos || [], 'ID')
            res.categoriasMap = arrayToMapN(res.categorias || [], 'ID')
            res.updated = Math.floor(Date.now() / 1000)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      }))
    }

    productosPromiseMap.get(apiRoute).then(res => {
      console.log("productos obtenidos 1::", res)
      productosServiceState.productos = res.productos || []
      productosServiceState.productosMap = res.productosMap || new Map()
      productosServiceState.categorias = res.categorias || []
      productosServiceState.categoriasMap = res.categoriasMap || new Map()
    })
  }

  return productosServiceState
}