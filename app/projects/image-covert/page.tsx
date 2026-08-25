import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Image Covert — Steganography and File Integrity",
  description: "A practical steganography experiment using OpenStego, AES-128, SHA-256 hashes, direct transfer, and image-hosting transformations.",
  openGraph: {
    title: "Image Covert — Steganography and File Integrity",
    description: "Testing hidden-data recovery and file integrity across direct transfer, image hosting, and resizing.",
    images: ["/projects/image-covert/carrier-image.jpeg"],
  },
};

const assetRoot = "/projects/image-covert";

type FigureProps = {
  alt: string;
  caption: string;
  file: string;
  height: number;
  width: number;
  compact?: boolean;
  portrait?: boolean;
};

function ProjectFigure({ alt, caption, file, height, width, compact = false, portrait = false }: FigureProps) {
  const className = ["case-figure", compact ? "is-compact" : "", portrait ? "is-portrait" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <figure className={className}>
      <div className="case-figure-frame">
        <Image
          src={`${assetRoot}/${file}`}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 760px) calc(100vw - 44px), 820px"
        />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function ImageCovertPage() {
  return (
    <main className="case-study-page">
      <article className="case-study-shell">
        <header className="case-study-header">
          <Link className="case-study-back" href="/#projects">← Back to projects</Link>
          <p className="case-study-kicker">Cybersecurity · Practical experiment</p>
          <h1>Image Covert</h1>
          <p className="case-study-lead">
            A hands-on investigation into steganography and file integrity: hide an encrypted text message inside an image, recover it after transfer, and observe what happens when an image service preserves or transforms the file.
          </p>
          <dl className="case-study-facts">
            <div><dt>Focus</dt><dd>Steganography and integrity verification</dd></div>
            <div><dt>Tools</dt><dd>OpenStego, PowerShell, SHA-256, Postimages</dd></div>
            <div><dt>Result</dt><dd>Byte-preserving transfer succeeded; resizing destroyed recovery</dd></div>
          </dl>
        </header>

        <section className="case-study-section" aria-labelledby="experiment-design">
          <div className="case-section-heading">
            <span>01</span>
            <div>
              <p>Experiment design</p>
              <h2 id="experiment-design">Two transfer paths, one hidden message</h2>
            </div>
          </div>
          <div className="case-prose">
            <p>
              This project is a small practical experiment focused on steganography and file integrity verification using cryptographic hashes. First, I hide a message inside an image and transfer the steganographic image directly to another device. On the receiving device, I extract the message and verify that the transferred data remains intact.
            </p>
            <p>
              Next, I send the same kind of steganographic image through an image-sharing service. After downloading it, I attempt the extraction again and compare file hashes to determine whether the service modified the image or affected the concealed data.
            </p>
            <aside className="case-note">
              This is intentionally a starting point for deeper experiments with covert data transfer, file integrity, steganalysis, and image-processing pipelines.
            </aside>
          </div>
        </section>

        <section className="case-study-section" aria-labelledby="carrier-baseline">
          <div className="case-section-heading">
            <span>02</span>
            <div>
              <p>Prepare</p>
              <h2 id="carrier-baseline">Choose the carrier and establish a baseline</h2>
            </div>
          </div>
          <div className="case-prose">
            <p>
              Before embedding anything, I calculate its SHA-256 hash with PowerShell&apos;s built-in <code>Get-FileHash</code> command. This digest becomes the baseline integrity reference for the original image.
            </p>
          </div>
          <ProjectFigure
            file="carrier-image.jpeg"
            width={642}
            height={964}
            alt="Concrete bridge supports extending into calm blue water"
            caption="The original carrier image before steganographic embedding. Photograph by Chris F. on Pexels."
            portrait
          />
          <ProjectFigure
            file="original-image-hash.png"
            width={977}
            height={135}
            alt="PowerShell output showing the original image SHA-256 hash"
            caption="SHA-256 baseline for original-image.jpg."
            compact
          />
          <p className="case-hash"><span>Original image</span><code>230E03C398CB555B4FACE73941744171FFC67572B6EAC29EA583A7A12FF5ED31</code></p>
        </section>

        <section className="case-study-section" aria-labelledby="embed-message">
          <div className="case-section-heading">
            <span>03</span>
            <div>
              <p>Embed</p>
              <h2 id="embed-message">Build and conceal the payload</h2>
            </div>
          </div>
          <div className="case-prose">
            <p>
              I created a simple <code>message.txt</code> file containing inert lab text. At this stage it is only plain text: it is not executable and performs no action by itself. The two inputs are now ready - the carrier image and the message file.
            </p>
          </div>
          <ProjectFigure
            file="original-message.png"
            width={427}
            height={81}
            alt="Plain-text test message prepared for steganographic embedding"
            caption="The original plain-text message used as the hidden payload."
            compact
          />
          <div className="case-prose">
            <p>
              I use <a href="https://www.openstego.com/" target="_blank" rel="noreferrer">OpenStego</a> to embed <code>message.txt</code> into <code>original-image.jpg</code>. The output is a new PNG containing the concealed message. AES-128 is enabled, so the payload is encrypted before OpenStego embeds it into the carrier.
            </p>
          </div>
          <ProjectFigure
            file="openstego-hide-data.png"
            width={1132}
            height={421}
            alt="OpenStego Hide Data screen configured with a message file, carrier image, output image, and AES-128 encryption"
            caption="OpenStego embedding configuration: message file, cover file, output stego file, AES-128, and password protection."
          />
        </section>

        <section className="case-study-section" aria-labelledby="local-verification">
          <div className="case-section-heading">
            <span>04</span>
            <div>
              <p>Verify locally</p>
              <h2 id="local-verification">Different image hash, identical recovered message</h2>
            </div>
          </div>
          <div className="case-prose">
            <p>
              The steganographic image looks ordinary, but its SHA-256 digest is completely different. That is expected: embedding changed the image&apos;s underlying binary data even though the visual result appears unchanged.
            </p>
          </div>
          <ProjectFigure
            file="stego-image-hash.png"
            width={972}
            height={137}
            alt="PowerShell output showing the steganographic image SHA-256 hash"
            caption="SHA-256 digest after the payload was embedded."
            compact
          />
          <div className="case-hash-grid">
            <p className="case-hash"><span>Original image</span><code>230E03C398CB555B4FACE73941744171FFC67572B6EAC29EA583A7A12FF5ED31</code></p>
            <p className="case-hash"><span>Stego image</span><code>412268534A5B3D4BCC23E0ADCABB060F7E1C644A64C43273F066B2D13294A394</code></p>
          </div>
          <div className="case-prose">
            <p>
              A receiver who knows the image contains hidden data can load it into OpenStego, select an output directory, and provide the matching password. OpenStego then extracts the original message file.
            </p>
          </div>
          <ProjectFigure
            file="openstego-extract-data.png"
            width={902}
            height={365}
            alt="OpenStego Extract Data screen with the stego image, destination folder, and password"
            caption="Recovering the encrypted payload from the steganographic image."
          />
          <ProjectFigure
            file="extracted-message.png"
            width={417}
            height={81}
            alt="Extracted text message matching the original message"
            caption="The recovered message matches the sender&apos;s original text."
            compact
          />
          <div className="case-figure-pair">
            <ProjectFigure
              file="original-message-hash.png"
              width={975}
              height={130}
              alt="PowerShell SHA-256 hash for the original message file"
              caption="Original message hash."
              compact
            />
            <ProjectFigure
              file="extracted-message-hash.png"
              width={975}
              height={125}
              alt="PowerShell SHA-256 hash for the extracted message file"
              caption="Extracted message hash."
              compact
            />
          </div>
          <p className="case-result"><strong>Verified:</strong> both message files share the SHA-256 digest <code>0B86ED2F1095B6ACC04FFBE48F1B2471C965D41488B490B07670F110721B779A</code>, confirming that they are bit-for-bit identical.</p>
        </section>

        <section className="case-study-section" aria-labelledby="hosting-test">
          <div className="case-section-heading">
            <span>05</span>
            <div>
              <p>Transfer</p>
              <h2 id="hosting-test">Test an image-sharing service</h2>
            </div>
          </div>
          <div className="case-prose">
            <p>
              The next test uploads a steganographic image to <a href="https://postimages.org/" target="_blank" rel="noreferrer">Postimages</a>, download it on another device, and compare the result. Because of the service&apos;s file-size limitation during this experiment, I use a lower-quality version of the same photograph and establish a new SHA-256 baseline before uploading it.
            </p>
          </div>
          <ProjectFigure
            file="upload-baseline-hash.png"
            width={972}
            height={132}
            alt="PowerShell SHA-256 hash for the lower-quality steganographic image before upload"
            caption="Pre-upload baseline for image2.png."
            compact
          />
          <p className="case-hash"><span>Pre-upload image</span><code>D600A19BEB97BB7826C93D12BAB170573F85C0272E7C677F8F6E0DA2B3BE12BC</code></p>
          <ProjectFigure
            file="postimages-upload-result.png"
            width={1891}
            height={652}
            alt="Postimages upload-complete page showing the steganographic image and generated sharing links"
            caption="Postimages accepted the steganographic image and generated download links."
          />
          <ProjectFigure
            file="downloaded-image-hash.png"
            width={971}
            height={127}
            alt="PowerShell output showing the downloaded image has the same SHA-256 hash as before upload"
            caption="The downloaded file retains the exact pre-upload SHA-256 digest."
            compact
          />
          <p className="case-result"><strong>Transfer result:</strong> the downloaded image is bit-for-bit identical to the uploaded file, indicating that this direct Postimages download path preserved the file during the test.</p>
          <div className="case-prose">
            <p>
              I then extract the payload from the downloaded image with the same password and procedure. The message remains intact, demonstrating that a byte-preserving hosted transfer can retain OpenStego&apos;s concealed data.
            </p>
          </div>
          <ProjectFigure
            file="downloaded-message.png"
            width={421}
            height={80}
            alt="Message extracted from the image downloaded through Postimages"
            caption="The message recovered after the hosted transfer is unchanged."
            compact
          />
        </section>

        <section className="case-study-section" aria-labelledby="resize-test">
          <div className="case-section-heading">
            <span>06</span>
            <div>
              <p>Transform</p>
              <h2 id="resize-test">Resize the image and test recovery again</h2>
            </div>
          </div>
          <div className="case-prose">
            <p>
              Resizing the steganographic image from 1280×1920 to 640×480 changes the pixels and file structure, so a different SHA-256 hash is inevitable. More importantly, image resampling can alter the specific pixel values or frequency-domain coefficients used by steganographic techniques, potentially destroying the embedded pattern.
            </p>
          </div>
          <ProjectFigure
            file="resized-postimages-result.png"
            width={1882}
            height={655}
            alt="Postimages upload-complete page showing a resized version of the steganographic image"
            caption="Postimages generated a separate link for the resized image."
          />
          <ProjectFigure
            file="resized-image-hash.png"
            width={976}
            height={127}
            alt="PowerShell output showing a new SHA-256 digest for the resized image"
            caption="The resized image has a new digest because its underlying data changed."
            compact
          />
          <ProjectFigure
            file="openstego-extraction-error.png"
            width={925}
            height={137}
            alt="OpenStego error stating that embedded data is corrupt, the password is invalid, or no algorithm can handle the stego file"
            caption="OpenStego can no longer recover the payload from the resized image."
            compact
          />
          <p className="case-result is-failure"><strong>Extraction failed:</strong> the password and procedure were unchanged, while resizing was the manipulated variable. The result strongly indicates that resampling disrupted the embedded data.</p>
        </section>

        <section className="case-study-section" aria-labelledby="conclusions">
          <div className="case-section-heading">
            <span>07</span>
            <div>
              <p>Conclusions</p>
              <h2 id="conclusions">What the experiment demonstrated</h2>
            </div>
          </div>
          <ul className="case-takeaways">
            <li><strong>Visual similarity is not binary identity.</strong> The original and steganographic images can look alike while producing entirely different SHA-256 hashes.</li>
            <li><strong>Hashes verify integrity.</strong> Matching message hashes proved that the original and extracted payloads were bit-for-bit identical.</li>
            <li><strong>Byte-preserving transfer can retain hidden data.</strong> The tested Postimages download path preserved both the image hash and recoverable payload.</li>
            <li><strong>Image transformations are destructive to fragile payloads.</strong> Resizing changed the digest and prevented OpenStego from extracting the message.</li>
            <li><strong>Discovery requires a different investigation.</strong> A user who does not know a payload exists would need suspicion, steganalysis, or appropriate forensic tools to investigate it.</li>
          </ul>
          <div className="case-next-step">
            <p>Next experiment</p>
            <h2>Move from hiding data to detecting it.</h2>
            <span>The next project will explore what makes a stego file suspicious and how an analyst can investigate it.</span>
          </div>
        </section>

        <footer className="case-study-resources">
          <h2>Credits and resources</h2>
          <ul>
            <li><a href="https://www.pexels.com/@chris-f-38966/" target="_blank" rel="noreferrer">Chris F. — photographer profile on Pexels</a></li>
            <li><a href="https://www.pexels.com/photo/concrete-bridge-supports-over-calm-water-39169167/" target="_blank" rel="noreferrer">Original carrier photograph on Pexels</a></li>
            <li><a href="https://www.openstego.com/" target="_blank" rel="noreferrer">OpenStego by Samir Vaidya</a></li>
            <li><a href="https://postimages.org/" target="_blank" rel="noreferrer">Postimages image-hosting service</a></li>
          </ul>
          <Link className="case-study-back is-footer" href="/#projects">← Back to projects</Link>
        </footer>
      </article>
    </main>
  );
}
