'use client';

import { useTranslations, useLocale } from 'next-intl';
import { personalInfo } from '@/lib/data';
import { getPersonalInfo } from '@/lib/data-localized';
import DownloadButton from '@/components/ui/DownloadButton';
import LinkedInButton from '@/components/ui/LinkedInButton';
import YouTubeButton from '@/components/ui/YouTubeButton';
import GitHubButton from '@/components/ui/GitHubButton';
import EmailButton from '@/components/ui/EmailButton';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale() as 'en' | 'de';
  
  // Get localized personal info
  const localizedPersonalInfo = getPersonalInfo(locale);

  return (
    <footer className="bg-gradient-to-t from-zinc-100 to-zinc-50 dark:from-zinc-950 dark:to-zinc-900 border-t border-zinc-200 dark:border-zinc-800 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-2">{personalInfo.name}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{localizedPersonalInfo.title}</p>
          </div>

          <div className="flex gap-4 items-center">
            <GitHubButton
              name="MarawanEldeib"
              githubUrl={personalInfo.github}
            />
            <LinkedInButton
              name="marawaneldeib"
              linkedInUrl={personalInfo.linkedin}
            />
            <YouTubeButton
              name="@marawaneldeib"
              youtubeUrl={personalInfo.youtube}
            />
            <EmailButton
              email={personalInfo.email}
            />
          </div>

          <div className="flex gap-4">
            <DownloadButton
              href="/cv/Marawan_Eldeib_Resume.pdf"
              variant="solid"
            >
              {t('downloadCV')}
            </DownloadButton>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center">
          <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-3 max-w-2xl mx-auto">
            {t('message')}
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} {personalInfo.name}. {t('copyright')}.
          </p>
        </div>
      </div>
    </footer>
  );
}
