import Link from "next/link";

const services = [
  {
    title: "SaaS Geliştirme",
    description:
      "İhtiyaçlarınıza özel ölçeklenebilir SaaS uygulamaları tasarlayıp geliştiriyoruz.",
    href: "/hizmetler#saas-gelistirme",
  },
  {
    title: "Kurumsal Danışmanlık",
    description:
      "Dijital dönüşüm ve süreç iyileştirme için deneyimli ekibimizle yanınızdayız.",
    href: "/hizmetler#kurumsal-danismanlik",
  },
  {
    title: "Bulut & DevOps",
    description:
      "Bulut altyapısı ve otomasyonla hızlı, güvenilir dağıtımlar sağlayın.",
    href: "/hizmetler#bulut-devops",
  },
];

export default function Services() {
  return (
    <section className="py-24">
      <div className="container max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Hizmetlerimiz</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="p-6 rounded-lg bg-muted text-left flex flex-col"
            >
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground flex-1">
                {service.description}
              </p>
              <Link
                href={service.href}
                className="mt-4 text-primary hover:underline self-start"
              >
                Detaylar
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
