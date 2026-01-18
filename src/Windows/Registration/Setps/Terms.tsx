import type { RegistrationStepProps } from "../registrationSteps";
import { ArrowBigLeft } from "lucide-react";

const TermsAndConditions = () => {
  return (
    <div className="text-xl leading-relaxed text-gray-800 space-y-4">
      <h2 className=" font-extrabold">Terms & Conditions</h2>

      <p>
        This application is created strictly for <strong>educational and demonstration purposes</strong>.
        The goal of this project is to showcase frontend and backend engineering skills, system design,
        and architectural understanding.
      </p>

      <p>
        All visual assets, illustrations, icons, and UI elements used in this application are either:
        <ul className="list-disc pl-6">
          <li>Generated using AI tools</li>
          <li>Custom-designed by the developer</li>
          <li>Sourced from open-source or freely available resources</li>
        </ul>
      </p>

      <p>
        This project is <strong>inspired by Windows architecture and UI design principles</strong>.
        The inspiration is purely technical and aesthetic. There is no intention to copy, misuse,
        infringe, or misrepresent any proprietary software, trademark, or intellectual property.
      </p>

      <p>
        The application does not aim to promote, harm, criticize, or discriminate against any
        technology, platform, company, or ecosystem. It is built solely to demonstrate engineering
        concepts and modern application design.
      </p>

      <h3 className="text-lg font-semibold mt-6">System Architecture Overview</h3>

      <p>
        This project follows a <strong>modular, microservice-oriented architecture</strong>, designed
        for scalability, maintainability, and separation of concerns.
      </p>

      <ul className="list-disc pl-6 space-y-1">
        <li><strong>User Service</strong> – Handles user registration, profile management, and preferences</li>
        <li><strong>Authentication Service</strong> – Manages login, token handling, and API authorization</li>
        <li><strong>API Gateway</strong> – Central entry point for routing and security enforcement</li>
        <li><strong>Socket Service</strong> – Enables real-time communication and live updates</li>
        <li><strong>Notification Service</strong> – Sends system and user-specific notifications</li>
        <li><strong>Recommendation Service</strong> – Suggests content based on user behavior and interests</li>
        <li><strong>Interest Service</strong> – Provides news and updates aligned with selected user interests
          such as entertainment, technology, and current affairs
        </li>
      </ul>

      <p>
        Each service is designed to be independently deployable and loosely coupled, reflecting
        real-world production-grade backend systems.
      </p>

      <h3 className="text-lg font-semibold mt-6">Developer Information</h3>

      <p>
        This project is designed and developed by <strong>Bittu Kumar</strong>, as a demonstration of
        full-stack development, UI engineering, and system architecture skills.
      </p>

      <ul className="list-disc pl-6">
        <li>
          GitHub:
          <a
            href="https://github.com/BittuKumar183040"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline ml-1"
          >
            BittuKumar183040
          </a>
        </li>
        <li>
          LinkedIn:
          <a
            href="http://www.linkedin.com/in/bittukumar183040"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline ml-1"
          >
            bittukumar183040
          </a>
        </li>
      </ul>

      <p className="mt-6">
        By proceeding, you acknowledge that this application is a <strong>non-commercial, educational
          project</strong> intended to demonstrate technical expertise and architectural design.
      </p>
    </div>
  )
}

const Terms = ({ onNext, onPrev }: RegistrationStepProps) => {
  return (
    <div className="relative flex flex-wrap h-full w-full">
      <button className=" absolute left-0 top-0 z-10 flex items-center gap-2 text-black/50 shadow-sm bg-white/20 p-2 px-4 rounded-xl" onClick={onPrev}>
        <ArrowBigLeft size={20} strokeWidth={2} />
        <p className=" text-xl font-bold">Back</p>
      </button>
      <div className="w-1/2 flex items-center justify-center opacity-80">
        <img src="/signup/terms.png" />
      </div>

      <div className="w-1/2 flex flex-col h-full gap-8 justify-center">
        <p className=' text-2xl font-bold text-black'>Please review the License Agreement</p>
        <div className="overflow-scroll overflow-x-auto flex-1">
          <TermsAndConditions />
        </div>
        <div className=' flex justify-end'>
          <button className=' p-4 px-18 text-xl rounded-lg shadow-xl bg-linear-to-r from-blue-500 to-blue-600 text-white font-medium w-fit'
            onClick={onNext}>Accept</button>
        </div>
      </div>
    </div>
  );
};

export default Terms;
