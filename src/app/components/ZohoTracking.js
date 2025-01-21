"use client";

import Script from "next/script";

export default function ZohoTracking() {
  return (
    <Script
      id="wf_anal"
      src="https://crm.zohopublic.com/crm/WebFormAnalyticsServeServlet?rid=66f59df6dfadbadd865f696cae4eb73b29f5de9da0709e6bcb458c2a54af2663ee66201d45cb9c41443e5cbbfea4d2begid494b6a4d02f460947793059fe1e81a3604f2655419491db586f70314988bb94cgid1af5db1ff64547b1c47fa323572d66292026ad02d564e3c53f0d840b48b78bc1gid38b80d3f25ce75d50f09ef14fda4ea8599b8229d92d06cffcf28ea1ff41beb2a&tw=14f8a148e25297a2ee855309918db4af3a2b41ca66b296c154da4b5ced8714cb"
      strategy="afterInteractive"
    />
  );
}