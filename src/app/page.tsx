'use client';

import Container from "./components/container";
import Section from "./components/section";
import ParticulierForm from "./components/particulierform";
import EntrepriseForm from "./components/entrepriseform";
import Image from "next/image";
import ToggleButtons from "./components/togglebuttons";
import { motion, Variants, Transition } from "framer-motion";

import { useState } from 'react';

export default function Home() {
  const [selected, setSelected] = useState<'particulier' | 'entreprise'>('particulier');

  function handleToggle(value: 'particulier' | 'entreprise') {
    setSelected(value);
    console.log('Selected:', value);
  }

  // Define animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15, // delay between each child animation
      },
    },
  };


  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' satisfies Transition['ease'], // 👈 cast resolves strict type mismatch
      },
    },
  };


  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' satisfies Transition['ease'] },
    },
  };

  const columnVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' satisfies Transition['ease'] },
    },
  };

  async function testRateLimit() {
    console.log('🚀 Starting rate limit test...');

    for (let i = 1; i <= 5; i++) {
      try {
        const res = await fetch('/api/send-email-particulier', {
          method: 'POST',
          body: new FormData(), // empty form is fine for testing
        });

        const data = await res.json();

        if (res.status === 429) {
          console.warn(`⛔ Request ${i}: RATE LIMITED (${res.status})`, data);
        } else {
          console.log(`✅ Request ${i}: Success (${res.status})`, data);
        }
      } catch (err) {
        console.error(`❌ Request ${i}: Failed`, err);
      }
    }

    console.log('🏁 Test completed.');
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
        <nav className="w-full h-16 bg-[#1d3557] text-white">

            <Container className="flex items-center justify-center sm:justify-between h-full">
              <div className="text-2xl font-bold cursor-pointer select-none hover:scale-[1.1] transition-all duration-200" 
              style={{ fontFamily: "var(--font-alfa)" }}>
                Media Graphics
              </div>

              <div className="flex items-center gap-8">

                <a
                  href="#devis"
                  className="hidden sm:block px-4 py-2 text-sm font-black text-white bg-[#bf983c] hover:bg-[#a67f2d] hover:scale-[1.03] cursor-pointer rounded-md transition-all duration-200"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  DEMANDER UN DEVIS
                </a>
              </div>
            </Container>

        </nav>

        <main className="">

          <Section
            className="relative py-10 bg-[#B4E0FD] bg-no-repeat bg-contain bg-right
                      lg:bg-[url('/bigbg.png')] lg:bg-[length:100%_100%] lg:bg-right"
          >
            {/* Hero content */}
            <Container className="flex flex-col lg:flex-row items-center lg:justify-between">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="flex flex-col w-full lg:w-1/2 text-center lg:text-left items-center lg:items-start justify-center"
              >
                {/* Heading */}
                <motion.h1
                  className="text-3xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold tracking-tight 
                            leading-8 sm:leading-tight md:leading-tight lg:leading-[1.1]"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  Vos impressions nettes, rapides et adaptées à vos besoins
                </motion.h1>

                {/* Subtext */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
                  className="text-base sm:text-lg md:text-xl mt-4 w-[90%] md:w-[80%] lg:w-full leading-snug"
                >
                  Bénéficiez d&apos;un service d'impression efficace, précis et entièrement adapté à vos besoins professionnels ou personnels.
                </motion.p>

                {/* CTA */}
                <motion.a
                  href="#devis"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
                  className="mt-5 self-center lg:self-start px-6 md:px-8 py-2.5 md:py-3 text-lg md:text-2xl font-black text-white bg-[#bf983c] hover:bg-[#a67f2d] hover:scale-[1.03] cursor-pointer rounded-md transition-all duration-200 tracking-tighter border-2 border-black"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  DEMANDER UN DEVIS
                </motion.a>
              </motion.div>
            </Container>

            {/* Contact Section */}
            <div
              className="relative py-0 mt-10 text-white font-semibold"
              style={{ fontFamily: 'var(--font-roboto)' }}
            >
              {/* Background layers */}
              <div className="absolute top-0 left-0 w-1/2 h-full bg-[#1d3557] hidden lg:block" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] sm:w-[70%] h-full bg-[#1d3557] lg:hidden" />

              <div id="contact">
                <Container className="flex flex-col relative text-base sm:text-lg md:text-xl py-4 items-center lg:items-start lg:text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <p className="text-xl sm:text-2xl mb-2 scroll-mt-24">
                      Contactez-nous directement :
                    </p>

                    <div className="flex flex-row items-center font-normal gap-3">
                      <Image src="/phone.svg" alt="Phone icon" width={25} height={25} className="w-6 h-6 sm:w-7 sm:h-7" />
                      <p>01 42 06 90 02</p>
                    </div>

                    <div className="flex flex-row items-center font-normal gap-3 mt-2">
                      <Image src="/mail.svg" alt="Mail icon" width={25} height={25} className="w-5 h-5 sm:w-6 sm:h-6" />
                      <p>media-graphic@outlook.fr</p>
                    </div>
                  </motion.div>
                </Container>
              </div>
            </div>
          </Section>

            
          {/* INFORMATION SECTION */}
          <Section className="bg-[#1d3557] py-20 sm:py-35 overflow-hidden">
                <Container className="w-[90%] sm:w-[70%]">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }} // triggers once when 25% visible
                    className="flex flex-col items-center text-center"
                  >
                    <div id="services">
                      {/* Title */}
                      <motion.h1
                        variants={itemVariants}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white scroll-mt-22"
                        style={{ fontFamily: 'var(--font-poppins)' }}
                      >
                        L&apos;impression sur mesure
                      </motion.h1>
                    </div>

                    {/* Paragraph */}
                    <motion.p
                      variants={itemVariants}
                      className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl text-left sm:text-center my-10 mb-7 sm:mb-10  text-white font-medium max-w-[900px]"
                      style={{ fontFamily: 'var(--font-roboto)' }}
                    >
                      Chez Media Graphic, nous mettons notre savoir-faire au service de vos projets
                      d&apos;impression pour vous offrir des réalisations de qualité, adaptées à vos besoins.
                      Nous accompagnons chaque client avec rigueur et créativité, que ce soit pour :
                    </motion.p>

                    {/* List */}
                    <motion.ul
                      variants={containerVariants}
                      className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white font-semibold space-y-2 list-disc list-outside pl-6 text-left"
                      style={{ fontFamily: 'var(--font-roboto)' }}
                    >
                      <motion.li variants={itemVariants}>
                        Impressions sur tous types de supports
                      </motion.li>
                      <motion.li variants={itemVariants}>
                        Affiches impactantes
                      </motion.li>
                      <motion.li variants={itemVariants}>
                        Textiles sur mesure
                      </motion.li>
                      <motion.li variants={itemVariants}>
                        Carterie personnalisée
                      </motion.li>
                      <motion.li variants={itemVariants}>
                        Tout autre projet d&apos;impression dont vous avez besoin
                      </motion.li>
                      <motion.li variants={itemVariants}>
                        Signalétique professionnelle
                      </motion.li>
                    </motion.ul>


                    {/* Button */}
                    <motion.div variants={itemVariants} className="flex justify-center mt-10">
                      <a
                        href="#devis"
                        className="mt-3 sm:mt-0 px-6 md:px-8 py-2.5 md:py-3 text-lg md:text-2xl font-black text-white bg-[#bf983c] hover:bg-[#a67f2d] hover:scale-[1.03] cursor-pointer rounded-md transition-all duration-200 tracking-tighter border-2 border-black"
                        style={{ fontFamily: 'var(--font-poppins)' }}
                      >
                        
                        DEMANDER UN DEVIS
                      </a>
                    </motion.div>
                  </motion.div>
                </Container>
          </Section>

          {/* TRUST SECTION */}
          <Section className="py-20 sm:py-28 md:py-32 overflow-hidden">
            <Container>
              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-black text-center"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                Des impressions qui sont
              </motion.h1>

              {/* Card Grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                className="mt-10 sm:mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-12 md:gap-14 items-start"
              >
                {/* Card 1 */}
                <motion.div variants={cardVariants} className="flex flex-col items-center text-center px-4">
                  <div className="relative h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32">
                    <Image src="/paper.png" alt="Rigoureuses" fill className="object-contain" />
                  </div>
                  <h1
                    className="mt-4 text-2xl sm:text-3xl md:text-4xl font-black text-[#e2b959]"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    RIGOUREUSES
                  </h1>
                  <p className="mt-2 text-sm sm:text-base md:text-lg text-black font-semibold leading-snug max-w-[90%]">
                    Nous veillons à chaque détail pour un rendu impeccable
                  </p>
                </motion.div>

                {/* Card 2 */}
                <motion.div variants={cardVariants} className="flex flex-col items-center text-center px-4">
                  <div className="relative h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32">
                    <Image src="/lightning.png" alt="Rapides" fill className="object-contain" />
                  </div>
                  <h1
                    className="mt-4 text-2xl sm:text-3xl md:text-4xl font-black text-[#e2b959]"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    RAPIDES
                  </h1>
                  <p className="mt-2 text-sm sm:text-base md:text-lg text-black font-semibold leading-snug max-w-[90%]">
                    Des impressions livrées dans des délais record
                  </p>
                </motion.div>

                {/* Card 3 */}
                <motion.div variants={cardVariants} className="flex flex-col items-center text-center px-4">
                  <div className="relative h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32">
                    <Image src="/speech.png" alt="Adaptées" fill className="object-contain" />
                  </div>
                  <h1
                    className="mt-4 text-2xl sm:text-3xl md:text-4xl font-black text-[#e2b959]"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    ADAPTÉES
                  </h1>
                  <p className="mt-2 text-sm sm:text-base md:text-lg text-black font-semibold leading-snug max-w-[90%]">
                    Des solutions d’impression sur mesure pour chaque besoin
                  </p>
                </motion.div>
              </motion.div>
            </Container>
          </Section>

          {/* FORM SECTION */}
          <Section className="py-20 sm:py-28 md:py-36 lg:py-40 overflow-hidden">
            <Container>
              {/* Title */}
              <motion.h1
                id="devis"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-black text-center scroll-mt-24 px-4"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                Demandez votre devis
              </motion.h1>

              {/* Toggle buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
                className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8"
              >
                <ToggleButtons selected={selected} onClick={handleToggle} />
              </motion.div>

              {/* Animated form switch */}
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="mt-8 sm:mt-10 md:mt-12 lg:mt-14 px-4 sm:px-8 md:px-12"
              >
                {selected === 'particulier' ? (
                  <ParticulierForm />
                ) : (
                  <EntrepriseForm />
                )}
              </motion.div>
            </Container>
          </Section>

        </main>

        {/* FOOTER */}
        <footer className="bg-black py-10 overflow-hidden">
              <Container>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="mt-15 grid grid-cols-1 md:grid-cols-3 gap-10 items-start text-white"
                >
                  {/* LEFT */}
                  <motion.div variants={columnVariants} className="flex flex-col gap-1">
                    <h1
                      className="text-3xl font-bold cursor-pointer select-none hover:scale-[1.1] transition-all duration-200"
                      style={{ fontFamily: 'var(--font-alfa)' }}
                    >
                      Media Graphics
                    </h1>

                    <div
                      className="flex flex-row items-center font-normal gap-3 mt-2"
                      style={{ fontFamily: 'var(--font-roboto)' }}
                    >
                      <Image src="/phone.svg" alt="Phone icon" width={25} height={25} className="w-7 h-7" />
                      <p>01 42 06 90 02</p>
                    </div>

                    <div className="flex flex-row items-center font-normal gap-3">
                      <Image src="/mail.svg" alt="Mail icon" width={25} height={25} className="w-6 h-5" />
                      <p>media-graphic@outlook.fr</p>
                    </div>

                    <div className="flex flex-row items-center font-normal gap-3">
                      <Image src="/home.svg" alt="Home icon" width={25} height={25} className="w-6 h-5" />
                      <p>3 rue des Ardennes 75019 Paris</p>
                    </div>
                  </motion.div>

                  {/* MIDDLE (MAP) */}
                  <motion.div
                    variants={columnVariants}
                    className="w-full h-64 rounded-lg overflow-hidden shadow-md"
                  >
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.969502970936!2d2.383162715674502!3d48.88741387929061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66d9cc8f173cd%3A0x6a1b7a86dbd9b46f!2s3%20Rue%20des%20Ardennes%2C%2075019%20Paris%2C%20France!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
                      width="100%"
                      height="100%"
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </motion.div>

                  {/* RIGHT */}
                  <motion.div
                    variants={columnVariants}
                    className="flex flex-col sm:justify-center sm:items-center"
                  >
                    <div className="flex flex-col">
                      <h1
                        className="font-semibold text-xl mb-2"
                        style={{ fontFamily: 'var(--font-poppins)' }}
                      >
                        Liens Rapides
                      </h1>

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
                  </motion.div>
                </motion.div>
              </Container>
        </footer>

    </div>
  );
}
