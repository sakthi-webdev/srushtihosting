'use client';

import React from 'react';
import Script from 'next/script';
import { siteConfig } from '@/config/site';

export const DomainWidget: React.FC = () => {
  return (
    <div className="w-full min-h-[60px] flex flex-col justify-center">
      <Script
        src="https://widgets.upmind.app/dac/upm-dac.min.js"
        strategy="lazyOnload"
      />
      <upm-dac
        order-config-url={siteConfig.upmind.orderConfigUrl}
        currency-code={siteConfig.upmind.currency}
      ></upm-dac>
    </div>
  );
};

