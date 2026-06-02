'use client';

import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { getServiceTheme } from '@/app/ui/service-themes';

interface Content {
  name: string;
  info: React.ReactNode;
  imageSrc: string;
}

interface ServiceAccordionMobileProps {
  contents: Content[];
}

export default function ServiceAccordionMobile({
  contents,
}: ServiceAccordionMobileProps) {
  return (
    <div className="mt-6 overflow-hidden rounded-[2rem] rounded-tl-none rounded-bl-none bg-creoCont-neutral1 shadow-[0_20px_45px_rgba(98,70,47,0.12)]">
      {contents.map(({ name, info, imageSrc }, i) => {
        const theme = getServiceTheme(i);
        const isFirst = i === 0;
        const isLast = i === contents.length - 1;

        return (
          <Disclosure
            key={name}
            as="div"
            className={[
              'w-full overflow-hidden border-x-4',
              theme.tabBg,
              isFirst ? 'border-t-4 rounded-t-[2rem] rounded-tl-none' : '',
              isLast ? 'border-b-4 rounded-b-[2rem] rounded-bl-none' : 'border-b-4',
              theme.panelBorder,
            ].join(' ')}
          >
            {({ open }) => (
              <>
                <Disclosure.Button
                  className={[
                    'flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold leading-snug text-creoSkin-100 transition-colors duration-150 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                    theme.ring,
                    open ? 'bg-creoCont-neutral1' : theme.tabBg,
                  ].join(' ')}
                >
                  <span>{name}</span>
                  <ChevronDownIcon
                    className={[
                      'h-5 w-5 shrink-0 transition-transform duration-200',
                      open ? 'rotate-180' : '',
                    ].join(' ')}
                  />
                </Disclosure.Button>

                <Disclosure.Panel className="relative max-h-[50vh] overflow-y-scroll bg-creoCont-neutral1 px-5 py-6 [scrollbar-gutter:stable]">
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-creoCont-neutral1 to-transparent" />
                  <div className="flex flex-col">
                    <div className="markdown">
                      {info}
                    </div>

                    {imageSrc ? (
                      <div className="mt-5 -mx-5 -mb-6 overflow-hidden md:-mx-8 md:-mb-8">
                        <img
                          className="block h-auto w-full object-cover"
                          src={imageSrc}
                          alt={name}
                        />
                      </div>
                    ) : null}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        );
      })}
    </div>
  );
}
