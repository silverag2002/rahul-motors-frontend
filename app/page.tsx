"use client";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-10">
      <div className="w-full max-w-md text-center flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="p-4">
          <Image
            src="/logo.png"
            alt="logo"
            width={100}
            height={100}
            className="object-contain"
          />
          <div className="text-gray-800 text-lg font-medium leading-relaxed">
            Rahul Motors
          </div>
        </div>

        {/* Message */}
        <div className="text-gray-800 text-lg font-medium leading-relaxed">
          Site development in progress
          <br />
          Reach out to us on
        </div>

        {/* QR Code */}
        <div className="w-48 h-48 relative">
          <Image
            src="/qr.jpeg"
            alt="QR Code"
            fill
            className="object-contain rounded-lg"
          />
        </div>

        <div className="text-gray-600 text-sm">
          Scan the QR to access our catalogue
        </div>

        {/* Buttons */}
        <div className="flex flex-col w-full gap-3 mt-2">
          {/* Call Button */}
          <button
            onClick={() => (window.location.href = "tel:+919038394734")}
            className="w-full bg-gray-900 text-white py-3 rounded-xl text-base font-medium flex items-center justify-center gap-2"
          >
            📞 Call Us
          </button>

          {/* WhatsApp Button */}
          <button
            onClick={() =>
              (window.location.href = `https://wa.me/919038394734`)
            }
            className="w-full bg-green-500 text-white py-3 rounded-xl text-base font-medium flex items-center justify-center gap-2"
          >
            <FaWhatsapp />
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
