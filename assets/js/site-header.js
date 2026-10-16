(() => {
  const ownScript = document.currentScript;
  const baseScriptUrl = ownScript?.src
    ? new URL('site-header-base.js?v=20261016-section3-clean', ownScript.src).href
    : '../assets/js/site-header-base.js?v=20261016-placepath-editorial';

  const enhancePlacePath = () => {
    if (!document.body.classList.contains('placepath-page')) return;

    const assetBase = '../assets/case-studies/placepath/';
    const setText = (selector, text) => {
      const element = document.querySelector(selector);
      if (element) element.textContent = text;
    };

    if (!document.querySelector('style[data-placepath-final-evidence]')) {
      const style = document.createElement('style');
      style.dataset.placepathFinalEvidence = '';
      style.textContent = `
        .placepath-page .placepath-evolution {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .placepath-page .placepath-evolution figure,
        .placepath-page .placepath-comparison figure {
          min-width: 0;
        }

        .placepath-page [data-placepath-evidence="scope"] {
          grid-template-columns: minmax(0, 1fr) minmax(320px, .9fr);
          align-items: start;
        }

        .placepath-page [data-placepath-evidence="scope"] .placepath-evidence__copy {
          max-width: 38rem;
        }

        .placepath-page [data-placepath-evidence="scope"] figure {
          display: block;
          margin: 0;
        }

        @media (max-width: 900px) {
          .placepath-page .placepath-evolution,
          .placepath-page [data-placepath-evidence="scope"] {
            grid-template-columns: 1fr;
          }
        }
      `;
      document.head.append(style);
    }

    // Use a scoped flow artefact beside the decision copy instead of detailed client user stories.
    const scopeEvidence = document.querySelector('[data-placepath-evidence="scope"]');
    if (scopeEvidence) {
      let scopeFigure = scopeEvidence.querySelector('figure');
      if (!scopeFigure) {
        scopeFigure = document.createElement('figure');
        scopeEvidence.append(scopeFigure);
      }
      scopeFigure.innerHTML = '<img src="../Placepath_Scope_Flow.png" alt="PlacePath scope flow showing part of the product flow thinking used to define the first release" loading="lazy" decoding="async">';
    }

    // Make the later interactive prototype explicitly separate from the commissioned client work.
    setText('.placepath-prototype-feature .section-label', 'Independent continuation');
    setText(
      '#prototype-title + p',
      'After the client project was paused, I independently developed PlacePath into the interactive prototype shown here. This later prototype was not part of the commissioned client work; I created it to explore how the complete product could feel and behave.'
    );

    // Third decision: make the separate review state visible in both mid and high fidelity.
    const workflowSection = document.querySelector('section[aria-labelledby="workflow-title"]');
    const comparisonFigures = workflowSection?.querySelectorAll('.placepath-comparison figure');
    if (comparisonFigures?.length >= 2) {
      const midFigure = comparisonFigures[0];
      const highFigure = comparisonFigures[1];
      const midImg = midFigure.querySelector('img');
      const highImg = highFigure.querySelector('img');
      const midCaption = midFigure.querySelector('figcaption');
      const highCaption = highFigure.querySelector('figcaption');

      if (midImg) {
        midImg.src = `${assetBase}placepath-mid-fidelity-preview-plan.png`;
        midImg.alt = 'Mid-fidelity PlacePath Preview Plan screen bringing the complete plan together before final actions';
      }
      if (highImg) {
        highImg.src = `${assetBase}placepath-high-fidelity-preview-plan.png`;
        highImg.alt = 'High-fidelity PlacePath Preview Plan screen showing the completed plan before submission, printing or sharing';
      }
      if (midCaption) midCaption.innerHTML = '<strong>Mid fidelity:</strong> establish Preview Plan as a distinct review stage.';
      if (highCaption) highCaption.innerHTML = '<strong>High fidelity:</strong> review the complete plan before submitting, printing or sharing.';
    }

    // Replace the speculative ending with the actual client outcome.
    setText('section[aria-labelledby="delivery-title"] > .section-label', 'Outcome');
    setText(
      '#delivery-title + p',
      'The design direction was approved by the client and handed to developers. Development began, but the wider project was later put on pause before launch.'
    );

    const deliveryFigure = document.querySelector('section[aria-labelledby="delivery-title"] .placepath-delivery-visual');
    const deliveryImage = deliveryFigure?.querySelector('img');
    const deliveryCaption = deliveryFigure?.querySelector('figcaption');
    if (deliveryImage) {
      deliveryImage.src = `${assetBase}placepath-independent-prototype-dashboard.webp`;
      deliveryImage.alt = "PlacePath dashboard from Sophie Purewal's later independent interactive prototype";
    }
    if (deliveryCaption) {
      deliveryCaption.textContent = 'After the commissioned project paused, I independently continued the concept into the interactive prototype shown in this case study.';
    }

    const deliverySection = document.querySelector('section[aria-labelledby="delivery-title"]');
    const deliveryParagraphs = deliverySection ? [...deliverySection.querySelectorAll(':scope > p')] : [];
    const lastDeliveryParagraph = deliveryParagraphs.at(-1);
    if (lastDeliveryParagraph && lastDeliveryParagraph !== document.querySelector('#delivery-title + p')) {
      lastDeliveryParagraph.textContent = 'The client-approved work established the core product journeys, responsive patterns and UI foundation for development. The interactive prototype shown here is my later independent continuation and was not part of the commissioned client work.';
    }
  };

  const runEnhancements = () => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', enhancePlacePath, { once: true });
    } else {
      enhancePlacePath();
    }
  };

  const baseScript = document.createElement('script');
  baseScript.src = baseScriptUrl;
  baseScript.async = false;
  baseScript.addEventListener('load', runEnhancements, { once: true });
  document.head.append(baseScript);
})();

