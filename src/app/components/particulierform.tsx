'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ChevronDown } from 'lucide-react';

interface ParticulierFormProps {
  className?: string;
}

export default function ParticulierForm({ className = '' }: ParticulierFormProps) {
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
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;
    const file = formData.get('file') as File | null;

    const newErrors: Record<string, string> = {};

    const start = Number(formData.get('timestamp'));
    if (Date.now() - start < 2000) {
      return new Response('Too fast – likely a bot.', { status: 400 });
    }

    // Bot filled boogey input form
    if (formData.get('nickname')) {
        return new Response('Bot detected', { status: 400 });
    }

    // --- Validation checks ---
    if (!name.trim()) newErrors.name = 'Veuillez entrer votre nom complet.';
    if (!email.includes('@')) newErrors.email = 'Veuillez entrer une adresse email valide.';
    if (phone.trim().length < 8) newErrors.phone = 'Le numéro de téléphone est trop court.';
    if (message.trim().length < 10) newErrors.message = 'Le message est trop court (10 caractères min).';
    if (selectedOptions.length === 0) newErrors.services = 'Veuillez sélectionner au moins un service.';
    if (file && file.size > 5 * 1024 * 1024)
      newErrors.file = 'Le fichier est trop volumineux (max 5 MB).';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setStatus('⚠️ Certains champs sont invalides.');
      return;
    }

    setStatus('Envoi en cours...');
    const res = await fetch('/api/send-email-particulier', {
      method: 'POST',
      body: formData,
    });

    setStatus(res.ok ? 'Message envoyé ! ✅' : 'Erreur lors de l’envoi ❌');
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
      
      {/* Honeypot */}
      <input
        type="text"
        name="nickname"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />
      {/* Timer */}
      <input type="hidden" name="timestamp" value={Date.now()} />
      {/* --- Name --- */}
      <div>


        <h1 className="font-black mb-1 text-sm sm:text-base md:text-lg">Prénom</h1>
        <input
          name="name"
          type="text"
          placeholder="Votre prénom et nom"
          className={`w-[100%] sm:w-[50%] border p-2 rounded text-sm sm:text-base md:text-lg placeholder:text-sm sm:placeholder:text-base md:placeholder:text-lg 
            ${errors.name ? 'border-red-500' : 'border-[#bf983c]'}`}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      {/* --- Email --- */}
      <div>
        <h1 className="font-black mb-1 text-sm sm:text-base md:text-lg">Email</h1>
        <input
          name="email"
          type="email"
          placeholder="Votre email"
          className={`w-[100%] sm:w-[50%] border p-2 rounded text-sm sm:text-base md:text-lg placeholder:text-sm sm:placeholder:text-base md:placeholder:text-lg 
            ${errors.email ? 'border-red-500' : 'border-[#bf983c]'}`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
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
        <h1 className="font-black mb-1 text-sm sm:text-base md:text-lg">Fichier (optionnel)</h1>
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
          Formats acceptés : PDF, JPG, PNG, DOCX — max 5 MB.
        </p>
      </div>

      {/* --- Services Dropdown --- */}
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

      {/* Hidden field for selected services */}
      <input type="hidden" name="services" value={selectedOptions.join(', ')} />

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

      {/* --- Submit Button --- */}
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
