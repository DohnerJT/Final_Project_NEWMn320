// import { gsap } from "gsap";

export function animate() { 

    const t2 = gsap.timeline();

    t2.fromTo(
        "#curentContaner",
        { y: 100, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1,
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
                stagger: 1,
                onComplete: () => {
                    document.querySelectorAll(".dayBar").forEach((bar) => {
                        bar.addEventListener("mouseenter", () => {
                            gsap.killTweensOf(bar);
                            gsap.to(bar, {
                                x: 20,
                                duration: 0.06,
                                repeat: 5,
                                yoyo: true,
                                ease: "power1.inOut"
                            });
                        });
                    });
                }
            }
        );
}