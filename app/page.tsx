import prisma from "@/lib/prisma";

// app/page.tsx

export default async function Home() {
  const users = await prisma.user.findMany();
  console.log("Prisma fetched users:", users); // this will log
  return <div>Hello world</div>;
}
