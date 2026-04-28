// import { gsap } from "gsap";

export function animate() { 
    const tl = gsap.timeline();

    tl.fromTo(
        "#curentContaner",
        { y: 100, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out"
        }
    )
        .fromTo(
            ".dayBar",
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.5,
                ease: "power3.out",
                stagger: 1
            }
        );
}