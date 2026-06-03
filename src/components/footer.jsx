import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="flex justify-center">
      <div className="max-w-5/6 px-2 pt-12 pb-4">
        <div className="w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent mb-10" />

        <div className="text-lg font-bold tracking-tight mb-3 text-white">
          Lead<span className="text-indigo-400">Zone</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <p className="text-[0.68rem] text-slate-400 max-w-xs leading-relaxed">
              A modern CRM built for real estate professionals to manage leads,
              follow up faster, and close more deals.
            </p>
          </div>

          <div className="">
            <h4 className="text-sm font-semibold mb-3 text-slate-200">
              Product
            </h4>

            <ul className="space-y-2">
              <li className="text-xs text-slate-400 hover:text-white transition">
                Features
              </li>
              <li className="text-xs text-slate-400 hover:text-white transition">
                Pricing
              </li>
              <li className="text-xs text-slate-400 hover:text-white transition">
                Dashboard
              </li>
            </ul>
          </div>
          <div className="">
            <h4 className="text-sm font-semibold mb-3 text-slate-200">
              Company
            </h4>

            <ul className="space-y-2">
              <li className="text-xs text-slate-400 hover:text-white transition">
                About
              </li>
              <li className="text-xs text-slate-400 hover:text-white transition">
                Contact
              </li>
              <li className="text-xs text-slate-400 hover:text-white transition">
                Privacy Policy
              </li>
            </ul>
          </div>
          <div className="">
            <h4 className="text-sm font-semibold mb-3 text-slate-200">
              Account
            </h4>

            <ul className="space-y-2">
              <li className="text-xs text-slate-400 hover:text-white transition">
                <Link to="/auth/login">Sign In</Link>
              </li>
              <li className="text-xs text-slate-400 hover:text-white transition">
                <Link to="/auth/signup">Sign Up</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent mt-6" />

        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 md:gap-4">
          <p className="text-[0.68rem] text-slate-500">
            © {new Date().getFullYear()} LeadZone. All rights reserved.
          </p>

          <p className="text-[0.68rem] text-slate-500">
            Built for real estate agents.
          </p>
        </div>
      </div>
    </footer>
  );
}

// function FooterColumn({ title, links }) {
//   return (
//     <div className="">
//       <h4 className="text-sm font-semibold mb-3 text-slate-200">{title}</h4>

//       <ul className="space-y-2">
//         {links.map((link) => (
//           <li key={link}>
//             <a
//               href="#"
//               className="text-sm text-slate-400 hover:text-white transition"
//             >
//               {link}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

{
  /* 
          <FooterColumn
            title="Product"
            links={["Features", "Pricing", "Dashboard"]}
          /> */
}

{
  /* <FooterColumn
            title="Company"
            links={["About", "Contact", "Privacy Policy"]}
          /> */
}

{
  /* <FooterColumn
            title="Account"
            links={["Sign In", "Sign Up"]}
          /> */
}
