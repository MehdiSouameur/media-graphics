'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ChevronDown } from 'lucide-react'; // 🡒 small arrow icon

interface EntrepriseFormProps {
  className?: string;
}

export default function EntrepriseForm({ className = '' }: EntrepriseFormProps) {
  const [status, setStatus] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

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
    setStatus('sending...');

    const formData = new FormData(e.currentTarget);
    const res = await fetch('/api/send-email-entreprise', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) setStatus('Message envoyé ! ✅');
    else setStatus('Erreur lors de l’envoi ❌');
  }

  function toggleOption(option: string) {
      setSelectedOptions(prev =>
      prev.includes(option)
          ? prev.filter(o => o !== option)
          : [...prev, option]
      );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={twMerge('flex flex-col gap-4', className)}
    >
      <div>
        <h1 className="font-black mb-1">Nom de l'entreprise</h1>
        <input
          name="company"
          type="text"
          placeholder="Votre entreprise"
          required
          className="w-[50%] border border-[#bf983c] p-2 rounded"
        />
      </div>

      <div>
        <h1 className="font-black mb-1">Email professionnel</h1>
        <input
          name="email"
          type="email"
          placeholder="Votre email professionnel"
          required
          className="w-[50%] border p-2 rounded border-[#bf983c]"
        />
      </div>

      <div>
        <h1 className="font-black mb-1">TVA intercommunautaire</h1>
        <input
          name="tva"
          type="text"
          placeholder="TVA intercommunautaire"
          className="w-[50%] border p-2 rounded border-[#bf983c]"
        />
      </div>

      <div>
        <h1 className="font-black mb-1">Numéro de téléphone</h1>
        <input
          name="phone"
          type="tel"
          placeholder="Votre numéro"
          required
          className="w-[50%] border p-2 rounded border-[#bf983c]"
        />
      </div>

      {/* Upload File */}
      <div>
        <h1 className="font-black mb-1">Fichier (optionnel)</h1>
        <input
          name="file"
          type="file"
          className="w-[50%] border p-2 rounded bg-white
                     file:mr-4 file:py-2 file:px-4 file:rounded file:border-0
                     file:text-sm file:font-semibold file:bg-[#bf983c] file:text-white
                     file:shadow-sm hover:file:shadow-md
                     hover:file:bg-[#a67f2d] cursor-pointer transition-all duration-200
                     file:cursor-pointer border-[#bf983c]"
        />
        <p className="text-sm text-gray-500 mt-1">
          Formats acceptés : PDF, JPG, PNG, DOCX, etc.
        </p>
      </div>

      {/* --- Custom Dropdown --- */}
      <div className="relative w-[50%]">
        <h1 className="font-black mb-1">Choisissez le(s) service(s)</h1>

        {/* Dropdown button */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="border border-[#bf983c] rounded bg-gray-100 p-2 flex justify-between items-center cursor-pointer select-none"
        >
            <span
            className={`transition-colors duration-200 flex flex-wrap items-center gap-1 ${
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

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-[#bf983c] rounded shadow-lg max-h-48 overflow-y-auto">
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
      </div>

      {/* Hidden field to include selected services in form data */}
      <input
        type="hidden"
        name="services"
        value={selectedOptions.join(', ')}
      />


      <div>
        <h1 className="font-black mb-1">Message</h1>
        <textarea
          name="message"
          placeholder="Dites-nous en davantage et soyez le plus précis possible (précisez la quantité, le délai, la couleur, le format, etc.)"
          required
          className="w-full border p-2 rounded resize-none border-[#bf983c]"
          rows={5}
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-[40%] py-2 text-3xl font-black text-white bg-[#bf983c] hover:bg-[#a67f2d] hover:scale-[1.03] cursor-pointer rounded-md transition-all duration-200 tracking-tighter border-2 border-black"
        >
          Envoyer devis
        </button>
      </div>

      {status && <p className="text-sm mt-2">{status}</p>}
    </form>
  );
}
