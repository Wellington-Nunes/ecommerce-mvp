import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Bem-vindo ao ECOMMERCE-MVP</h1>
      <p>Encontre os melhores produtos com preços incríveis e entrega rápida</p>
      <Link href="/products">
        <button>Ver Produtos</button>
      </Link>
    </div>
  );
}