// Keep the portfolio footer consistent across standalone and case-study pages.
(() => {
  const install = () => {
    if (document.querySelector('.portfolio-footer')) return;
    const previous = document.querySelector('body > footer:not(.portfolio-footer)');
    if (previous && /^\\s*©\\s*2026\\s*Sophie Purewal\\s*$/.test(previous.textContent || '')) previous.remove();
    const css = document.createElement('style');
    css.id = 'shared-portfolio-footer-styles';
    css.textContent = "/* Compact portfolio footer */\n    .portfolio-footer { padding: 0 24px; text-align: left; background: var(--page-surface); color: var(--page-footer-copy); border-top: 1px solid var(--page-border); }\n    .portfolio-footer__inner { max-width: 1180px; margin: 0 auto; }\n    .portfolio-footer__cta { padding: 64px 0 56px; }\n    .portfolio-footer__cta h2 { margin: 0 0 12px; font-family: 'Inter', system-ui, sans-serif; font-size: clamp(27px, 3.4vw, 40px); font-weight: 500; letter-spacing: -.035em; line-height: 1.2; color: var(--page-heading); }\n    .portfolio-footer__cta p { margin: 0 0 18px; font-size: 16px; color: var(--page-copy); }\n    .portfolio-footer__contact { color: var(--brand-claret); font-weight: 600; display: inline-flex; align-items: center; gap: 6px; text-decoration: underline; text-decoration-color: transparent; text-underline-offset: 5px; }\n    .portfolio-footer__contact:hover, .portfolio-footer__contact:focus-visible { text-decoration-color: currentColor; }\n    .portfolio-footer__bottom { border-top: none; display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 18px 0 24px; }\n    .portfolio-footer__copyright { font-size: 13px; white-space: nowrap; }\n    .portfolio-footer__nav { display: flex; align-items: center; flex-wrap: wrap; gap: 5px; }\n    .portfolio-footer__nav .footer-nav-link { display: inline-flex; width: 40px; height: 40px; justify-content: center; align-items: center; color: var(--page-heading); border-bottom: 2px solid transparent; transition: color .2s, border-color .2s; }\n    .portfolio-footer__nav .footer-nav-link svg { width: 21px; height: 21px; fill: currentColor; }\n    .portfolio-footer__nav .footer-nav-link:hover, .portfolio-footer__nav .footer-nav-link:focus-visible { color: var(--brand-claret); border-bottom-color: currentColor; }\n\n    .portfolio-footer__nav .footer-nav-link { position: relative; text-decoration: none; }\n    .portfolio-footer__nav .footer-nav-link::after { content: attr(data-tooltip); position: absolute; left: 50%; bottom: calc(100% + 9px); transform: translate(-50%, 4px); padding: 6px 9px; border-radius: 4px; background: #17202A; color: #fff; font: 500 12px/1.2 'Inter', system-ui, sans-serif; white-space: nowrap; pointer-events: none; opacity: 0; visibility: hidden; transition: opacity .15s ease, transform .15s ease, visibility .15s ease; z-index: 20; }\n    .portfolio-footer__nav .footer-nav-link:hover::after, .portfolio-footer__nav .footer-nav-link:focus-visible::after { opacity: 1; visibility: visible; transform: translate(-50%, 0); }\n    @media (hover: none) { .portfolio-footer__nav .footer-nav-link::after { display: none; } }\n    @media (max-width: 640px) { .portfolio-footer { padding: 0 16px; } .portfolio-footer__cta { padding: 48px 0 36px; } .portfolio-footer__bottom { flex-direction: column; align-items: flex-start; gap: 14px; } .portfolio-footer__nav { gap: 2px; } .portfolio-footer__nav .footer-nav-link { width: 39px; height: 39px; } }\n";
    css.textContent += "\n/* Inverted portfolio footer colours, consistent across site themes. */\n.portfolio-footer {\n  --footer-bg: #17202A;\n  --footer-text: #FEFEFE;\n  --footer-muted: #E2E5E8;\n  --footer-tooltip-bg: #FEFEFE;\n  --footer-tooltip-text: #17202A;\n  background: var(--footer-bg) !important;\n  color: var(--footer-text) !important;\n  border-top-color: transparent;\n}\nhtml.dark-mode .portfolio-footer,\nbody.dark-mode .portfolio-footer {\n  --footer-bg: #FEFEFE;\n  --footer-text: #17202A;\n  --footer-muted: #46515C;\n  --footer-tooltip-bg: #17202A;\n  --footer-tooltip-text: #FEFEFE;\n}\n.portfolio-footer .portfolio-footer__cta h2,\n.portfolio-footer .portfolio-footer__contact,\n.portfolio-footer .portfolio-footer__nav .footer-nav-link,\nbody.home-page .portfolio-footer a,\nbody.home-page .portfolio-footer a:visited {\n  color: var(--footer-text) !important;\n}\n.portfolio-footer .portfolio-footer__cta p,\n.portfolio-footer .portfolio-footer__copyright {\n  color: var(--footer-muted) !important;\n}\n.portfolio-footer .portfolio-footer__contact:hover,\n.portfolio-footer .portfolio-footer__contact:focus-visible,\n.portfolio-footer .portfolio-footer__nav .footer-nav-link:hover,\n.portfolio-footer .portfolio-footer__nav .footer-nav-link:focus-visible,\nbody.home-page .portfolio-footer a:hover,\nbody.home-page .portfolio-footer a:focus-visible {\n  color: var(--footer-text) !important;\n}\n.portfolio-footer .portfolio-footer__nav .footer-nav-link::after {\n  background: var(--footer-tooltip-bg);\n  color: var(--footer-tooltip-text);\n}\n";
    css.textContent += "\n/* Footer navigation icons sit directly on the footer surface. */\n.portfolio-footer .portfolio-footer__nav,\n.portfolio-footer .portfolio-footer__nav .footer-nav-link,\n.portfolio-footer .portfolio-footer__nav .footer-nav-link:hover,\n.portfolio-footer .portfolio-footer__nav .footer-nav-link:focus-visible,\nbody.home-page .portfolio-footer .portfolio-footer__nav a {\n  background: transparent !important;\n  background-color: transparent !important;\n  box-shadow: none !important;\n}\n.portfolio-footer .portfolio-footer__nav .footer-nav-link svg {\n  background: transparent !important;\n}\n";
    css.textContent += "\n.portfolio-footer .portfolio-footer__contact:hover,\n.portfolio-footer .portfolio-footer__contact:focus-visible { text-decoration-color: var(--footer-text) !important; }\n";
    document.head.appendChild(css);
    document.body.insertAdjacentHTML('beforeend', "<footer class=\"portfolio-footer\" id=\"contact\">\n    <div class=\"portfolio-footer__inner\">\n      <div class=\"portfolio-footer__cta\">\n        <h2>Let's work together.</h2>\n        <p>Have a product design challenge? I'd love to hear about it.</p>\n        <a class=\"portfolio-footer__contact\" href=\"https://calendar.app.google/cdjNKDGJmTKjYuaZ8\" target=\"_blank\" rel=\"noopener noreferrer\">Let’s schedule a chat <span aria-hidden=\"true\">↗</span></a>\n      </div>\n      <div class=\"portfolio-footer__bottom\">\n        <span class=\"portfolio-footer__copyright\">© 2026 Sophie Purewal</span>\n        <nav class=\"portfolio-footer__nav\" aria-label=\"Footer navigation\">\n          <a aria-label=\"Home\" title=\"Home\" data-tooltip=\"Home\" href=\"/index.html\" class=\"footer-nav-link\">\n          <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 -960 960 960\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M160-120v-480L480-840l320 240v480H560v-280H400v280H160Zm80-80h80v-280h320v280h80v-360L480-740 240-560v360Zm240-270Z\"/></svg>\n          \n        </a>\n          <a aria-label=\"Case studies\" title=\"Case studies\" data-tooltip=\"Case studies\" href=\"/index.html#projects\" class=\"footer-nav-link\">\n          <svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24px\" viewBox=\"0 -960 960 960\" width=\"24px\" aria-hidden=\"true\" focusable=\"false\">\n            <path d=\"M480-400 40-640l440-240 440 240-440 240Zm0 160L63-467l84-46 333 182 333-182 84 46-417 227Zm0 160L63-307l84-46 333 182 333-182 84 46L480-80Zm0-411 273-149-273-149-273 149 273 149Zm0-149Z\"/>\n          </svg>\n          \n        </a>\n          <a aria-label=\"Endorsements\" title=\"Endorsements\" data-tooltip=\"Endorsements\" href=\"https://www.linkedin.com/in/sophiepurewal/details/recommendations/?detailScreenTabIndex=0\" class=\"footer-nav-link\" target=\"_blank\" rel=\"noopener noreferrer\">\n          <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 -960 960 960\" aria-hidden=\"true\" focusable=\"false\">\n            <path d=\"M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z\"/>\n          </svg>\n          \n        </a>\n          <a aria-label=\"About me\" title=\"About me\" data-tooltip=\"About me\" href=\"/index.html#about\" class=\"footer-nav-link\">\n          <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 -960 960 960\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm-320 320v-112q0-34 17-62t47-43q60-30 124-46t132-17q68 0 132 17t124 46q30 15 47 43t17 62v112H160Zm80-80h480v-32q0-11-6-20t-16-14q-52-26-107-40t-111-14q-56 0-111 14t-107 40q-10 5-16 14t-6 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Z\"/></svg>\n          \n        </a>\n          <a aria-label=\"LinkedIn\" title=\"LinkedIn\" data-tooltip=\"LinkedIn\" href=\"https://www.linkedin.com/in/sophiepurewal/\" class=\"footer-nav-link\" target=\"_blank\" rel=\"noopener noreferrer\">\n          <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM8.3 18H5.7V9.7h2.6V18ZM7 8.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM18.3 18h-2.6v-4.1c0-1-.02-2.2-1.34-2.2s-1.55 1.05-1.55 2.13V18h-2.6V9.7h2.5v1.13h.03a2.75 2.75 0 0 1 2.47-1.36c2.64 0 3.13 1.74 3.13 4V18Z\"/></svg>\n          \n        </a>\n          <a aria-label=\"Schedule a chat\" title=\"Schedule a chat\" data-tooltip=\"Schedule a chat\" href=\"https://calendar.app.google/cdjNKDGJmTKjYuaZ8\" class=\"footer-nav-link\" target=\"_blank\" rel=\"noopener noreferrer\">\n          <svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24px\" viewBox=\"0 -960 960 960\" width=\"24px\" aria-hidden=\"true\" focusable=\"false\">\n            <path d=\"M320-880h80v80h160v-80h80v80h120q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h120v-80Zm440 320H200v400h560v-400ZM200-640h560v-80H200v80Zm280 120q75 0 127.5 52.5T660-340q0 75-52.5 127.5T480-160q-75 0-127.5-52.5T300-340q0-75 52.5-127.5T480-520Zm0 80q-42 0-71 29t-29 71q0 42 29 71t71 29q42 0 71-29t29-71q0-42-29-71t-71-29Z\"/>\n          </svg>\n          \n        </a>\n          <a class=\"footer-nav-link\" href=\"#top\" aria-label=\"Back to top\" title=\"Back to top\" data-tooltip=\"Back to top\">\n            <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M12 4 4 12l1.4 1.4L11 7.8V21h2V7.8l5.6 5.6L20 12z\"/></svg>\n          </a>\n        </nav>\n      </div>\n    </div>\n  </footer>");
    const top = document.querySelector('.portfolio-footer__nav a[href="#top"]');
    if (top) top.addEventListener('click', event => { event.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}); });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install, {once:true});
  else install();
})();
