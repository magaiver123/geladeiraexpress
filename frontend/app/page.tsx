"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

type Product = {
  id: number
  name: string
  price: number
  image: string
  description: string
}

const products: Product[] = [
  { id: 1, name: "Coca-Cola", price: 5.5, image: "/placeholder.svg", description: "Refrigerante 350ml" },
  { id: 2, name: "Água com Gás", price: 4.0, image: "/placeholder.svg", description: "Água mineral 500ml" },
  { id: 3, name: "Chocolate", price: 6.5, image: "/placeholder.svg", description: "Barra de chocolate 90g" },
  { id: 4, name: "Suco Natural", price: 7.0, image: "/placeholder.svg", description: "Suco de laranja 300ml" },
]

export default function Home() {
  const [loading, setLoading] = useState(false)

  const handleBuy = async (product: Product) => {
    try {
      setLoading(true)
      const response = await fetch("http://localhost:3001/create_preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: product.name, price: product.price }),
      })

      const data = await response.json()
      if (data && data.init_point) {
        window.location.href = data.init_point
      } else {
        alert("Erro ao processar a compra")
      }
    } catch (error) {
      console.error("Erro ao criar preferência:", error)
      alert("Erro ao processar a compra")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-blue-600">Geladeira Express</h1>
          </div>
          <p className="text-gray-600">Escolha seu produto e compre com facilidade</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">Produtos Disponíveis</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <Card key={product.id} className="transition-all hover:shadow-lg">
              <CardHeader className="p-0">
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <Image src={product.image} alt={product.name} width={200} height={200} className="object-cover" />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle>{product.name}</CardTitle>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="mt-2 text-2xl font-bold text-blue-600">R$ {product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => handleBuy(product)}
                  disabled={loading}
                >
                  {loading ? "Processando..." : "Comprar"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
