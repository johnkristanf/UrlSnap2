
export const Footer = () => {
    return(
        <footer
    className="bg-neutral-100 text-center dark:bg-neutral-600 lg:text-left">
    <div className="container p-6 text-neutral-800 dark:text-neutral-200">
      <div className="grid gap-4 lg:grid-cols-2">

        <div className="mb-6 md:mb-0">
          <h5 className="mb-2 font-medium uppercase">URL Snap Privacy:</h5>

          <p className="mb-4">
          UrlSnap, prioritizing user privacy, offers a comprehensive suite of functionalities. With its integrated URL shortener, QR code generator, and MP3 converter, users can securely convert YouTube video audio into downloadable MP3 files. This multifaceted platform ensures users enjoy their preferred audio content offline or across multiple devices, emphasizing confidentiality throughout the process.
          </p>
        </div>


        <div className="mb-6 md:mb-0">
          <h5 className="mb-2 font-medium uppercase">URL Shortener:</h5>

          <p className="mb-4">
          UrlSnap provides a quick and efficient URL shortening service. Users can take lengthy URLs and generate shortened, more manageable links. This feature streamlines link sharing across various platforms such as social media, emails, or messages, ensuring simplicity and ease of use.
          </p>
        </div>

        <div className="mb-6 md:mb-0">
          <h5 className="mb-2 font-medium uppercase">QR Code Generator:</h5>

          <p className="mb-4">
          Simplifying the process of sharing URLs, UrlSnap enables users to generate QR codes instantly. Users can convert URLs or shortened links into scannable QR codes. These QR codes can be easily shared and scanned by others, enhancing accessibility and enabling effortless information exchange.
          </p>
        </div>

        <div className="mb-6 md:mb-0">
          <h5 className="mb-2 font-medium uppercase">YouTube MP3 Converter:</h5>

          <p className="mb-4">
          Offering multimedia versatility, UrlSnap allows users to extract audio
           content from YouTube videos and convert them into MP3 files. Users can provide a 
           YouTube video URL, and UrlSnap efficiently converts the audio content, providing 
          downloadable MP3 files. This feature enables users to 
          enjoy their favorite audio content offline or on various devices.
          </p>
        </div>
      </div>
    </div>

    {/* <!--Copyright section--> */}
    <div
      className="bg-neutral-200 p-4 text-center text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">
      © 2023 Copyright:
      <a
        className="text-neutral-800 dark:text-neutral-400"
        href="https://tailwind-elements.com/"
      >TW Elements</a>
    </div>
  </footer>
    )
}