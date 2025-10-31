'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ChevronDown } from 'lucide-react';

interface EntrepriseFormProps {
  className?: string;
}

export default function EntrepriseForm({ className = '' }: EntrepriseFormProps) {
  const [status, setStatus] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const services = [
    'Impression',
    'Carterie',
    'Signalitique',
    'Affiches',
    'Textiles',
    'Autre',
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);    


    const start = Number(formData.get('timestamp'));
    if (Date.now() - start < 2000) {
      return new Response('Too fast – likely a bot.', { status: 400 });
    }
    // Bot filled boogey input form
    if (formData.get('nickname')) {
        return new Response('Bot detected', { status: 400 });
    }

    setStatus(null);
    setErrors({});

    const company = formData.get('company') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;
    const file = formData.get('file') as File | null;

    const newErrors: Record<string, string> = {};

    // --- Basic Validation ---
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!company.trim()) newErrors.company = "Veuillez entrer le nom de l'entreprise.";
    if (!emailPattern.test(email)) newErrors.email = "Veuillez entrer une adresse email valide.";
    if (phone.trim().length < 8) newErrors.phone = "Le numéro de téléphone est trop court.";
    if (message.trim().length < 10) newErrors.message = "Le message est trop court (10 caractères min).";
    if (selectedOptions.length === 0)
      newErrors.services = "Veuillez sélectionner au moins un service.";

    // File validation (optional but size/type safe)
    if (!file || file.size === 0 || !file.name) {
      newErrors.file = 'Veuillez ajouter un fichier.';
    } else if (file.size > 5 * 1024 * 1024) {
      newErrors.file = 'Le fichier est trop volumineux (max 5 MB).';
    }


    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setStatus('⚠️ Certains champs sont invalides.');
      return;
    }

    setStatus('Envoi en cours...');
    const res = await fetch('/api/send-email-entreprise', {
      method: 'POST',
      body: formData,
    });

    setStatus(res.ok ? 'Message envoyé ! ✅' : "Erreur lors de l’envoi ❌");
  }

  function toggleOption(option: string) {
    setSelectedOptions(prev =>
      prev.includes(option)
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  }

  return (
    <form onSubmit={handleSubmit} className={twMerge('flex flex-col gap-4', className)}>
      {/* --- Company --- */}
      <div>
        <h1 className="font-black mb-1 text-sm sm:text-base md:text-lg">Nom de l&apos;entreprise</h1>
        <input
          name="company"
          type="text"
          placeholder="Votre entreprise"
          className={`w-[100%] sm:w-[50%] border p-2 rounded text-sm sm:text-base md:text-lg placeholder:text-sm sm:placeholder:text-base md:placeholder:text-lg 
            ${errors.company ? 'border-red-500' : 'border-[#bf983c]'}`}
        />
        {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
      </div>

      {/* --- Email --- */}
      <div>
        <h1 className="font-black mb-1 text-sm sm:text-base md:text-lg">Email professionnel</h1>
        <input
          name="email"
          type="text"
          placeholder="Votre email professionnel"
          className={`w-[100%] sm:w-[50%] border p-2 rounded text-sm sm:text-base md:text-lg placeholder:text-sm sm:placeholder:text-base md:placeholder:text-lg 
            ${errors.email ? 'border-red-500' : 'border-[#bf983c]'}`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      {/* --- TVA --- */}
      <div>
        <h1 className="font-black mb-1 text-sm sm:text-base md:text-lg">TVA intercommunautaire (Optionnel)</h1>
        <input
          name="tva"
          type="text"
          placeholder="TVA intercommunautaire"
          className="w-[100%] sm:w-[50%] border p-2 rounded border-[#bf983c] text-sm sm:text-base md:text-lg placeholder:text-sm sm:placeholder:text-base md:placeholder:text-lg"
        />
      </div>

      {/* --- Phone --- */}
      <div>
        <h1 className="font-black mb-1 text-sm sm:text-base md:text-lg">Numéro de téléphone</h1>
        <input
          name="phone"
          type="tel"
          placeholder="Votre numéro"
          className={`w-[100%] sm:w-[50%] border p-2 rounded text-sm sm:text-base md:text-lg placeholder:text-sm sm:placeholder:text-base md:placeholder:text-lg 
            ${errors.phone ? 'border-red-500' : 'border-[#bf983c]'}`}
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>

      {/* --- File Upload --- */}
      <div>
        <h1 className="font-black mb-1 text-sm sm:text-base md:text-lg">Fichier</h1>
        <input
          name="file"
          type="file"
          className={`w-[100%] sm:w-[50%] border p-2 rounded bg-white
                      file:mr-4 file:py-2 file:px-4 file:rounded file:border-0
                      file:text-sm sm:file:text-base md:file:text-lg file:font-semibold file:bg-[#bf983c] file:text-white
                      file:shadow-sm hover:file:shadow-md
                      hover:file:bg-[#a67f2d] cursor-pointer transition-all duration-200
                      file:cursor-pointer ${errors.file ? 'border-red-500' : 'border-[#bf983c]'}`}
        />
        {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file}</p>}
        <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-1">
          Formats acceptés : PDF, JPG, PNG, DOCX — max 5MB.
        </p>
      </div>

      {/* --- Dropdown --- */}
      <div className="relative w-[100%] sm:w-[50%]">
        <h1 className="font-black mb-1 text-sm sm:text-base md:text-lg">Choisissez le(s) service(s)</h1>

        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`border rounded bg-gray-100 p-2 flex justify-between items-center cursor-pointer select-none 
            ${errors.services ? 'border-red-500' : 'border-[#bf983c]'}`}
        >
          <span
            className={`transition-colors duration-200 flex flex-wrap items-center gap-1 text-sm sm:text-base md:text-lg ${
              selectedOptions.length > 0 ? 'text-[#bf983c] font-semibold' : 'text-gray-700'
            }`}
          >
            {selectedOptions.length > 0
              ? selectedOptions.map((option, i) => (
                  <span key={option} className="flex items-center">
                    <span>{option}</span>
                    {i < selectedOptions.length - 1 && (
                      <span className="text-black mx-1">;</span>
                    )}
                  </span>
                ))
              : 'Sélectionner un ou plusieurs services'}
          </span>

          <ChevronDown
            className={`transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-[#bf983c] rounded shadow-lg max-h-48 overflow-y-auto text-sm sm:text-base md:text-lg">
            {services.map(service => (
              <label
                key={service}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(service)}
                  onChange={() => toggleOption(service)}
                />
                <span>{service}</span>
              </label>
            ))}
          </div>
        )}
        {errors.services && <p className="text-red-500 text-xs mt-1">{errors.services}</p>}
      </div>

      {/* --- Message --- */}
      <div>
        <h1 className="font-black mb-1 text-sm sm:text-base md:text-lg">Message</h1>
        <textarea
          name="message"
          placeholder="Dites-nous en davantage et soyez le plus précis possible (quantité, délai, couleur, format, etc.)"
          className={`w-full border p-2 rounded resize-none text-sm sm:text-base md:text-lg placeholder:text-sm sm:placeholder:text-base md:placeholder:text-lg 
            ${errors.message ? 'border-red-500' : 'border-[#bf983c]'}`}
          rows={5}
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
      </div>

      {/* --- Submit --- */}
      <div>
        <button
          type="submit"
          className="w-[50%] sm:w-[40%] py-2 text-lg md:text-2xl font-black text-white bg-[#bf983c] hover:bg-[#a67f2d] hover:scale-[1.03] cursor-pointer rounded-md transition-all duration-200 tracking-tighter border-2 border-black"
        >
          Envoyer devis
        </button>
      </div>

      {status && <p className="text-sm mt-2">{status}</p>}
    </form>
  );
}
