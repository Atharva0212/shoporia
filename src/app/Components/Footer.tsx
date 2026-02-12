import Image from "next/image";
import Link from "next/link";

const developerProfile = {
  name: "Atharva Gajakos",
  email: "atharvagajakos92@gmail.com",
  github: "https://github.com/Atharva0212",
  linkedin: "https://www.linkedin.com/in/atharva-gajakos-129872321",
  twitter: "https://x.com/GajakosP",
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-br from-inverse via-gray-800 to-inverse text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <Image src={"/icons/shopping-bag-md.svg"} alt="" width={24} height={24} className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="text-h5 font-bold">Shoporia</h3>
            </div>
            <p className="text-text-300 mb-6 leading-relaxed max-w-md">
              Your one-stop destination for quality products. Shop with
              confidence and enjoy seamless shopping experience.
            </p>
          </div>

          <div>
            <h4 className="text-body-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">
              Follow Me
            </h4>
            <div className="flex items-center gap-3">
              <SocialIconLink
                href={developerProfile.github}
                label="GitHub"
                iconSrc="/icons/github.svg"
              />
              <SocialIconLink
                href={developerProfile.linkedin}
                label="LinkedIn"
                iconSrc="/icons/linkedin.svg"
              />
              <SocialIconLink
                href={developerProfile.twitter}
                label="X (Twitter)"
                iconSrc="/icons/twitter.svg"
              />
              <SocialIconLink
                href={`mailto:${developerProfile.email}`}
                label="Email"
                iconSrc="/icons/mail-white.svg"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mb-8"></div>

        <div className="flex flex-col gap-4 items-center">
          <div className="text-text-500 text-body-sm">
            © {currentYear} Shoporia. All rights reserved.
          </div>

          {/* Made by */}
          <div className="flex items-center gap-2 text-text-500 text-body-xs">
            <span>Made with</span>
            <Image src={"/icons/heart.svg"} alt="" width={16} height={16} className="w-4 h-4" />
            <span>by</span>
            {developerProfile.name}
          </div>
        </div>
      </div>
    </footer>
  );
}

type SocialIconLinkProps = {
  href: (typeof developerProfile)[keyof typeof developerProfile];
  label: string;
  iconSrc: string;
};

function SocialIconLink({ href, label, iconSrc }: SocialIconLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2.5 bg-white/10 hover:bg-white/20 rounded-lg transition"
      aria-label={label}
    >
      <Image src={iconSrc} alt="" width={20} height={20} className="w-5 h-5" />
    </Link>
  );
}
