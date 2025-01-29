import {
  Database,
  Link,
  Mail,
  RefreshCcw,
  Rocket,
  UserRoundCheck,
} from "lucide-react";
import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <nav className="flex flex-row justify-start items-center w-full md:p-4 p-4  md:px-32 px-6 border-b-2 border-gray-600/30">
        <a href="https://shoorty.vercel.app/" target="_self">
          <h1 className="font-bold">Shoorty</h1>
        </a>
      </nav>
      <div className="flex flex-col items-center justify-start py-10 px-4  gap-4">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-3xl md:text-4xl font-bold">
            Terms and conditions
          </h1>
        </div>
        <h3 className="max-w-2xl h-full flex flex-col gap-5 mb-2 pb-4 border-b-2 border-b-gray-600/30">
          Introduction Welcome to Shoorty. By using our services, you agree to
          the terms and conditions described below. If you do not agree, please
          do not use our service.
        </h3>

        <ul className="max-w-2xl h-full flex flex-col gap-5">
          <li className="flex flex-col items-start gap-2">
            <div className="flex justify-center items-center gap-1">
              <Link
                className="text-blue-400 p-1 bg-blue-400/40 rounded-sm"
                size={22}
              />
              <span className="font-bold text-xl">Service Usage</span>
            </div>
            <p>
              Shoorty allows you to shorten URLs for easier use and sharing.
              Using Shoorty to link to illegal, malicious, or rights-infringing
              content is not allowed.
            </p>
          </li>
          <li className="flex flex-col items-start gap-2">
            <div className="flex justify-center items-center gap-1">
              <Mail
                className="text-indigo-400 p-1 bg-indigo-400/40 rounded-sm"
                size={22}
              />
              <span className="font-bold text-xl">Communications</span>
            </div>
            <p>
              We may send you emails with relevant information about Shoorty,
              including updates and news. You can unsubscribe at any time using
              the link provided in the emails.
            </p>
          </li>
          <li className="flex flex-col items-start gap-2">
            <div className="flex justify-center items-center gap-1">
              <RefreshCcw
                className="text-cyan-400 bg-cyan-400/40 rounded-sm p-1"
                size={22}
              />
              <span className="font-bold text-xl">Changes to Terms</span>
            </div>
            <p>
              We may update these terms at any time. We will notify you if there
              are significant changes.
            </p>
          </li>
          <li className="flex flex-col items-start gap-2">
            <div className="flex justify-center items-center gap-1">
              <UserRoundCheck
                className="text-purple-400 bg-purple-400/40 rounded-sm p-1"
                size={22}
              />
              <span className="font-bold text-xl">User Responsibility</span>
            </div>
            <p>
              You are responsible for the content you link to using Shoorty. We
              are not responsible for any misuse of shortened links.
            </p>
          </li>

          <li className="flex flex-col items-start gap-2">
            <div className="flex justify-center items-center gap-1">
              <Database
                className="text-pink-400 bg-pink-400/40 rounded-sm p-1"
                size={22}
              />
              <span className="font-bold text-xl">Data Collection</span>
            </div>
            <p>
              We may collect certain data to improve our service. This includes
              URLs, access statistics, and user preferences.
            </p>
          </li>
        </ul>

        <div className="mt-4 flex flex-row justify-center gap-2 items-center group cursor-default">
          <p>Thank you for choosing us and helping us to continue improving</p>
          <Rocket size={20} className="animate-color-change-rainbow" />
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
