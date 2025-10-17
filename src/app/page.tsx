'use client';

import Container from "./components/container";
import Section from "./components/section";
import ParticulierForm from "./components/particulierform";
import EntrepriseForm from "./components/entrepriseform";
import Image from "next/image";
import ToggleButtons from "./components/togglebuttons";
import { motion } from "framer-motion";

import { useState } from 'react';

export default function Home() {
  const [selected, setSelected] = useState<'particulier' | 'entreprise'>('particulier');

  function handleToggle(value: 'particulier' | 'entreprise') {
    setSelected(value);
    console.log('Selected:', value);
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
        <nav className="w-full h-16 bg-[#1d3557] text-white">

            <Container className="flex items-center justify-between h-full">
              <div className="text-2xl font-bold cursor-pointer select-none hover:scale-[1.1] transition-all duration-200" 
              style={{ fontFamily: "var(--font-alfa)" }}>
                Media Graphics
              </div>

              <div className="flex items-center gap-8">

                <a
                  href="#devis"
                  className="px-4 py-2 text-sm font-black text-white bg-[#bf983c] hover:bg-[#a67f2d] hover:scale-[1.03] cursor-pointer rounded-md transition-all duration-200"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  DEMANDER UN DEVIS
                </a>
              </div>
            </Container>

        </nav>

        <main className="">

          {/* HERO SECTION */}
          <Section className="relative py-10 bg-no-repeat bg-right bg-contain">
            <Image
              src="/hero.png"
              alt="Hero illustration"
              width={800}
              height={800}
              className="absolute right-[-35%] top-[-30%] w-[1200px] h-auto object-contain pointer-events-none select-none hidden lg:block"
            />
            
            <Container className="flex flex-row justify-between">
              <div className="flex flex-col w-full lg:w-[50%] text-center lg:text-left items-center lg:items-start">

                <h1 className="text-6xl font-extrabold tracking-tighter leading-15" style={{ fontFamily: "var(--font-poppins"}}>
                  Vos impressions nettes, rapides et adaptes a vos besoins
                </h1>
                <p className="text-xl mt-3 w-[85%] lg:w-full">Bénéficiez d’un service d’impression efficace, précis et entièrement adapté à vos besoins professionnels ou personnels</p>
                <a
                  href="#devis"
                  className="mt-3 self-center lg:self-start px-8 py-3 text-2xl font-black text-white bg-[#bf983c] hover:bg-[#a67f2d] hover:scale-[1.03] cursor-pointer rounded-md transition-all duration-200 tracking-tighter border-2 border-black"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  DEMANDER UN DEVIS
                </a>

              </div>

            </Container>

            <div
              className="relative py-2 mt-13 text-white font-semibold"
              style={{ fontFamily: "var(--font-roboto)" }}
            >
              {/* Half-width background for large screens */}
              <div className="absolute top-0 left-0 w-1/2 h-full bg-[#1d3557] hidden lg:block" />

              {/* Full-width background for small screens */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-full bg-[#1d3557] lg:hidden" />

              {/* Content layer */}
              <Container
                className="flex flex-col relative text-xl py-3 items-center lg:items-start lg:text-left"
              > 
              <div>
                <p id="contact" className="text-2xl mb-1 scroll-mt-24">
                  Contactez-nous directement :
                </p>

                <div className="flex flex-row items-center font-normal gap-3">
                  <Image
                    src="/phone.svg"
                    alt="Phone icon"
                    width={25}
                    height={25}
                    className="w-7 h-7"
                  />
                  <p>01 42 06 90 02</p>
                </div>

                <div className="flex flex-row items-center font-normal gap-3">
                  <Image
                    src="/mail.svg"
                    alt="Mail icon"
                    width={25}
                    height={25}
                    className="w-6 h-6"
                  />
                  <p>media-graphic@outlook.fr</p>
                </div>
              </div>
              </Container>
            </div>

          </Section>
          
          {/* INFORMATION SECTION */}
          <Section className="bg-[#1d3557] py-35">
            <Container className="w-[70%]">
              <h1 id="services" className="text-5xl font-black text-white text-center scroll-mt-22" style={{ fontFamily: "var(--font-poppins)"}}>L'impression sur mesure</h1>
              <p className="text-2xl my-10 text-center text-white font-medium" style={{ fontFamily: "var(--font-)"}}>
                Chez Media Graphic, nous mettons notre savoir-faire au service de vos projets d'impression pour vous offrir des réalisations de qualité, adaptées à vos besoins. Nous accompagnons chaque client avec rigueur et créativité, que ce soit pour:
              </p>
              <ul className="text-white text-3xl font-semibold space-y-2 list-disc list-inside" style={{ fontFamily: "var(--font-roboto)" }}>
                <li>Impressions sur tous types de supports</li>
                <li>Affiches Impactantes</li>
                <li>Textiles sur mesure</li>
                <li>Carterie personnalisée</li>
                <li>Tout autre projet d'impression dont vous avez besoin</li>
                <li>Signalétique professionnelle</li>
              </ul>
              <div className="flex justify-center mt-10">
                <a
                  href="#devis"
                  className="px-10 py-3 text-3xl font-black text-white bg-[#bf983c] hover:bg-[#a67f2d] hover:scale-[1.03] cursor-pointer rounded-md transition-all duration-200 tracking-tighter"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  DEMANDER UN DEVIS
                </a>
              </div>
            </Container>
          </Section>

          {/* TRUST SECTION */}
          <Section className="py-35">
            <Container>
              <h1 className="text-5xl font-black text-black text-center" style={{ fontFamily: "var(--font-poppins)"}}>
                Des impressions qui sont
              </h1>

              <div className="mt-15 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

                <div className="flex flex-col items-center text-center">
                  <div className="relative h-32 w-32">
                    <Image src="/paper.png" alt="Rigoureuses" fill className="object-contain" />
                  </div>
                  <h1 className="mt-3 text-4xl font-black text-[#e2b959]" style={{ fontFamily: "var(--font-poppins)" }}>
                    RIGOUREUSES
                  </h1>
                  <p className="text-black font-bold">Nous veillons à chaque détail pour un rendu impeccable</p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="relative h-32 w-32">
                    <Image src="/lightning.png" alt="Rapides" fill className="object-contain" />
                  </div>
                  <h1 className="mt-3 text-4xl font-black text-[#e2b959]" style={{ fontFamily: "var(--font-poppins)" }}>
                    RAPIDES
                  </h1>
                  <p className="text-black font-bold">Des impressions livrées dans des délais record</p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="relative h-32 w-32">
                    <Image src="/speech.png" alt="Adaptées" fill className="object-contain" />
                  </div>
                  <h1 className="mt-3 text-4xl font-black text-[#e2b959]" style={{ fontFamily: "var(--font-poppins)" }}>
                    ADAPTÉES
                  </h1>
                  <p className="text-black font-bold">Des solutions d’impression sur mesure pour chaque besoin</p>
                </div>
              </div>
              
            </Container>
          </Section>

          {/* FORM SECTION */}
          <Section className="py-40">
            <Container>

              <h1 id="devis" className="text-5xl font-black text-black text-center scroll-mt-24" style={{ fontFamily: "var(--font-poppins)"}}>
                Demandez votre devis
              </h1>

              <div className="flex items-center justify-center mt-7">
                <ToggleButtons selected={selected} onClick={handleToggle}>
                  
                </ToggleButtons>
              </div>
              
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-10"
              >
                {selected === 'particulier' ? <ParticulierForm /> : <EntrepriseForm />}
              </motion.div>


            </Container>
          </Section>
        </main>

        {/* FOOTER */}
        <footer className="bg-black py-10">
          <Container className="px">
            <div className="mt-15 grid grid-cols-3 items-start text-white">

              {/* LEFT */}
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold cursor-pointer select-none hover:scale-[1.1] transition-all duration-200" 
                style={{ fontFamily: "var(--font-alfa)" }}>
                  Media Graphics
                </h1>
                <div className="flex flex-row items-center font-normal gap-3 mt-2" style={{ fontFamily: "var(--font-roboto)" }}>
                  <Image
                    src="/phone.svg"
                    alt="Phone icon"
                    width={25}
                    height={25}
                    className="w-7 h-7"
                  />
                  <p>01 42 06 90 02</p>
                </div>
                <div className="flex flex-row items-center font-normal gap-3">
                  <Image
                    src="/mail.svg"
                    alt="Phone icon"
                    width={25}
                    height={25}
                    className="w-6 h-5"
                  />
                  <p>media-graphic@outlook.fr</p>
                </div>
                <div className="flex flex-row items-center font-normal gap-3">
                  <Image
                    src="/home.svg"
                    alt="Phone icon"
                    width={25}
                    height={25}
                    className="w-6 h-5"
                  />
                  <p>3 rue des ardennes 75019 Paris</p>
                </div>
              </div>

              {/* MIDDLE */}
              <div className="w-full h-64 rounded-lg overflow-hidden shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.969502970936!2d2.383162715674502!3d48.88741387929061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66d9cc8f173cd%3A0x6a1b7a86dbd9b46f!2s3%20Rue%20des%20Ardennes%2C%2075019%20Paris%2C%20France!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
                  width="100%"
                  height="100%"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            
              
              {/* RIGHT */}
              <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col">
                  <h1 className="font-semibold text-xl" style={{ fontFamily: "var(--font-poppins)" }}>Liens Rapides</h1>
                    <a
                      href="#services"
                      className="underline underline-offset-4 decoration-2 decoration-[#bf983c] text-white hover:text-[#bf983c] hover:decoration-[#bf983c] transition-colors duration-200"
                    >
                      Services
                    </a>

                    <a
                      href="#devis"
                      className="underline underline-offset-4 decoration-2 decoration-[#bf983c] text-white hover:text-[#bf983c] hover:decoration-[#bf983c] transition-colors duration-200"
                    >
                      Faire un devis
                    </a>
                    <a
                      href="#contact"
                      className="underline underline-offset-4 decoration-2 decoration-[#bf983c] text-white hover:text-[#bf983c] hover:decoration-[#bf983c] transition-colors duration-200"
                    >
                      Contact
                    </a>

                </div>
              </div>


            </div>
          </Container>

        </footer>

    </div>
  );
}
