import Layout from '@/components/layout'
import Link from 'next/link'

export default function About() {
    return (
        <Layout title="About - Billpop" contained>
            <h3 className="text-2xl font-extrabold text-center my-20 leading-tight">
                Join 15 million+ users to buy, sell, discover and explore <br /> the most inspiring and unique things in
                the world.
            </h3>

            <section className="max-w-4xl mx-auto grid grid-cols-2 gap-32">
                <div className="">
                    <img src="/about-img1.jpg" alt="Bike" />
                </div>
                <div className="">
                    <h3 className="text-4xl font-extrabold">Story</h3>
                    <p className="text-sm">
                        Depop was founded by co-founder of PIG magazine and RETROSUPERFUTURE sunglasses, Simon
                        Beckerman. Originally a social network where PIG’s readers could buy items featured in the
                        magazine. After realizing that Depop needed a selling function, Simon re-envisioned the app as a
                        global marketplace — a mobile space where you can see what your friends and the people you’re
                        inspired by are liking, buying, and selling.
                    </p>
                    <p className="pt-4 text-sm">
                        In turn, your friends and creative influencers all over the world can see the things you like,
                        buy, and sell, and are inspired by you. This ecosystem has supported Depop becoming a global
                        conduit of connection, not only in m-commerce, but culture, design, and creative communities
                        around the world.
                    </p>
                </div>
            </section>

            <section className="max-w-4xl mx-auto grid grid-cols-2 gap-20 mt-8">
                <div className="">
                    <h3 className="text-4xl font-extrabold mt-20">Team</h3>
                    <p className="text-sm">
                        Depop is powered by over 200 employees working in our London HQ and offices in Manchester, Los
                        Angeles, New York and Sydney. We practice what we preach and are active participants in
                        independent creative entrepreneurship. We’re a company of photographers, DJs, illustrators,
                        jewelry makers, painters, music producers, globetrotters, writers and activists, joined together
                        by passion for our product and obsession with community.
                    </p>
                </div>
                <div className="">
                    <img src="/about-img2.jpg" alt="Office space" />
                </div>
            </section>

            <section className="max-w-4xl mx-auto grid grid-cols-2 gap-32 mt-8">
                <div className="">
                    <img src="/about-img3.jpg" alt="Grid of Clothes" />
                </div>
                <div className="">
                    okay we are ab
                    <h3 className="text-4xl font-extrabold mt-20">Our Community</h3>
                    <p className="text-sm">
                        Life is about creating. That’s why Depop is home to 15 million+ stylists, designers, artists,
                        collectors, vintage sellers, sneakerheads and more. From the most inspiring creatives to
                        up-and-coming influencers across fashion, design, art and music. Come and join our growing
                        community.
                    </p>
                </div>
            </section>

            <section className="my-20 text-center">
                <h3 className="text-4xl font-extrabold">Careers</h3>
                <p className="my-5">
                    Don’t see your dream Depop job? Think outside of the box. Show us something we’ve never seen before.
                    Excite <br /> us. Challenge us. Our employees are driven by passion, and we want to work with people
                    who love Depop just as <br /> much as we do. Email your marketing pitches, growth hacks, UX
                    re-designs, and genius ideas that only you can <br /> think of to experience@depop.com with your
                    resume. We’re always open.
                </p>
                <Link href="/job-openings">
                    <p className="font-extrabold cursor-pointer hover:underline">See our job openings</p>
                </Link>
            </section>
        </Layout>
    )
}
