import { memo } from "react";
import { Mail, PhoneCall, ShieldAlert, Briefcase } from "lucide-react";

/**
 * Displays workplace and emergency contact details.
 *
 * @param {{ profile: object }} props - Profile data.
 * @returns {JSX.Element} Contact card.
 */
const ContactCard = memo(function ContactCard({ profile }) {
  const contacts = [
    { label: "Work Email", value: profile.email, icon: <Mail size={16} /> },
    { label: "Personal Email", value: profile.personalEmail, icon: <Mail size={16} /> },
    { label: "Mobile Number", value: profile.phone, icon: <PhoneCall size={16} /> },
    { label: "Office Phone", value: profile.officePhone, icon: <Briefcase size={16} /> },
    { label: "Emergency Contact", value: profile.emergencyContact, icon: <ShieldAlert size={16} /> }
  ];

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-sky-50 p-2.5 text-sky-600 dark:bg-sky-950/30 dark:text-sky-400">
          <PhoneCall size={20} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Information</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Primary and emergency contacts</p>
        </div>
      </div>

      <div className="space-y-3">
        {contacts.map((contact) => (
          <div key={contact.label} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/70 px-4 py-3 dark:border-gray-700 dark:bg-gray-900/50">
            <div className="mt-0.5 rounded-lg bg-white p-2 text-gray-600 shadow-sm dark:bg-gray-800 dark:text-gray-300">
              {contact.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{contact.label}</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{contact.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default ContactCard;
