
'use client'

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import React from 'react';
import { getServiceTheme } from '@/app/ui/service-themes';
interface TabsProps {
  contents: Content[]
}
interface Content {
  name: string;
  info: React.ReactNode;
  imageSrc: string;
}

function getTheme(index: number) {
  return getServiceTheme(index)
}

export default function Tabs({contents}: TabsProps) {
  return (
    <div className="mt-6 w-full">
      <TabGroup>
        <TabList className="relative flex flex-wrap items-end">
          {contents.map(({ name }, i) => (
            <Tab
              key={name}
              className={({ selected, hover }) => {
                const theme = getTheme(i)

                return [
                  "relative -mr-3 border-4 px-4 py-3 text-sm font-semibold leading-snug text-creoSkin-100 transition-[background-color,color,box-shadow] duration-150 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                  theme.border,
                  theme.ring,
                  selected
                    ? "z-20 -mb-[4px] rounded-t-[1.4rem] rounded-b-none border-b-0 bg-creoCont-neutral1"
                    : "z-0 -mb-px rounded-t-[1.4rem] rounded-b-none shadow-[0_8px_18px_rgba(181,126,89,0.16)]",
                  !selected ? theme.tabBg : "",
                  hover && !selected ? "-translate-y-px" : "",
                  hover && !selected ? theme.tabHoverBg : "",
                ].join(" ")
              }}
            >
              {name}
            </Tab>
          ))}
        </TabList>
        <TabPanels className="relative z-10">
          {contents.map(({ name, info, imageSrc }, i) => {
            const theme = getTheme(i)

            return (
              <TabPanel
                key={name}
                className={[
                  "relative h-[50vh] overflow-hidden rounded-[2rem] rounded-tl-none border-4 bg-creoCont-neutral1 shadow-[0_20px_45px_rgba(98,70,47,0.12)] focus:outline-none",
                  theme.panelBorder,
                ].join(" ")}
              >
                <div className="flex h-full flex-col md:flex-row">
                  <div className="min-w-0 flex-1 overflow-y-auto px-5 py-6 md:px-8 md:py-8">
                    <div className="markdown">
                      {info}
                    </div>
                  </div>
                  {imageSrc ? (
                    <div
                      className={[
                        "flex min-h-0 w-full items-stretch justify-end overflow-hidden md:w-auto md:flex-none md:self-stretch",
                        theme.imageRail,
                      ].join(" ")}
                    >
                      <img
                        className="h-full w-auto max-w-none object-contain object-right"
                        src={imageSrc}
                        alt={name}
                      />
                    </div>
                  ) : null}
                </div>
              </TabPanel>
            )
          })}
        </TabPanels>
      </TabGroup>
    </div>
  )
}
