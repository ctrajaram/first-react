export default function Blog() {
    return (
        <article className="blog">
            <h2 className="blog-title">My First React Page</h2>
            <p className="blog-date">March 28, 2026 &bull; CR Development</p>

            <p>
                Building my very first project —{" "}
                <strong>first-react</strong> — has already taught me several React concepts , and I want to
                share everything that went into creating it.
            </p>

            <h3>Step 1: Creating the Project with Vite</h3>
            <p>
                The very first thing I did was scaffold a brand-new React project using{" "}
                <strong>Vite</strong>. Vite is a lightning-fast build tool that gives you a
                working React app in seconds. One command and you are up and running with hot
                module replacement, so every change you save shows up in the browser instantly —
                no waiting around.
            </p>
            <pre className="code-block">{`npm create vite@latest first-react -- --template react
cd first-react
npm install
npm run dev`}</pre>

            <h3>Step 2: Breaking the Page into Components</h3>
            <p>
                Instead of writing everything in one big file, I split the page into three
                separate, reusable components — each living in its own file:
            </p>
            <ul>
                <li>
                    <strong>Header.jsx</strong> — displays the React logo and a navigation bar
                    with links for About, and Contact.
                </li>
                <li>
                    <strong>MainContent.jsx</strong> — the heart of the page, showing my list of
                    reasons why I am excited to learn React.
                </li>
                <li>
                    <strong>Footer.jsx</strong> — a simple footer with the copyright line
                    &copy; 2026 CR Development.
                </li>
            </ul>
            <p>
                Then inside <strong>App.jsx</strong> I imported all three and composed them
                together like building blocks:
            </p>
            <pre className="code-block">{`import Header from './Header'
import MainContent from './MainContent'
import Footer from './Footer'

export default function App() {
    return (
        <div className="page">
            <Header />
            <MainContent />
            <Footer />
        </div>
    )
}`}</pre>

            <h3>Step 3: Laying Out the Page with CSS Flexbox</h3>
            <p>
                With the components in place, I used <strong>CSS Flexbox</strong> to control how
                everything lines up on screen. Here is what I applied and why:
            </p>

            <h4>Full-height column layout</h4>
            <p>
                The outer <code>.page</code> wrapper uses{" "}
                <code>display: flex; flex-direction: column; min-height: 100vh</code>. This
                stacks Header, MainContent, and Footer vertically and makes the page fill the
                whole browser window.
            </p>
            <pre className="code-block">{`.page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 20px;
}`}</pre>

            <h4>Pushing the footer to the bottom</h4>
            <p>
                Adding <code>flex: 1</code> to the <code>main</code> element tells it to grow
                and take up all the leftover space between the header and the footer. This keeps
                the footer pinned to the bottom of the page even when there is not much content.
            </p>
            <pre className="code-block">{`main {
    flex: 1;
}`}</pre>

            <h4>Aligning the header items</h4>
            <p>
                Inside the <code>.header</code> I used <code>display: flex</code> with{" "}
                <code>justify-content: space-between</code> to push the logo to the left and the
                nav links to the right, and <code>align-items: center</code> to line them up
                neatly in the middle vertically.
            </p>
            <pre className="code-block">{`.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
}`}</pre>

            <h4>Horizontal nav links</h4>
            <p>
                The nav list uses <code>display: flex</code> with <code>gap: 24px</code> to lay
                the Pricing, About, and Contact links out in a clean horizontal row with equal
                spacing between them.
            </p>
            <pre className="code-block">{`.nav-list {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 24px;
}`}</pre>

            <h3>What I Learned</h3>
            <ul>
                <li>How to scaffold a React + Vite project from scratch.</li>
                <li>How to write functional components and export/import them.</li>
                <li>How to compose a full page from small, focused components.</li>
                <li>
                    How CSS Flexbox properties — <code>flex-direction</code>,{" "}
                    <code>justify-content</code>, <code>align-items</code>, <code>flex: 1</code>,
                    and <code>gap</code> — work together to control layout.
                </li>
            </ul>

            <p>
                This is just the beginning and I am already loving every step of it. On to the
                next React adventure!
            </p>
        </article>
    )
}
