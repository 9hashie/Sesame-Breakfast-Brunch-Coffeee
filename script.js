document.addEventListener("DOMContentLoaded", () => {

    const loader = document.querySelector(".loader");
    const header = document.querySelector(".header");
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileNav = document.querySelector(".mobile-nav");
    const backTop = document.querySelector(".back-top");
    const year = document.getElementById("year");

    /* LOADER */

    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.classList.add("hidden");
        }, 700);
    });

    /* YEAR */

    year.textContent = new Date().getFullYear();

    /* HEADER */

    function handleHeader() {

        if (window.scrollY > 60) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        if (window.scrollY > 500) {
            backTop.classList.add("show");
        } else {
            backTop.classList.remove("show");
        }
    }

    window.addEventListener("scroll", handleHeader);

    handleHeader();

    /* MOBILE MENU */

    menuToggle.addEventListener("click", () => {

        mobileNav.classList.toggle("open");
        document.body.classList.toggle("no-scroll");

        const spans = menuToggle.querySelectorAll("span");

        if (mobileNav.classList.contains("open")) {

            spans[0].style.transform = "translateY(7px) rotate(45deg)";
            spans[1].style.opacity = "0";
            spans[2].style.transform = "translateY(-7px) rotate(-45deg)";

        } else {

            spans[0].style.transform = "";
            spans[1].style.opacity = "";
            spans[2].style.transform = "";

        }
    });

    /* CLOSE MOBILE MENU */

    document.querySelectorAll(".mobile-nav a").forEach(link => {

        link.addEventListener("click", () => {

            mobileNav.classList.remove("open");
            document.body.classList.remove("no-scroll");

            const spans = menuToggle.querySelectorAll("span");

            spans[0].style.transform = "";
            spans[1].style.opacity = "";
            spans[2].style.transform = "";

        });

    });

    /* MENU FILTER */

    const tabs = document.querySelectorAll(".menu-tab");
    const items = document.querySelectorAll(".menu-item");

    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            tabs.forEach(item => {
                item.classList.remove("active");
            });

            tab.classList.add("active");

            const category = tab.dataset.category;

            items.forEach(item => {

                if (item.dataset.category === category) {
                    item.classList.remove("hide");

                    item.style.animation = "none";

                    requestAnimationFrame(() => {
                        item.style.animation = "menuAppear .45s ease forwards";
                    });

                } else {
                    item.classList.add("hide");
                }

            });

        });

    });

    /* ADD MENU ANIMATION */

    const animationStyle = document.createElement("style");

    animationStyle.textContent = `
        @keyframes menuAppear {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;

    document.head.appendChild(animationStyle);

    /* SCROLL REVEAL */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* SMOOTH ANCHOR */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", event => {

            const targetId = anchor.getAttribute("href");

            if (targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight = header.offsetHeight;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });

    /* BACK TO TOP */

    backTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

    /* ACTIVE NAV */

    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav a");

    const sectionObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                navLinks.forEach(link => {
                    link.classList.remove("active");
                });

                const activeLink = document.querySelector(
                    `.nav a[href="#${entry.target.id}"]`
                );

                if (activeLink) {
                    activeLink.classList.add("active");
                }

            });

        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

});