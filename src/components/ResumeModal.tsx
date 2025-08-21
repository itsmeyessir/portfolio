"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ResumeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="bg-neutral-900 rounded-xl shadow-xl max-w-lg w-full p-8 relative text-left text-neutral-100"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white text-2xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>
            <div className="flex flex-col items-center mb-6">
              <img
                src="/profile.jpg"
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-neutral-800 mb-2"
              />
              <h2 className="text-2xl font-bold">Your Name</h2>
              <p className="text-neutral-400">Your Title / Profession</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Experience</h3>
              <ul className="list-disc list-inside text-neutral-300 space-y-1">
                <li>Job Title at Company (Year–Year)</li>
                <li>Another Job Title at Company (Year–Year)</li>
                {/* Add more experiences here */}
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Accomplishments</h3>
              <ul className="list-disc list-inside text-neutral-300 space-y-1">
                <li>Accomplishment 1</li>
                <li>Accomplishment 2</li>
                {/* Add more accomplishments here */}
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Education</h3>
              <ul className="list-disc list-inside text-neutral-300 space-y-1">
                <li>Degree, School (Year–Year)</li>
                {/* Add more education here */}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Skills</h3>
              <ul className="flex flex-wrap gap-2 text-neutral-300">
                <li className="bg-neutral-800 rounded px-2 py-1">Skill 1</li>
                <li className="bg-neutral-800 rounded px-2 py-1">Skill 2</li>
                {/* Add more skills here */}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
