import React from 'react'

export default function Home() {
  return (
    <>
      <p>Hello! This is a really cool and awesome project that I built for Scalar.</p>
      <div style={{ maxWidth: 500 }}>
        <img
          className="img-fluid rounded shadow border mb-4"
          src="https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg"
          alt="Lounging Cat"
        />
      </div>
      {/* eslint-disable-next-line */}
      <p>I hope you enjoy it as much as this cat enjoys lounging. 😎 👍</p>
    </>
  )
}
